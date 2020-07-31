import React, { Component } from 'react';
import Head from 'next/head';
import {
  withStyles,
  Grid,
  MuiThemeProvider,
} from '@material-ui/core';
import * as T from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';

const styles = (theme) => ({
  root: {
    marginTop: 20,
    flexGrow: 1,
  }
})
const AdminLayoutTemplate = ({classes, children}) => (
  <section>
    <Head>
      <title>My page titlse</title>
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
);

AdminLayoutTemplate.protoTypes = {
  classes: T.object,
  children: T.node,
}

export default withStyles(styles)(AdminLayoutTemplate);