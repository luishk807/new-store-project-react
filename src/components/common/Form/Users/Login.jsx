import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  TextField,
  Button,  
} from '@material-ui/core';

import { validateForm } from '../../../../utils/form';
import Snackbar from '../../../../components/common/Snackbar';
import Typography from '../../../../components/common/Typography';
import { login } from '../../../../api/auth'
import LayoutTemplate from '../../Layout/LayoutTemplate';

const styles = (theme) => ({
  root: {
    padding: 20,
  },
  formRoot: {
    padding: 5
  },
  formTextField: {
    padding: '10px 0px',
    width: '100%',
  },
});

const Login = ({classes, inStatus, showRegister}) => {
  const [errors, setErrors] = useState(null);
  const [hasAccess, setHasAccess] = useState(true)
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const [form, setForm] = useState({})
  const formOnChange = (e, edrop = null) => {
    const { name, value } = edrop ? edrop : e.target;
    if(name in form && validateForm(name, value)){
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const handleCancel = () => {
    window.location.href=`/account`
  }
  const handleSubmit = async (e) => {
    let errorFound = false;
    let key = '';
    for (var i in form) {
      errorFound = await validateForm(i, form[i]);
      key = i;
      if (errorFound){
        saveErrors(i)
      } else {
        saveErrors(i, true, `${i} is required`)
        break
      }
    }
    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to login, ${i} is required`
      })
    } else {
      console.log(form,'form')
      try{
        const resp = await login(form);
        if (resp.data) {
          handleCancel();
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
      }catch(err) {
        const errSnack = err ? {
          severity: 'error',
          open: true,
          text: `ERROR: ${err.response.data.message}`,
        } : {}
        setSnack(errSnack)
      }
    }
  }


  const saveErrors = async (key, err = false, str = '') => {
    await setErrors({
      ...errors,
      [key]: {
        error: err,
        text: str,
      }
    });
  }

  const configureError = async(fields) => {
    let newErrors = {}

    Object.keys(fields).forEach((field, index) => {
      newErrors = {
        ...newErrors,
        [field]: {
          error: false,
          text: '',
        }
      }
    })
    setErrors(newErrors);
  }

  useEffect(() => {
    setHasAccess(inStatus);
    if (!hasAccess && typeof inStatus !== "undefined") {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Please login to access page`,
       })
    }
    const fields = {
      email: null,
      password: null,
    }
    configureError(fields)
    setForm(fields)
  }, [hasAccess])


  return errors && (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center" justify="center" direction="row">
          <Grid item lg={4}  xs={12}>
            <Grid container spacing={2} alignItems="center" justify="center" direction="row">
              <Grid item lg={12} xs={12}>
                <Typography align="center" variant="h6" component="p">Sign in to your account</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <form className={classes.formFoot} noValidate autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item lg={12} xs={12}>
                      <TextField
                        error={errors.email.error}
                        name="email"
                        onChange={formOnChange}
                        id="filled-error"
                        label="Email"
                        className={classes.formTextField}
                      />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      <TextField
                        error={errors.password.error}
                          name="password"
                          onChange={formOnChange}
                          type="password"
                          id="filled-error"
                          className={classes.formTextField}
                          label="Password"
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      <Typography align="right" variant="subtitle1" component="p">Forgot password?</Typography>
                    </Grid>
                    <Grid item lg={12} xs={12} className={classes.formTextField}>
                      <Button className={`mainButton`} onClick={handleSubmit}>Login</Button>
                    </Grid>
                  </Grid>
                </form>
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
}

export default withStyles(styles)(Login) ;