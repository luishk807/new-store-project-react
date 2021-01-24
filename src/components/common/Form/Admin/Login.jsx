import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,  
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_URL } from '../../../../constants/admin';
import { adminLogin } from '../../../../api/auth'
import Snackbar from '../../Snackbar';
import Typography from '../../Typography';
import LoginForm from '../Login';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    position: 'relative',
    margin: '50px auto 0px',
    textAlign: 'center',
    height: '100%',
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  formItems: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    '& div': {
      width: '100%',
    }
  },
});

const Login = ({classes, inStatus}) => {
  const router = useRouter();
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handleCancel = () => {
    router.push(`/${ADMIN_URL.index}/${ADMIN_URL.home}`)
  }
  const handleSubmit = async (form) => {
    try{
      const resp = await adminLogin(form);
      if (resp.data) {
        // const test = setUser(resp.data.user) // dispatch to redux
        setSnack({
          severity: 'success',
          open: true,
          text: `Login success`,
        })
        handleCancel()
      } else {
        setSnack({
          severity: 'error',
          open: true,
          text: `ERROR: ${resp.data.message}`,
        })
      }
    }catch(err) {
      const errSnack = err ? {
        severity: 'error',
        open: true,
        text: `ERROR: ${err.response.data.message}`,
      } : {}
      setSnack(errSnack)
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.formItems}>
        <Grid item lg={12} xs={9}>
          <img src={`/images/logo.svg`} className='img-fluid' />
        </Grid>
        <Grid item lg={12} xs={12}>
            <Typography align="center" variant="h4" component="h4">Admin Login</Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <LoginForm inStatus={inStatus} onSubmit={handleSubmit} />
        </Grid>
      </Grid>
      <Snackbar open={snack.open} severity={snack.severity} onClose={()=>setSnack({...snack,'open':false})} content={snack.text} />
    </div>
  );
}

Login.protoTypes = {
  classes: T.object,
  inStatus: T.object,
}

export default withStyles(styles)(Login);