'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getMediaURL } from '@/lib/strapi';

interface NavBrandProps {
  logo?: {
    url: string;
    alternativeText?: string;
  };
  siteName?: string;
  isScrolled: boolean;
}

export default function NavBrand({
  logo,
  siteName = 'sipsy.ai',
  isScrolled,
}: NavBrandProps) {
  return (
    <Link
      href="/"
      className="flex items-center space-x-4 group transition-all duration-300 hover:scale-105"
    >
      <div className="relative">
        {/* Gradient ring around logo */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-navy-800 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />

        {logo ? (
          <Image
            src={getMediaURL(logo.url)}
            alt={logo.alternativeText || 'Logo'}
            width={56}
            height={56}
            className="w-14 h-14 object-contain relative z-10 transition-transform duration-300 group-hover:rotate-6"
            priority
          />
        ) : (
          <Image
            src="/images/logo.png"
            alt="Sipsy Logo"
            width={56}
            height={56}
            className="w-14 h-14 relative z-10 transition-transform duration-300 group-hover:rotate-6"
            priority
          />
        )}
      </div>

      <span
        className={`text-3xl font-bold transition-all duration-300 ${
          isScrolled
            ? 'text-navy-900 group-hover:text-cyan-500'
            : 'text-white group-hover:text-cyan-400 drop-shadow-lg'
        }`}
      >
        {siteName}
      </span>
    </Link>
  );
}
