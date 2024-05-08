/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const isProd = process.env.NODE_ENV === 'production'

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
        hostname: 'qa.rigly.io',
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
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  reactStrictMode: false,
  swcMinify: true,
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

    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/audio/',
          outputPath: 'static/audio/',
          name: '[name].[ext]',
          esModule: false,
        },
      },
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

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(module.exports)
