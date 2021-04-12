import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,  
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Snackbar from '../components/common/Snackbar';
import Typography from '../components/common/Typography';
import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import { requestResetPassword } from '../api/auth'
import ForgotPassword from '../components/common/Form/Users/ForgotPassword';

const styles = (theme) => ({
  root: {
    padding: 20,
  },
  formRoot: {
    padding: 0,
  }
});

const ForgotPasswordForm = ({classes, inStatus, showRegister, onCancel}) => {
  const router = useRouter();
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
      const resp = await requestResetPassword(form);
      console.log(resp)
      if (resp.data.status) {
        setSnack({
          severity: 'success',
          open: true,
          text: `Instrucciones enviado`,
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

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center" justify="center" direction="row">
          <Grid item lg={4}  xs={12}>
            <Grid container spacing={2} alignItems="center" justify="center" direction="row">
              <Grid item lg={12} xs={12}>
                <Typography align="center" variant="body1" component="p">Ayuda con la contraseña</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Typography align="center" variant="body1" component="p">Escribe la dirección de correo electrónico asociado a tu cuenta de AvenidaZ.</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <ForgotPassword classes={{root: classes.formRoot}} inStatus={inStatus} onSubmit={handleSubmit} />
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

ForgotPasswordForm.protoTypes = {
  showRegister: T.bool,
  classes: T.object,
  inStatus: T.object,
  onCancel: T.func
}

export default withStyles(styles)(ForgotPasswordForm) ;