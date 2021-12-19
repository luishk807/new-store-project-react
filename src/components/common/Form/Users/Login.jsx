import React, { useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,  
} from '@material-ui/core';

import Snackbar from '@/common/Snackbar';
import Typography from '@/common/Typography';
import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import { login } from '@/api/auth'
import LoginForm from '@/common/Form/Login';

const styles = (theme) => ({
  root: {
    padding: 20,
  },
  terms: {
    fontSize: '1em',
    textAlign: 'center',
  },
  formRoot: {
    padding: 0,
  }
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
        <Grid container spacing={2} alignItems="center" justifyContent="center" direction="row">
          <Grid item lg={4}  xs={12}>
            <Grid container spacing={2} alignItems="center" justifyContent="center" direction="row">
              <Grid item lg={12} xs={12}>
                <Typography align="center" variant="h6" component="p">Iniciar sesión</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <LoginForm classes={{root: classes.formRoot}} inStatus={inStatus} onSubmit={handleSubmit} />
              </Grid>
              <Grid item lg={12} xs={12} className={classes.terms}>
               <Typography align="center" variant="subtitle1" component="p">Al continuar, aceptas las <a target="_blank" href="/terms">Condiciones de uso</a> y el <a target="_blank" href="/terms">Aviso de privacidad</a> de AvenidaZ.</Typography>
              </Grid>
              {
                showRegister && (
                  <Grid item lg={12} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item lg={12} xs={12} className={`mt-5`}>
                        <Typography align="center" variant="h6" component="p">Eres nuevo en AvenidaZ</Typography>
                      </Grid>
                      <Grid item lg={12} xs={12}>
                        <Button className={`secondButton`} href="/register">Crea tu cuenta de AvenidaZ</Button>
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