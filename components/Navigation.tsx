'use client';

import { useState, useEffect } from 'react';
import { getMediaURL } from '../lib/strapi';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { NavigationItem, CtaButton, ContactFormContent } from '@/lib/types';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { getNavigationItems, getNavigationCtaButtons, getFooter, getContactFormContent } from '@/lib/strapi';
import ContactFormModal from './ContactFormModal';

interface NavigationProps {
  items?: (NavigationItem & {id: number})[];
  ctaButtons?: (CtaButton & {id: number})[];
  forceScrolled?: boolean;
  footerData?: any;
}

export default function Navigation({ items: initialItems = [], ctaButtons: initialCtaButtons = [], forceScrolled = false, footerData: initialFooterData }: NavigationProps) {
  const { language } = useLanguage();
  const [items, setItems] = useState<(NavigationItem & {id: number})[]>(initialItems);
  const [ctaButtons, setCtaButtons] = useState<(CtaButton & {id: number})[]>(initialCtaButtons);
  const [footerData, setFooterData] = useState(initialFooterData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(forceScrolled);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactFormContent, setContactFormContent] = useState<ContactFormContent | null>(null);

  useEffect(() => {
    if (forceScrolled) return; // Don't track scroll if forced

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceScrolled]);

  // Fetch navigation items, CTA buttons, footer data and contact form content when language changes
  useEffect(() => {
    async function fetchNavData() {
      const [navItems, navCtaButtons, footer, contactForm] = await Promise.all([
        getNavigationItems(language),
        getNavigationCtaButtons(language),
        getFooter(language),
        getContactFormContent(language)
      ]);

      if (navItems && navItems.length > 0) {
        setItems(navItems);
      }

      if (navCtaButtons && navCtaButtons.length > 0) {
        setCtaButtons(navCtaButtons);
      }

      if (footer) {
        setFooterData(footer);
      }

      if (contactForm) {
        setContactFormContent(contactForm);
      }
    }
    fetchNavData();
  }, [language]);

  // Sort items by order (Strapi 5 returns flat data)
  const sortedItems = [...items].sort(
    (a, b) => a.order - b.order
  );

  // Sort CTA buttons by order
  const sortedCtaButtons = [...ctaButtons].sort(
    (a, b) => a.order - b.order
  );

  // Helper function to get button style classes based on variant
  const getButtonClasses = (variant: string, isMobile: boolean = false) => {
    const baseClasses = "font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md";
    const mobileClasses = isMobile ? "w-full py-4" : "";

    const variantClasses = {
      primary: "bg-brand-primary hover:bg-blue-600 text-white",
      secondary: "bg-brand-secondary hover:bg-gold-500 text-navy-900",
      outline: "border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-navy-900"
    };

    return `${baseClasses} ${mobileClasses} ${variantClasses[variant as keyof typeof variantClasses] || variantClasses.secondary}`;
  };

  // Handle CTA button click
  const handleCtaClick = (button: CtaButton & {id: number}) => {
    if (button.opensContactForm) {
      setIsContactModalOpen(true);
      setIsMenuOpen(false);
    } else if (button.href) {
      window.location.href = button.href;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            {footerData?.logo ? (
              <Image
                src={getMediaURL(footerData.logo.url)}
                alt={footerData.logo.alternativeText || 'Logo'}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
                priority
              />
            ) : (
              <Image
                src="/images/logo.png"
                alt="Sipsy Logo"
                width={48}
                height={48}
                className="w-12 h-12"
                priority
              />
            )}
            <span
              className={`text-2xl font-bold ${
                isScrolled ? 'text-navy-900' : 'text-white'
              }`}
            >
              {footerData?.siteName || 'sipsy.ai'}
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {sortedItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-brand-secondary'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            {sortedCtaButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleCtaClick(button)}
                className={getButtonClasses(button.variant)}
              >
                {button.text}
              </button>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={isScrolled ? 'text-navy-900' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-navy-900' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
          <div className="container-custom py-8 space-y-6">
            {sortedItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="block text-lg font-medium text-gray-700 hover:text-brand-secondary py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {sortedCtaButtons.map((button) => (
              <button
                key={button.id}
                className={`${getButtonClasses(button.variant, true)} mt-4`}
                onClick={() => handleCtaClick(button)}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {contactFormContent && (
        <ContactFormModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          content={contactFormContent}
        />
      )}
    </nav>
  );
}
