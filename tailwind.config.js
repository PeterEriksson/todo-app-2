module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        backgroundColorDark: "#17171c",
        mainBlueState: "#90B5FE",
        checkColorFrom: "#47DAFF",
        checkColorTo: "#E9BDFF",
        lightGrayishBlueHover: "#E4E5F1",
      },
      fontSize: {
        xxs: ["11px", "15px"],
        mediumLarge: ["15px", "26px"],
        mobileBottomSectionSize: ["13px", "17px"],
      },
      fontFamily: { mainFont: ["Josefin Sans"] },
      screens: { desktopBreakpoint: "585px" },
      borderWidth: { borderWidthCircle: "1px" },
    },
    /* fontSize: { xxs: ["8px", "12px"] }, */
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode: "jit",
};
