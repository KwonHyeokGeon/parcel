/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{html,vue,js}"],
  theme: {
    extend: {
      backgroundImage:{
        'parcel' : "url('./assets/images/parcel.png')"
      },
      fontFamily:{
        'jalnan': "yg-jalnan"
      }
 
    },
  },
  plugins: [],
}
