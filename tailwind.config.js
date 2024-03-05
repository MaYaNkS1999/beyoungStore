/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // maxWidth: {
      //   custom: "800px", // You can replace '800px' with your desired value
      // },
    },
  },
  plugins: [],
};

// module.exports = {
//   theme: {
//     screens: {
//       xsm: "431px",
//       xl: "1200px",
//     },

//     extend: {
//       colors: {
//         prime: "#212529",
//         secondary: "#343a40",
//         buttonPrimary: "#d90429",
//       },

//       minWidth: {
//         0: "0",
//         "1/4": "25%",
//         "1/2": "50%",
//         "3/4": "75%",
//         full: "100%",
//         xsm: "431px", // Custom minimum width
//       },

//       maxWidth: {
//         0: "0",
//         "1/4": "25%",
//         "1/2": "50%",
//         "3/4": "75%",
//         full: "100%",
//         xl: "1200px", // Custom maximum width
//       },
//     },
//   },
// };
