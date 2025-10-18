'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface NavLinkProps {
  href: string;
  label: ReactNode;
  active?: boolean;
  isScrolled: boolean;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({
  href,
  label,
  active = false,
  isScrolled,
  onClick,
  className = '',
}: NavLinkProps) {
  const baseStyles =
    'relative font-medium transition-all duration-300 py-2 px-4 rounded-lg group overflow-hidden';

  const colorStyles = active
    ? 'text-white'
    : isScrolled
    ? 'text-navy-900 hover:text-cyan-500'
    : 'text-white hover:text-cyan-400';

  const activeBackgroundStyles = active
    ? 'bg-gradient-to-r from-cyan-500 to-navy-800 shadow-lg shadow-cyan-500/30'
    : '';

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${colorStyles} ${activeBackgroundStyles} ${className} hover:scale-105 ${
        active ? 'font-bold' : ''
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {/* Background pill on hover (only show if not active) */}
      {!active && (
        <span
          className={`absolute inset-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 ${
            isScrolled ? 'bg-cyan-50' : 'bg-white/10 backdrop-blur-sm'
          }`}
        />
      )}

      {/* Animated underline (only show if not active) */}
      {!active && (
        <span className="absolute bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-navy-800 transition-all duration-300 group-hover:w-full" />
      )}

      {/* Label */}
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
