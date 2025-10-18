'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { NavigationItem, CtaButton, Service } from '@/lib/types';
import Button from '@/components/Button';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: (NavigationItem & { id: number })[];
  ctaButtons: (CtaButton & { id: number })[];
  onCtaClick: (button: CtaButton & { id: number }) => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  items,
  ctaButtons,
  onCtaClick,
}: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  // Sort items by order
  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  const sortedCtaButtons = [...ctaButtons].sort((a, b) => a.order - b.order);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer with Glassmorphism */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 h-screen w-64 bg-white/90 backdrop-blur-xl shadow-2xl border-r-2 border-cyan-500/20 z-40 overflow-y-auto flex flex-col"
            role="navigation"
            aria-label="Mobile menu"
            id="mobile-menu"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b-2 border-gradient-to-r from-cyan-500/20 to-navy-800/20">
              <span className="text-lg font-bold text-navy-900 bg-gradient-to-r from-navy-900 to-cyan-600 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-navy-900 hover:text-cyan-500 transition-colors" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="p-4 space-y-2"
              >
                {sortedItems.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-lg font-medium text-neutral-dark hover:text-cyan-500 py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 hover:scale-105 hover:pl-5"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* CTA Buttons Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="border-t-2 border-gradient-to-r from-cyan-500/20 to-navy-800/20 p-4 space-y-3 bg-gradient-to-b from-transparent to-cyan-50/30"
            >
              {sortedCtaButtons.map((button) => (
                <motion.div key={button.id} variants={itemVariants}>
                  <Button
                    onClick={() => {
                      onCtaClick(button);
                      onClose();
                    }}
                    variant={button.variant}
                    size="md"
                    fullWidth
                    type="button"
                  >
                    {button.text}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Language Switcher - Bottom */}
            <div className="border-t-2 border-gradient-to-r from-cyan-500/20 to-navy-800/20 p-4 bg-gradient-to-t from-cyan-50/50 to-transparent">
              <div className="flex items-center justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
