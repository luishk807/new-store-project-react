const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

const i18n = new NextI18Next({
  debug: true,
  defaultLanguage: 'es',
  otherLanguages: ['en'],
  shallowRender: true,
  react: {
    wait: true
  },
  localeSubpaths,
  localePath: path.resolve('./public/static/locales')
})

module.exports = i18n