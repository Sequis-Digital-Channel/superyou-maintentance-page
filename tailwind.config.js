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
    }
  },
  plugins: [],
  future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
  }
}
