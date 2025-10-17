/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EBF2FE',
          100: '#D7E6FD',
          200: '#B0CDFB',
          300: '#88B4F9',
          400: '#619BF7',
          500: '#3B82F6',
          600: '#0B61EE',
          700: '#084BB8',
          800: '#063583',
          900: '#041F4D',
          950: '#02122E'
        },
        accent: {
          cyan: '#22D3EE',
          emerald: '#10B981',
          amber: '#F59E0B'
        },
        glass: {
          light: 'rgba(255,255,255,0.65)',
          dark: 'rgba(15,23,42,0.4)'
        }
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        glass: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glass-dark': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #3B82F6, #22D3EE)',
      },
    },
  },
  plugins: [
    function({ addComponents, theme }) {
      addComponents({
        '.glass-card': {
          backgroundColor: theme('colors.glass.light'),
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: theme('borderRadius.3xl'),
          boxShadow: theme('boxShadow.glass'),
          '.dark &': {
            backgroundColor: theme('colors.glass.dark'),
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: theme('boxShadow.glass-dark'),
          }
        },
        '.btn-primary': {
          backgroundColor: theme('colors.primary.DEFAULT'),
          color: '#ffffff',
          padding: '0.75rem 1.5rem',
          borderRadius: theme('borderRadius.2xl'),
          fontWeight: '500',
          transition: 'all 300ms ease-out',
          '&:hover': {
            backgroundColor: theme('colors.primary.600'),
            transform: 'translateY(-1px)',
          }
        },
        '.btn-secondary': {
          backgroundColor: 'transparent',
          color: theme('colors.primary.DEFAULT'),
          padding: '0.75rem 1.5rem',
          borderRadius: theme('borderRadius.2xl'),
          border: `1px solid ${theme('colors.primary.DEFAULT')}`,
          fontWeight: '500',
          transition: 'all 300ms ease-out',
          '&:hover': {
            backgroundColor: theme('colors.primary.50'),
            transform: 'translateY(-1px)',
          },
          '.dark &': {
            color: '#ffffff',
            borderColor: 'rgba(255,255,255,0.2)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            }
          }
        },
        '.gradient-text': {
          background: 'linear-gradient(to right, #3B82F6, #22D3EE)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        }
      })
    }
  ],
}