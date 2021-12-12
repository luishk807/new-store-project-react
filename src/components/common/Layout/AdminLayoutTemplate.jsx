import React, { Component, useEffect } from 'react';
import Head from 'next/head';
import {
  withStyles,
  Grid,
  MuiThemeProvider,
  Button
} from '@material-ui/core';
import * as T from 'prop-types';
import Header from '@/common/Header/AdminHeader';
import Footer from '@/common/Footer/AdminFooter';
import Typography from '@/common/Typography';
import PrivatePage from '@/common/Private/Admin';
import { useRouter } from 'next/router';
import { logout } from '@/api/auth';
import { verifyCookie } from '@/utils/cookie';
import Icons from '@/common/Icons';
const styles = (theme) => ({
  root: {
    marginTop: 100,
    flexGrow: 1,
  },
  icon: {
    width: 37,
    height: 37,
    fill: '#000',
  }
});

const AdminLayoutTemplate = ({classes, children}) => {
  const router = useRouter();
  const onLogOut = () => {
    if (logout()) {
      router.push('/')
    }
  }

  useEffect(() => {
    const check = verifyCookie();
    if (!check) {
      window.location.href="/admin"
    }
  })

  return (
    <PrivatePage>
      <section>
        <Head>
          <title>AvenidaZ.com</title>
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
        </Head>
        <Header />
        <Grid container className={classes.root}>
          <Grid item xs={12} lg={12}>
            {children}
          </Grid>
        </Grid>
        <Footer />
      </section>
    </PrivatePage>
  )
}

AdminLayoutTemplate.protoTypes = {
  classes: T.object,
  children: T.node,
}

export default withStyles(styles)(AdminLayoutTemplate);