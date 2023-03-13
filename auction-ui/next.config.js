/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: process.env.ENV === 'production',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack' }],
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      utils: path.resolve(__dirname, 'src', 'utils'),
    }

    return config
  },
}

module.exports = nextConfig
