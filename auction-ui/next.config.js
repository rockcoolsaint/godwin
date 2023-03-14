/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const path = require('path')

const isProd = process.env.ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: isProd,
  },
  typescript: {
    ignoreBuildErrors: isProd,
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
