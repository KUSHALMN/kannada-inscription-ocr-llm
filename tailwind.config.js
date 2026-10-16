/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070A10',
          900: '#0B0F17', // primary dark canvas
          850: '#0F1521', // card surface
          800: '#141C2B', // raised component surface
          750: '#192336', // inset surface
          700: '#1F2C44', // card borders
          600: '#2A3C5C', // active borders
          500: '#3D547E',
        },
        gold: {
          300: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B', // imperial royal amber
          600: '#D97706', // antiquity gold
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        parchment: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#F2ECE1',
          300: '#E7DFCE',
          400: '#D3C6AE',
          500: '#B8A586',
        },
        charcoal: {
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
          600: '#57534E',
        },
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          850: '#1C1917',
          900: '#121110',
          950: '#0C0A09',
        },
        heritage: {
          ochre: '#D97706',
          'ochre-dark': '#B45309',
          terracotta: '#C25E3E',
          copper: '#B86F3E',
          schist: '#10B981', // Chloritic soapstone emerald
          lapis: '#06B6D4', // Mystic cyan
          sandstone: '#F59E0B',
          border: 'rgba(255, 255, 255, 0.08)',
          borderDark: 'rgba(255, 255, 255, 0.15)',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cinzel', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        kannada: ['Noto Serif Kannada', 'Noto Sans Kannada', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'xs': '3px',
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'stele': '0 4px 12px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.3)',
        'elevation': '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
        'glow-amber': '0 0 15px -2px rgba(245, 158, 11, 0.35)',
        'glow-cyan': '0 0 15px -2px rgba(6, 182, 212, 0.35)',
        'glow-emerald': '0 0 15px -2px rgba(16, 185, 129, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
