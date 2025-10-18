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
import Button from './Button';

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

  // Handle CTA button click
  const handleCtaClick = (button: CtaButton & {id: number}) => {
    // Check if this button should open the contact modal
    // Use toLocaleLowerCase('tr') for proper Turkish character handling (İ -> i)
    const buttonTextLower = button.text.toLocaleLowerCase('tr');
    const isContactButton = buttonTextLower.includes('iletişim') ||
                           buttonTextLower.includes('contact');

    if (button.opensContactForm || isContactButton) {
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
                    ? 'text-neutral-dark hover:text-cyan-500'
                    : 'text-neutral-light hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            {sortedCtaButtons.map((button) => (
              <Button
                key={button.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCtaClick(button);
                }}
                variant="primary"
                size="md"
                type="button"
              >
                {button.text}
              </Button>
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
                className="block text-lg font-medium text-neutral-dark hover:text-cyan-500 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {sortedCtaButtons.map((button) => (
              <Button
                key={button.id}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCtaClick(button);
                }}
                variant="primary"
                size="md"
                fullWidth
                className="mt-4"
                type="button"
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        content={contactFormContent || {
          title: language === 'tr' ? 'İletişim Formu' : 'Contact Form',
          fullNameLabel: language === 'tr' ? 'Ad Soyad' : 'Full Name',
          fullNamePlaceholder: language === 'tr' ? 'Adınız ve Soyadınız' : 'Your Full Name',
          emailLabel: 'Email',
          emailPlaceholder: language === 'tr' ? 'ornek@email.com' : 'example@email.com',
          phoneLabel: language === 'tr' ? 'Telefon' : 'Phone',
          phonePlaceholder: language === 'tr' ? '+90 (555) 123 45 67' : '+1 (555) 123-4567',
          messageLabel: language === 'tr' ? 'Mesaj' : 'Message',
          messagePlaceholder: language === 'tr' ? 'Mesajınızı buraya yazın...' : 'Write your message here...',
          submitButtonText: language === 'tr' ? 'Gönder' : 'Submit',
          successMessage: language === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Your message has been sent successfully!',
          privacyPolicyText: language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy',
          privacyPolicyUrl: '/privacy',
          termsText: language === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service',
          termsUrl: '/terms',
          privacyAgreementText: language === 'tr' ? "'nı ve ... 'nı kabul ediyorum" : " and ... I agree",
        }}
      />
    </nav>
  );
}
