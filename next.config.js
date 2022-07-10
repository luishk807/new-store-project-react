
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const { i18n } = require('./next-i18next.config')

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Server',
    value: 'Apache', // phony server value
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'sameorigin',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'same-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=*', // allow specified policies here
  },
]

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  module: {
    rules: [
      //...
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  webpack5: false,
  webpack(config, { isServer }) {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
  i18n: {
    ...i18n,
    localeDetection: true
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    IMAGE_URL: process.env.IMAGE_URL,
    GTM_ID: process.env.GTM_ID,
    COUNTRY_TAX: process.env.COUNTRY_TAX,
    GOOGLE_RECHAPTCHA_SITE_V2: process.env.GOOGLE_RECHAPTCHA_SITE_V2,
    GOOGLE_RECHAPTCHA_SERVER_V2: process.env.GOOGLE_RECHAPTCHA_SERVER_V2
  },
}