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
    fontSize: {
      ...defaultTheme.fontSize,
      'xxs': '10px',
      'sm2': '14px'
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
    screens: {
      ...defaultTheme.screens,
      '374': {'max': '374px'}
    },
    maxWidth: {
      ...defaultTheme.maxWidth,
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    }
  },
  plugins: [],
  future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
  }
}
