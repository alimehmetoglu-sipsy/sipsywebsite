'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import DynamicIcon from '@/components/DynamicIcon';
import { Service } from '@/lib/types';

interface NavDropdownProps {
  label: string;
  services: (Service & { id: number })[];
  isScrolled: boolean;
}

export default function NavDropdown({
  label,
  services,
  isScrolled,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Limit to first 3 services
  const displayedServices = services.slice(0, 3);

  return (
    <div
      ref={dropdownRef}
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Link */}
      <button
        className={`font-medium transition-colors duration-300 py-2 px-1 ${
          isScrolled
            ? 'text-navy-900 hover:text-cyan-500'
            : 'text-white hover:text-cyan-500'
        } flex items-center gap-1`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0, y: -10 }}
            animate={{ opacity: 1, maxHeight: 500, y: 0 }}
            exit={{ opacity: 0, maxHeight: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute left-0 mt-2 w-96 bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl border border-cyan-500/20 z-50 overflow-hidden"
            role="menu"
          >
            <div className="p-4 space-y-3">
              {displayedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  onClick={() => setIsOpen(false)}
                  className="group block p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                  role="menuitem"
                >
                  <div className="flex gap-3">
                    {/* Service Icon */}
                    {service.icon && (
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:from-cyan-200 group-hover:to-blue-200">
                        <div className="w-6 h-6 text-cyan-600">
                          <DynamicIcon icon={service.icon} />
                        </div>
                      </div>
                    )}

                    {/* Service Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-navy-900 group-hover:text-cyan-500 transition-colors truncate">
                        {service.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {service.description}
                      </p>
                      <span className="inline-block mt-2 text-xs font-medium text-cyan-500 group-hover:underline">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
