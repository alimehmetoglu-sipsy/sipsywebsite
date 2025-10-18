import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb',       // Light gray for subtle borders
        input: '#d1d5db',        // Medium light gray for inputs
        ring: '#00d4ff',         // Electric cyan for focus rings
        // Primary navy scale
        navy: {
          DEFAULT: '#1e3a5f',    // Deep Tech Navy - Primary brand color
          dark: '#162d47',       // Darker navy for hovers
          900: '#1f2937',        // Dark charcoal for text
          800: '#1e3a5f',        // Primary navy
          700: '#2c5282',        // Lighter navy variant
        },
        // Accent cyan scale
        cyan: {
          DEFAULT: '#00d4ff',    // Electric Cyan - Accent color
          light: '#e0f2fe',      // Very light cyan for backgrounds
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#00d4ff',        // Electric Cyan
          600: '#0099cc',
          700: '#0077a3',
          800: '#005580',
          900: '#003d5c',
        },
        // Neutral grayscale
        neutral: {
          light: '#f3f4f6',      // Light gray - section backgrounds (Tailwind gray-100)
          medium: '#6b7280',     // Medium gray - secondary text
          dark: '#1f2937',       // Dark charcoal - primary text
        },
        // Brand colors (NEW: Navy + Cyan palette)
        brand: {
          primary: '#1e3a5f',    // Deep Tech Navy - Primary brand
          secondary: '#00d4ff',  // Electric Cyan - Accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'count-up': 'countUp 1s ease-out',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-card': 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)',
        'gradient-card-hover': 'linear-gradient(to bottom right, #e0f2fe, #bae6fd)',
        'gradient-metric': 'linear-gradient(to bottom right, #00d4ff, #2563eb)',
        'gradient-hero': 'linear-gradient(to bottom right, #1e3a5f, #162d47)',
      },
      boxShadow: {
        'focus': '0 0 0 3px rgba(0, 212, 255, 0.3)',
        'button': '0 2px 8px rgba(30, 58, 95, 0.15)',
        'button-hover': '0 4px 16px rgba(0, 212, 255, 0.25)',
        'card': '0 4px 12px rgba(30, 58, 95, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 212, 255, 0.15)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
