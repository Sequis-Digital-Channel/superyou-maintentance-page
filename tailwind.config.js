const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.svelte'],
  },
  variants: {},
  theme: {
    extend: {},
    fontFamily: {
      osans: ['Open Sans', '-apple-system', 'BlinkMacSystemFont']
    },
    colors: {
      ...defaultTheme.colors,
      teal: "#00aaae",
      darkblue: "#0d294a",
      bluegray: "#708697"
    },
  },
  plugins: [],
  future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
  }
}
