const {nextui} = require("@nextui-org/react")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      'darkGreen': '#283618',
      'lightGreen': '#606C38',
      'white': '#FEFAE0',
      'darkBrown': '#BC6C25',
      'lightBrown': '#DDA15E'
    }
  },
  darkMode: "class",
  plugins: [nextui()],
};

