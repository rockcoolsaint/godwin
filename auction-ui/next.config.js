/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

// eslint-disable-next-line no-console
console.log(`Building for ${isProd ? 'production' : 'development'}`)

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
      {
        protocol: 'https',
        hostname: 'qa.auctions.rigly.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'auctions.rigly.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rigly-backend-prod.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rigly-backend-qa.s3.amazonaws.com',
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
      use: [{ loader: '@svgr/webpack' }],
    })

    config.resolve.alias = {
      ...config.resolve.alias,
    }

    return config
  },
}

module.exports = nextConfig

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
  {
    silent: true,
    org: 'rigly',
    project: 'rigly',
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
  },
)
