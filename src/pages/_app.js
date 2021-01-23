import 'bootstrap/dist/css/bootstrap.min.css';
import NextApp from 'next/app'
import React from 'react'
import '../../styles.scss'
import { wrapper } from '../redux/store';
// import { appWithTranslation } from '../../i18n';

class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }
  render() {
    const { Component, pageProps } = this.props
    return (
        <Component {...pageProps} />
    )
  }
}

// Translation will be fixed in a future update, somehow next-i18next kind of buggy with nextjs v10
// export default wrapper.withRedux(appWithTranslation(App))
export default wrapper.withRedux(App)
