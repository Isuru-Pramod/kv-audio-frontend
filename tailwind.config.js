/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#FAF7F0',
        secondary: '#D8D2C2',
        accent: '#B17457',
      }
    },
  },
  plugins: [],
}