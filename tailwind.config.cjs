module.exports = {
  purge: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {

    },
    fontFamily: {
      scenario: ['helvetica neue', 'arial', 'PingFangSC', 'microsoft yahei'],
    },
  },
  variants: {
    backgroundColor: ['hover', 'active'],
    extend: {
      opacity: ['disabled'],
    },
  },
}

