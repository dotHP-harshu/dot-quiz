/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs"],
  theme: {
    extend: {
      screens:{
        mobile:"425px",
      }
    },
  },
  plugins: [],
}

