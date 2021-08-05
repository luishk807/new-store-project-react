import 'bootstrap/dist/css/bootstrap.min.css';
import NextApp from 'next/app'
import React from 'react'
import 'styles.scss'
import { wrapper } from 'src/redux/store';
import { appWithTranslation } from 'next-i18next'
import HttpsRedirect from 'react-https-redirect';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: `${process.env.GTM_ID}`
}

if (process.browser) {
  TagManager.initialize(tagManagerArgs);
}
class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <HttpsRedirect>
        <Component {...pageProps} />
      </HttpsRedirect>
    )
  }
}

export default wrapper.withRedux(appWithTranslation(App))
