import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  TextField,
  Button,  
} from '@material-ui/core';

import { validateForm } from '../../../utils/form';
import Snackbar from '../Snackbar';
import Typography from '../Typography';

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

const Login = ({classes, onSubmit, inStatus}) => {
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
      onSubmit(form);
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
      <div className={classes.root}>
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
        <Snackbar open={snack.open} severity={snack.severity} onClose={()=>setSnack({...snack,'open':false})} content={snack.text} />
      </div>
  );
}

Login.protoTypes = {
  classes: T.object,
  onSubmit: T.func,
  inStatus: T.object,
}

export default withStyles(styles)(Login);