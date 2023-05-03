/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Syne", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'HeroBG': 'url("images/HeroHomeBG.svg")',
      },
    },
  },
  plugins: [require("daisyui")],
}