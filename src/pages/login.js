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

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  formRoot: {
    padding: 5
  },
  formTextField: {
    padding: '10px 0px',
    'input': {
      width: '100%',
    }
  },
});

const Login = ({classes, data}) => {
  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing="2" alignItems="center" justify="center" direction="row">
          <Grid item lg={12}>
            <Typography align="center" variant="h3" component="h3">AvenidaZ</Typography>
          </Grid>
          <Grid item lg={3}>
            <form className={classes.formFoot} noValidate autoComplete="off">
              <Grid container>
                <Grid item lg={12} className={classes.formTextField}>
                  <TextField id="standard-basic" label="Email" />
                </Grid>
                <Grid item lg={12} className={classes.formTextField}>
                  <TextField id="standard-basic" label="Password" />
                </Grid>
                <Grid item lg={12} className={classes.formTextField}>
                  <Button className={`mainButton`}>Login</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item lg={12}>
            <Button className={`secondButton`}>Create Account</Button>
          </Grid>
        </Grid>
      </div>
    </LayoutTemplate>
  );
}
 
export default withStyles(styles)(Login);