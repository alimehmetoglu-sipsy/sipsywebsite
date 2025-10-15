'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { NavigationItem } from '@/lib/types';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { getNavigationItems } from '@/lib/strapi';

interface NavigationProps {
  items?: (NavigationItem & {id: number})[];
}

export default function Navigation({ items: initialItems = [] }: NavigationProps) {
  const { language } = useLanguage();
  const [items, setItems] = useState<(NavigationItem & {id: number})[]>(initialItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch navigation items when language changes
  useEffect(() => {
    async function fetchNavItems() {
      const navItems = await getNavigationItems(language);
      if (navItems && navItems.length > 0) {
        setItems(navItems);
      }
    }
    fetchNavItems();
  }, [language]);

  // Sort items by order (Strapi 5 returns flat data)
  const sortedItems = [...items].sort(
    (a, b) => a.order - b.order
  );

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
            <Image
              src="/images/logo.png"
              alt="Sipsy Logo"
              width={48}
              height={48}
              className="w-12 h-12"
              priority
            />
            <span
              className={`text-2xl font-bold ${
                isScrolled ? 'text-navy-900' : 'text-white'
              }`}
            >
              sipsy.ai
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
            <button className="bg-brand-secondary hover:bg-gold-500 text-navy-900 font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md">
              Schedule Free Assessment
            </button>
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
            <button className="w-full bg-brand-secondary hover:bg-gold-500 text-navy-900 font-semibold px-6 py-4 rounded-lg transition-all duration-300 mt-4 shadow-md">
              Schedule Free Assessment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
