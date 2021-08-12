
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const { i18n } = require('./next-i18next.config')

module.exports = {
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
  webpack(config) {
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
    STGEORGE_ACCESS_KEY: process.env.STGEORGE_ACCESS_KEY,
    STGEORGE_PROFILE_ID: process.env.STGEORGE_PROFILE_ID,
    STGEORGE_SECREY_KEY: process.env.STGEORGE_SECREY_KEY,
    STGEORGE_MID: process.env.STGEORGE_MID,
    STGEORGE_URL: process.env.STGEORGE_URL,
    IMAGE_URL: process.env.IMAGE_URL,
    GTM_ID: process.env.GTM_ID
  },
}