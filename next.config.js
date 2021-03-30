const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  future: {
    webpack5: true,
  },
  rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/feed',
        destination: '/api/rss',
      },
    ];
  },
};

module.exports = withPlugins([optimizedImages], nextConfig);
