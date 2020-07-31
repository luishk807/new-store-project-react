import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';

const styles = (theme) => ({});

const Index = ({classes}) => {
  return (
    <AdminLayoutTemplate>
      <h1>Users</h1>
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index) ;