const withMdxEnhanced = require('next-mdx-enhanced');
const readingTime = require('reading-time');

module.exports = withMdxEnhanced({
  extendFrontMatter: {
    process: (mdxContent) => ({
      readingTime: readingTime(mdxContent),
    }),
  },
})();
