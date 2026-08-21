import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05060a',
          900: '#0a0c14',
          800: '#111524',
        },
        brand: {
          50: '#eef4ff',
          100: '#dbe6ff',
          200: '#bccfff',
          300: '#8eacff',
          400: '#597dff',
          500: '#3355ff',
          600: '#1f37f5',
          700: '#1a29d8',
          800: '#1c26ae',
          900: '#1d2789',
        },
        accent: {
          400: '#4dd6c1',
          500: '#22c3a6',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(51, 85, 255, 0.55)',
      },
    },
  },
  plugins: [],
} satisfies Config;
