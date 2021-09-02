const withPlugins = require('next-compose-plugins');

const nextConfig = {
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

module.exports = withPlugins([], nextConfig);
