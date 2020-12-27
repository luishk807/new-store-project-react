const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

const i18n = new NextI18Next({
  defaultLanguage: 'es',
  otherLanguages: ['en'],
  localeSubpaths,
  localePath: path.resolve('./public/static/locales')
})

module.exports = i18n