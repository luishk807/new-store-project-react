import 'bootstrap/dist/css/bootstrap.min.css';
import NextApp from 'next/app'
import React from 'react'
import '../../styles.scss'
// import { ThemeProvider } from 'styled-components'

import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../redux/store';
import { appWithTranslation } from '../../i18n';

class App extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

const makeStore = () => store;
export default withRedux(makeStore)(appWithTranslation(App))