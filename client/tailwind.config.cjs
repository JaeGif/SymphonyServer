/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      primary: '#202225',
      secondary: '#5865f2',
      colors: {
        gray: {
          950: '#18191B',
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
      },
    },
    gridTemplateColumns: {
      fluid: 'repeat(auto-fit, minmax(20rem, 1fr))',
    },
    fontFamily: {
      dirtyClassic: ['dirtyClassic', 'sans-serif'],
    },
  },
  plugins: [],
};
