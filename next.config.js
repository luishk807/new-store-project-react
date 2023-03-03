
const { parsed: localEnv } = require('dotenv').config()
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
  // module: {
  //   rules: [
  //     //...
  //     {
  //       test: /\.(png|jp(e*)g|svg|gif)$/,
  //       use: [
  //         {
  //           loader: 'file-loader',
  //           options: {
  //             name: 'images/[hash]-[name].[ext]',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  swcMinify: true,
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
  webpack: (config) => {
    config.module.rules.push(      {
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm)$/,
      use: ['@svgr/webpack'],
      // type: 'asset/resource',
      // generator: {
      //   filename: 'images/[hash]-[name].[ext]'
      // },
    });

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