/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#EF5157',
          dark: '#D64147',
          light: '#F7A7A9',
        }
      }
    },
  },
  plugins: [],
};