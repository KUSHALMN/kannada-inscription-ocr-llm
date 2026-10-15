/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
          900: '#1C1917',
        },
        heritage: {
          ochre: '#966028',
          'ochre-dark': '#7A4D1E',
          terracotta: '#8C4A32',
          copper: '#9C5B32',
          schist: '#3D4F44', // Chloritic soapstone green/grey
          lapis: '#2C4251',
          sandstone: '#B59975',
          border: '#E7E2D8',
          borderDark: '#D4CBBF',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        kannada: ['Noto Serif Kannada', 'Noto Sans Kannada', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'xs': '2px',
        'sm': '3px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(28, 25, 23, 0.05)',
        'stele': '0 2px 4px -1px rgba(28, 25, 23, 0.06), 0 1px 2px -1px rgba(28, 25, 23, 0.04)',
        'elevation': '0 4px 6px -1px rgba(28, 25, 23, 0.07)',
      }
    },
  },
  plugins: [],
}
