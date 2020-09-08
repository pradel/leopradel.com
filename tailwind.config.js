module.exports = {
  future: {
    // Remove once v2 is released
    purgeLayersByDefault: true,
    // Remove once v2 is released
    removeDeprecatedGapUtilities: true,
  },
  purge: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        watermelon: '#FD4659',
      },
    },
  },
  variants: {},
  plugins: [],
};
