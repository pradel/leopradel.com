const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './src/icons/**/*.svg'],
  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        watermelon: '#FD4659',
      },
      typography: {
        DEFAULT: {
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
  },
  plugins: [require('@tailwindcss/typography')],
};
