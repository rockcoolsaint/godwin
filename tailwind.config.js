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
        primary: '#f08222',
        navy: '#1A3263',
        gray: {
          100: '#EBEFF0',
          200: '#ECF3FD',
          300: '#DCE2E5',
          400: '#D3DBDE',
          500: '#757575',
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
        gradient: 'linear-gradient(to right, #f08222, #f08222, #f08222)', // Changed to solid orange
        'gradient-hover': 'linear-gradient(to right, #e67615, #e67615, #e67615)', // Slightly darker orange for hover
        'gradient-disabled': 'linear-gradient(to right, #DCE2E5, #DCE2E5, #DCE2E5)', // Keep disabled state
        'hero-gradient': 'linear-gradient(to right, #1A3263, #5C3FAF)', // Keep hero gradient
      },
      height: {
        'input-tall': `${StyleConstants.inputHeight.tall}px`,
        'input-short': `${StyleConstants.inputHeight.short}px`,
      },
      fontFamily: {
        chakra: ['var(--font-chakra)'],
        epilogue: ['var(--font-epilogue)'],
      },
      boxShadow: {
        'hero-outline': '0px 0px 15px 5px rgba(240, 130, 34, 0.30)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@headlessui/tailwindcss')({ prefix: 'ui' })],
}
