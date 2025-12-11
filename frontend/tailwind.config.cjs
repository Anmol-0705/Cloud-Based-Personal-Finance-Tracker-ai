// import colors from "tailwindcss/colors";

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         gray: colors.gray,
//         blue: colors.blue,
//         red: colors.red,
//         green: colors.green,
//         yellow: colors.yellow,
//         orange: colors.orange,
//       },
//     },
//   },
//   plugins: [
//     require("tailwindcss-animate")
//   ],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate")
  ],
};
