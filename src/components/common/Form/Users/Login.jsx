import React, { useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,  
} from '@material-ui/core';

import Snackbar from '../../Snackbar';
import Typography from '../../Typography';
import LayoutTemplate from '../../Layout/LayoutTemplate';
import { login } from '../../../../api/auth'
import LoginForm from '../Login';

const styles = (theme) => ({
  root: {
    padding: 20,
  },
});

const Login = ({classes, inStatus, showRegister, onCancel}) => {
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handleResponse = () => {
    if (onCancel) {
      onCancel();
    } else {
      window.location.href=`/account`
    }
  }

  const handleSubmit = async (form) => {
    try{
      const resp = await login(form);
      if (resp.data) {
        handleResponse();
        setSnack({
          severity: 'success',
          open: true,
          text: `Login success`,
        })
      } else {
        setSnack({
          severity: 'error',
          open: true,
          text: `ERROR: ${resp.data.message}`,
        })
      }
    } catch(err) {
      const errSnack = err ? {
        severity: 'error',
        open: true,
        text: `ERROR: ${(err.response) ? err.response.data.message : err}`,
      } : {}
      setSnack(errSnack)
    }
  }

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center" justify="center" direction="row">
          <Grid item lg={4}  xs={12}>
            <Grid container spacing={2} alignItems="center" justify="center" direction="row">
              <Grid item lg={12} xs={12}>
                <Typography align="center" variant="h6" component="p">Sign in to your account</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <LoginForm inStatus={inStatus} onSubmit={handleSubmit} />
              </Grid>
              {
                showRegister && (
                  <Grid item lg={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item lg={12} xs={12} className={`mt-5`}>
                        <Typography align="center" variant="h6" component="p">Don't have an account?</Typography>
                      </Grid>
                      <Grid item lg={12} xs={12}>
                        <Button className={`secondButton`} href="/register">Create Account</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        </Grid>
        <Snackbar open={snack.open} severity={snack.severity} onClose={()=>setSnack({...snack,'open':false})} content={snack.text} />
      </div>
    </LayoutTemplate>
  );
}

Login.protoTypes = {
  showRegister: T.bool,
  classes: T.object,
  inStatus: T.object,
  onCancel: T.func
}

export default withStyles(styles)(Login) ;