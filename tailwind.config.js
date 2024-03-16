/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionDuration: {
        3000: '3000ms' // Adds a 3000ms duration option
      },
      height: {
        128: '32rem' // 512px if your base font-size is 16px
        // Añadir más aquí según sea necesario
      }
    }
  },
  plugins: [require("daisyui")],
}
