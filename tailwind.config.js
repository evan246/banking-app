/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D72638',
        secondary: '#FFFFFF',
        ash: '#E5E5E5',
        dark: '#1A1A1A',
      },
    },
  },
  plugins: [],
}
