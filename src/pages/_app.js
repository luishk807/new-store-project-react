import 'bootstrap/dist/css/bootstrap.min.css';
import NextApp from 'next/app'
import React from 'react'
import '../../styles.scss'
import { wrapper } from '../redux/store';

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

export default wrapper.withRedux(App)
