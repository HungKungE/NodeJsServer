/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    extend: {
      colors: {
        deeporange: "#EA6943",
        shalloworange: "#F1A35A",
        gray: "#767676",
      },
    },
  },
  plugins: [],
}
