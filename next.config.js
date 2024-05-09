const withBundleAnalyzer = require('@next/bundle-analyzer')();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig;
