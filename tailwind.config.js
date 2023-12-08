const StyleConstants = {
  maxPageContentWidth: 1280,
  headerHeight: {
    default: 72,
    sm: 96,
  },
  inputHeight: {
    tall: 56,
    short: 40,
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#035DF2',
        gradient: `bg-gradient-to-r from-cyan-500 to-blue-500`,
        gray: {
          100: '#EBEFF0',
          200: '#ECF3FD',
          300: '#DCE2E5',
          400: '#D3DBDE',
        },
        dark: {
          100: '#646F86',
          200: '#252628',
          300: '#070707',
        },
        error: 'rgb(255, 0, 0)',
        tag: {
          red: '#D92D20',
          blue: '#316AEF',
          green: '#2F9E44',
        },
      },
      backgroundImage: {
        gradient: 'linear-gradient(to right, #035DF2, #258AF7, #41ADFD)',
        'gradient-hover': 'linear-gradient(to right, #258AF7, #258AF7, #258AF7)',
        'gradient-disabled': 'linear-gradient(to right, #DCE2E5, #DCE2E5, #DCE2E5)',
      },
      height: {
        'input-tall': `${StyleConstants.inputHeight.tall}px`,
        'input-short': `${StyleConstants.inputHeight.short}px`,
      },
      fontFamily: {
        chakra: ['var(--font-chakra)'],
        epilogue: ['var(--font-epilogue)'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')({ prefix: 'ui' })],
}
