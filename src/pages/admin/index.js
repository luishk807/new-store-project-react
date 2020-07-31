import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({});

const Index = ({classes}) => {
  return (<h1>Login</h1>);
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index) ;