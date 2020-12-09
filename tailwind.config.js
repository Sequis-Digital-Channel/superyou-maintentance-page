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
      primary: "#00aaae",
      darkblue: "#0d294a",
    },
  },
  plugins: [],
  future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
  }
}
