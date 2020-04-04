module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-nesting',
    process.env.NODE_ENV === 'production'
      ? [
          '@fullhuman/postcss-purgecss',
          {
            content: ['./src/**/*.{js,jsx,ts,tsx,svg}'],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          },
        ]
      : undefined,
    'postcss-preset-env',
  ],
};
