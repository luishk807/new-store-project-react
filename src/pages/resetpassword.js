import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import Snackbar from '@/common/Snackbar';
import Typography from '@/common/Typography';
import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import { resetPassword } from '@/api/auth'
import ResetPassword from '@/common/Form/Users/ResetPassword';

const styles = (theme) => ({
  root: {
    padding: 20,
  },
  formRoot: {
    padding: 0
  },
  formTextField: {
    padding: '10px 0px',
    width: '100%',
  },
});

const ResetPasswordForm = ({classes, inStatus, showRegister, onCancel}) => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
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
      const resp = await resetPassword({
        password: form.password,
        auth: token,
        key: userId
      });
      if (resp.data.status) {
        setSnack({
          severity: 'success',
          open: true,
          text: `Contrasena actualizado`,
        })
        setTimeout(() => {
          handleResponse();
        }, 1000);
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

  useEffect(() => {
    setToken(router.query.auth);
    setUserId(router.query.key);
  }, []);

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" direction="row">
          <Grid item lg={4}  xs={12}>
            <Grid container spacing={2} alignItems="center" justifyContent="center" direction="row">
              <Grid item lg={12} xs={12}>
                <Typography align="center" variant="body1" component="p">Cambiar la contraseña</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Typography align="center" variant="body1" component="p">Escribe su nueva contraseña para su cuenta de AvenidaZ.</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <ResetPassword classes={{root: classes.formRoot}} inStatus={inStatus} onSubmit={handleSubmit} />
              </Grid>
              <Grid item lg={12} xs={12} align="center">
                Tienes una cuenta?
              </Grid>
              <Grid item lg={12} xs={12}>
                <Button className={`secondButton`} onClick={() => router.push("/login")}>Iniciar session</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar open={snack.open} severity={snack.severity} onClose={()=>setSnack({...snack,'open':false})} content={snack.text} />
      </div>
    </LayoutTemplate>
  );
}

ResetPasswordForm.protoTypes = {
  showRegister: T.bool,
  classes: T.object,
  inStatus: T.object,
  onCancel: T.func
}

export default withStyles(styles)(ResetPasswordForm) ;