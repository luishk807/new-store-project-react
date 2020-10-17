import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import Login from '../../components/common/Form/Admin/Login';

const styles = (theme) => ({});

const Index = ({classes}) => {
  return (
    <Login/>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index) ;