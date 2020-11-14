import React, { Component } from 'react';
import Head from 'next/head';
import {
  withStyles,
  Grid,
  MuiThemeProvider,
} from '@material-ui/core';
import * as T from 'prop-types';

import Header from '../Header/AdminHeader';
import Footer from '../Footer/AdminFooter';

import Typography from '../Typography';
import PrivatePage from '../Form/Admin/PrivatePage';

const styles = (theme) => ({
  root: {
    marginTop: 80,
    flexGrow: 1,
  },
})
const AdminLayoutTemplate = ({classes, children}) => (
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
);

AdminLayoutTemplate.protoTypes = {
  classes: T.object,
  children: T.node,
}

export default withStyles(styles)(AdminLayoutTemplate);