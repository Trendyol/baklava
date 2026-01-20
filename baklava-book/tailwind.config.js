/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f27a1a',
          highlight: '#ef6114',
          contrast: '#fef2e8',
        },
        neutral: {
          darkest: '#0f131a',
          darker: '#273142',
          dark: '#6e7787',
          light: '#95a1b5',
          lighter: '#afbbca',
          lightest: '#f1f2f7',
        }
      },
      fontFamily: {
        sans: ['Rubik Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
