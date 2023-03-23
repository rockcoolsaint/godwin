/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: false,
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
    }

    return config
  },
}

module.exports = nextConfig
