import 'bootstrap/dist/css/bootstrap.min.css';
import NextApp from 'next/app'
import React from 'react'
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

App.getInitialProps = async ({ Component, ctx }) => {
    // HTTPS redirect
    if (process.env.NODE_ENV === 'production' && ctx.req && ctx.req.headers['x-forwarded-proto'] !== 'https') {
      ctx.res.writeHead(302, {
        Location: `https://${ctx.req.headers.host}${ctx.req.url}`,
      });
      ctx.res.end();
      return;
    }
  
    // const { pathname } = ctx;
    // const route = getRouteByPath(pathname);
  
    // // private route check  access
    // let isUserAuth = selectIsUserAuth(ctx.store.getState());
    // if (process.env.NODE_ENV !== 'development' && route && route.protected) { // ToDo: Think about checking permissions
    //   if (ctx.req) {
    //     setSSRCookie(ctx.req.headers.cookie);
    //   }
    //   const user = await AuthService.getUser();
    //   isUserAuth = !!user && user.status === 'loggedin';
    //   if (!isUserAuth) {
    //     if (!route.collection) {
    //       if (ctx.res) {
    //         ctx.res.writeHead(302, {
    //           Location: '/',
    //         });
    //         ctx.res.end();
    //       } else {
    //         Router.push('/');
    //       }
    //     }
    //     return;
    //   } else {
    //     setSSRAuthToken(user.authtoken);
    //   }
    // }
  
    return {
      // authCheckDone: true,
      // isUserAuth,
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      }
    };
}

export default wrapper.withRedux(appWithTranslation(App))
