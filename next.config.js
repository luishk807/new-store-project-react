
const { nextI18NextRewrites } = require('next-i18next/rewrites');
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const localeSubpaths = { en: "en", es: "es" };

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
    locales: ['en', 'es'],
    defaultLocale: 'es'
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    // Will be available on both server and client
    localeSubpaths
  },
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    IMAGE_URL: process.env.IMAGE_URL,
  },
}