const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './src/icons/**/*.svg'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lustria', ...defaultTheme.fontFamily.sans],
      },
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
