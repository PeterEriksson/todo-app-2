module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background_color: "#17171c",
        mainBlueState: "#90B5FE",
        checkColorFrom: "#47DAFF",
        checkColorTo: "#E9BDFF",
        lightGrayishBlueHover: "#E4E5F1",
      },
      fontSize: { xxs: ["10px", "14px"], mediumLarge: ["15px", "26px"] },
      fontFamily: { mainFont: ["Josefin Sans"] },
    },
    /* fontSize: { xxs: ["8px", "12px"] }, */
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode: "jit",
};
