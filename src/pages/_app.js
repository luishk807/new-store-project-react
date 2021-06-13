import 'bootstrap/dist/css/bootstrap.min.css';
import NextApp from 'next/app'
import React, { useState, useEffect } from 'react'
import '../../styles.scss'
import { wrapper } from '../redux/store';
import { appWithTranslation } from 'next-i18next'
import HttpsRedirect from 'react-https-redirect';

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: `${process.env.GTM_ID}`
}

if (process.browser) {
  TagManager.initialize(tagManagerArgs);
}
// class App extends NextApp {
//   componentDidMount() {
//     const jssStyles = document.querySelector('#jss-server-side')
//     if (jssStyles && jssStyles.parentNode)
//       jssStyles.parentNode.removeChild(jssStyles)
//   }
//   render() {
//     const { Component, pageProps } = this.props
//     return (
//       <HttpsRedirect>
//         <Component {...pageProps} />
//       </HttpsRedirect>
//     )
//   }
// }

const MyApp = ({ Component, pageProps, auth }) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }, []);
  
  return (
    // <Layout>
      <Component {...pageProps} />
      // </Layout>
  )
}
// export default MyApp

export default wrapper.withRedux(appWithTranslation(MyApp))
