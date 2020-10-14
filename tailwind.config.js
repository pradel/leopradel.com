module.exports = {
  future: {
    // Remove once v2 is released
    purgeLayersByDefault: true,
    // Remove once v2 is released
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./src/**/*.tsx', './src/icons/**/*.svg'],
  theme: {
    extend: {
      colors: {
        watermelon: '#FD4659',
      },
    },
    typography: {
      default: {
        css: {
          'code::before': {
            content: '',
          },
          'code::after': {
            content: '',
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
