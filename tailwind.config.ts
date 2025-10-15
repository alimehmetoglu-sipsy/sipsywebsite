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
        border: '#D1D5DB',       // gray-300 for borders
        input: '#D1D5DB',        // gray-300 for inputs
        ring: '#f4d531',         // golden-dream for focus rings
        navy: {
          900: '#212c41',        // Ebony Clay from logo
          800: '#2a3851',
          700: '#334155',
        },
        // Logo-inspired color palette
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#f4d531',        // Golden Dream - Logo primary
          500: '#e5b436',        // Tulip Tree
          600: '#d09d49',        // Tussock
          700: '#e5cd73',        // Chenin
          800: '#6b5b3a',        // Yellow Metal
          900: '#4a3f28',
        },
        copper: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#cc602f',        // Tuscany - Logo copper
          600: '#b54d23',
          700: '#9c3d1a',
          800: '#7f2d12',
          900: '#5c1f0c',
        },
        azure: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#42698b',        // Bismark - Logo azure
          600: '#365678',
          700: '#2c4563',
          800: '#1e3145',
          900: '#0f1f2e',
        },
        cream: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#e3d59b',        // Zombie - Logo cream
          400: '#d4c589',
          500: '#c5b577',
        },
        brand: {
          primary: '#212c41',    // Ebony Clay - Logo dark base
          secondary: '#f4d531',  // Golden Dream - Logo golden
          accent: '#cc602f',     // Tuscany - Logo copper accent
          tertiary: '#42698b',   // Bismark - Logo azure accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'count-up': 'countUp 1s ease-out',
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
      },
    },
  },
  plugins: [],
};

export default config;
