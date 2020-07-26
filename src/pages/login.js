import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  TextField,
} from '@material-ui/core';

import LayoutTemplate from '../components/LayoutTemplate';
import Typography from '../components/common/Typography';
import { typography } from '@material-ui/system';
import LoginPanel  from '../components/LoginPanel';

const styles = (theme) => ({});

const Login = ({classes, data}) => {
  return (
    <LayoutTemplate>
      <LoginPanel showRegister={true} />
    </LayoutTemplate>
  );
}
 
export default withStyles(styles)(Login);