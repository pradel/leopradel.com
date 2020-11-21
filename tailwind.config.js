module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './src/icons/**/*.svg'],
  theme: {
    extend: {
      colors: {
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
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
