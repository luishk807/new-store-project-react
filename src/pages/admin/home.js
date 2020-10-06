import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import AdminLayoutTemplate from '../../components/common/Layout/AdminLayoutTemplate';

const styles = (theme) => ({});

const Home = ({classes}) => {
  return (
    <AdminLayoutTemplate>
      <h1>Home</h1>
    </AdminLayoutTemplate>
  );
}

Home.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Home) ;