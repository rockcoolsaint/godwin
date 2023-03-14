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
          100: '#ECF3FD',
          200: '#DCE2E5',
        },
        dark: {
          100: '#646F86',
          200: '#252628',
        },
      },
      backgroundImage: {
        gradient: 'linear-gradient(to right, #035DF2, #258AF7, #41ADFD)',
        'gradient-hover': 'linear-gradient(to right, #258AF7, #258AF7, #258AF7)',
      },
      height: {
        'input-tall': `${StyleConstants.inputHeight.tall}px`,
        'input-short': `${StyleConstants.inputHeight.short}px`,
      },
    },
  },
  plugins: [],
}
