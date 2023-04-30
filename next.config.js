const withPlugins = require('next-compose-plugins');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  rewrites() {
    return [
      {
        source: '/feed',
        destination: '/api/rss',
      },
    ];
  },
};

module.exports = (phase) => {
  return withPlugins([], nextConfig)(phase, {});
};
