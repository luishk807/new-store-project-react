import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  TextField,
} from '@material-ui/core';

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import Typography from '../components/common/Typography';
import { typography } from '@material-ui/system';
import Login from '../components/common/Form/Users/Login';

const styles = (theme) => ({});

const LoginSection = ({classes, data}) => {
  return (
    <LayoutTemplate>
      <Login showRegister={true} />
    </LayoutTemplate>
  );
}
 
export default withStyles(styles)(LoginSection);