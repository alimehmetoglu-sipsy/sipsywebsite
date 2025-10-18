'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { NavigationItem, CtaButton, ContactFormContent, Service } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getNavigationItems,
  getNavigationCtaButtons,
  getFooter,
  getContactFormContent,
  getServices,
} from '@/lib/strapi';
import ContactFormModal from '@/components/ContactFormModal';
import Button from '@/components/Button';
import NavBrand from './NavBrand';
import NavLink from './NavLink';
import NavDropdown from './NavDropdown';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface NavigationProps {
  items?: (NavigationItem & { id: number })[];
  ctaButtons?: (CtaButton & { id: number })[];
  forceScrolled?: boolean;
  footerData?: any;
}

export default function Navigation({
  items: initialItems = [],
  ctaButtons: initialCtaButtons = [],
  forceScrolled = false,
  footerData: initialFooterData,
}: NavigationProps) {
  const pathname = usePathname();
  const { language } = useLanguage();

  // State
  const [items, setItems] = useState<(NavigationItem & { id: number })[]>(initialItems);
  const [ctaButtons, setCtaButtons] = useState<(CtaButton & { id: number })[]>(initialCtaButtons);
  const [services, setServices] = useState<(Service & { id: number })[]>([]);
  const [footerData, setFooterData] = useState(initialFooterData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(forceScrolled);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactFormContent, setContactFormContent] = useState<ContactFormContent | null>(null);

  // Scroll detection
  useEffect(() => {
    if (forceScrolled) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceScrolled]);

  // Fetch navigation data when language changes
  useEffect(() => {
    async function fetchNavData() {
      try {
        const [navItems, navCtaButtons, footer, contactForm, servicesData] = await Promise.all([
          getNavigationItems(language),
          getNavigationCtaButtons(language),
          getFooter(language),
          getContactFormContent(language),
          getServices(language),
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

        if (servicesData && servicesData.length > 0) {
          setServices(servicesData);
        }
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      }
    }

    fetchNavData();
  }, [language]);

  // Sort items
  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  const sortedCtaButtons = [...ctaButtons].sort((a, b) => a.order - b.order);
  const sortedServices = [...services].sort((a, b) => a.order - b.order);

  // Handle CTA button click
  const handleCtaClick = (button: CtaButton & { id: number }) => {
    const buttonTextLower = button.text.toLocaleLowerCase('tr');
    const isContactButton = buttonTextLower.includes('iletişim') || buttonTextLower.includes('contact');

    if (button.opensContactForm || isContactButton) {
      setIsContactModalOpen(true);
      setIsMenuOpen(false);
    } else if (button.href) {
      window.location.href = button.href;
    }
  };

  // Check if link is active
  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg ${
          isScrolled
            ? 'bg-white/80 shadow-2xl border-b-2 border-cyan-500/20'
            : 'bg-white/10 shadow-lg border-b-2 border-white/10'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Site Name */}
            <NavBrand
              logo={footerData?.logo}
              siteName={footerData?.siteName || 'sipsy.ai'}
              isScrolled={isScrolled}
            />

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {sortedItems.map((item) => (
                <NavLink
                  key={item.id}
                  href={item.href}
                  label={item.label}
                  active={isLinkActive(item.href)}
                  isScrolled={isScrolled}
                  onClick={() => {
                    // Close mobile menu if somehow open
                    setIsMenuOpen(false);
                  }}
                />
              ))}

              {/* CTA Buttons */}
              {sortedCtaButtons.map((button) => (
                <Button
                  key={button.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCtaClick(button);
                  }}
                  variant={button.variant}
                  size="md"
                  type="button"
                >
                  {button.text}
                </Button>
              ))}

              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 transition-colors ${
                  isScrolled ? 'text-navy-900' : 'text-white'
                }`}
                aria-label="Open menu"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={sortedItems}
        ctaButtons={sortedCtaButtons}
        onCtaClick={handleCtaClick}
      />

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
          privacyAgreementText:
            language === 'tr' ? "'nı ve ... 'nı kabul ediyorum" : ' and ... I agree',
        }}
      />
    </>
  );
}
