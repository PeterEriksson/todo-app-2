module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { background_color: "#17171c" },
      fontSize: { xxs: ["10px", "14px"] },
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
