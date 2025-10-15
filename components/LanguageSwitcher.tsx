'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('tr')}
        className={`relative w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
          language === 'tr'
            ? 'ring-2 ring-brand-accent scale-110'
            : 'opacity-60 hover:opacity-100'
        }`}
        aria-label="Türkçe"
        title="Türkçe"
      >
        {/* Turkish Flag */}
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <rect width="1200" height="800" fill="#E30A17"/>
          <circle cx="425" cy="400" r="200" fill="#fff"/>
          <circle cx="475" cy="400" r="160" fill="#E30A17"/>
          <path d="M 580 400 L 600 475 L 670 445 L 610 415 L 650 350 Z" fill="#fff"/>
        </svg>
      </button>

      <button
        onClick={() => setLanguage('en')}
        className={`relative w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
          language === 'en'
            ? 'ring-2 ring-brand-accent scale-110'
            : 'opacity-60 hover:opacity-100'
        }`}
        aria-label="English"
        title="English"
      >
        {/* UK Flag */}
        <svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
          <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z"/>
          </clipPath>
          <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
          </clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      </button>
    </div>
  );
}
