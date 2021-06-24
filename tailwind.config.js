const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: {
    enabled: false,
    content: ['./src/**/*.svelte', './src/data/**/*.json'],
  },
  variants: {},
  theme: {
    extend: {},
    fontFamily: {
      osans: ['Open Sans', '-apple-system', 'BlinkMacSystemFont']
    },
    fontSize: {
      ...defaultTheme.fontSize,
      'xxs': '10px',
      'tiny': '8px',
      '22px': '22px',
      '28px': '28px'
    },   
    colors: {
      ...defaultTheme.colors,
      teal: '#00aaae',
      darkblue: '#0d294a',
      bluegray: '#708697'
    },
    spacing: {
      ...defaultTheme.spacing,
      '2px': '2px',
      '4px': '4px'
    },
    maxWidth: (theme, { breakpoints }) => ({
      ...breakpoints(theme("screens")),
      'full': '100%',
      'xs': '20rem',
      '1/4': '25%',
      '1/2': '50%',
      '3/5': '60%',
      '3/4': '75%',
      '13/20': '65%'
    }),
  },
  plugins: [],
  future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
  }
}
