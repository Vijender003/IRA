/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f9',
          100: '#d5ecec',
          200: '#b3dede',
          300: '#8ccaca',
          400: '#78AFA9',
          500: '#0F6A6B',
          600: '#0d5d5e',
          700: '#0b4e4f',
          800: '#093f40',
          900: '#073031',
          950: '#052021',
        },
        soft: {
          DEFAULT: '#78AFA9',
          light: '#a3ccc7',
          dark: '#5a8f89',
        },
        gray: {
          light: '#BFC7CA',
          DEFAULT: '#BFC7CA',
          dark: '#9aa3a7',
        },
        nude: {
          DEFAULT: '#E3C3B6',
          light: '#f0ddd4',
          dark: '#c9a090',
        },
        coral: {
          DEFAULT: '#D58A6A',
          light: '#e4a88e',
          dark: '#c07050',
        },
        surface: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#ebe8e3',
          300: '#d8d3cc',
          400: '#b5ada3',
          500: '#928880',
          600: '#6e665f',
          700: '#4a443f',
          800: '#26231f',
          900: '#131210',
          950: '#0a0908',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'glow-teal': 'glowTeal 3s ease-in-out infinite alternate',
        'glow-coral': 'glowCoral 3s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'drift-slow': 'drift 20s ease-in-out infinite',
        'drift-slower': 'drift 25s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(80px, -60px) scale(1.15)' },
          '50%': { transform: 'translate(-40px, 40px) scale(0.95)' },
          '75%': { transform: 'translate(60px, 30px) scale(1.1)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        glowTeal: {
          '0%': { boxShadow: '0 0 20px rgba(15, 106, 107, 0.3)' },
          '100%': { boxShadow: '0 0 50px rgba(15, 106, 107, 0.6)' },
        },
        glowCoral: {
          '0%': { boxShadow: '0 0 20px rgba(213, 138, 106, 0.3)' },
          '100%': { boxShadow: '0 0 50px rgba(213, 138, 106, 0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0908 0%, #131210 50%, #0a0908 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'primary-gradient': 'linear-gradient(135deg, #0F6A6B 0%, #78AFA9 100%)',
        'coral-gradient': 'linear-gradient(135deg, #D58A6A 0%, #E3C3B6 100%)',
        'teal-gradient': 'linear-gradient(135deg, #0F6A6B 0%, #78AFA9 100%)',
        'nude-gradient': 'linear-gradient(135deg, #E3C3B6 0%, #f0ddd4 100%)',
      },
      boxShadow: {
        'teal': '0 4px 14px 0 rgba(15, 106, 107, 0.39)',
        'coral': '0 4px 14px 0 rgba(213, 138, 106, 0.39)',
        'soft': '0 4px 14px 0 rgba(120, 175, 169, 0.25)',
      },
    },
  },
  plugins: [],
}
