import React, { useEffect } from 'react';
import * as T from 'prop-types';
import Link from 'next/link'
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import AdminLayoutTemplate from '../../components/common/Layout/AdminLayoutTemplate';
import { verifyAuth } from '../../api/auth';

const styles = (theme) => ({});

const Home = ({classes}) => {

  useEffect(() => {
    verifyAuth();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Grid container>
        <Grid item lg={1} xs={12}>
         <h1>Home</h1>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Link href="products">
            Products
          </Link>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Link href="brands">
            Brands
          </Link>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Link href="stores">
            Stores
          </Link>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Link href="categories">
            Categories
          </Link>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Link href="vendors">
            Vendors
          </Link>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Link href="users">
            Users
          </Link>
        </Grid>
      </Grid>
    </AdminLayoutTemplate>
  );
}

Home.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Home) ;