import React, { Component } from 'react';
import Head from 'next/head';
import {
  withStyles,
  Grid,
} from '@material-ui/core';
import * as T from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const styles = (theme) => ({
  root: {
    marginTop: 20,
    flexGrow: 1,
  }
})
const LayoutTemplate = ({classes, children}) => (
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

LayoutTemplate.protoTypes = {
  classes: T.object,
  children: T.node,
}

export default withStyles(styles)(LayoutTemplate);