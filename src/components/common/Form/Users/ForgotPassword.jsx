import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  TextField,
  Button,  
} from '@material-ui/core';

import { validateForm } from '@/utils/form';
import Snackbar from '@/common/Snackbar';
import Typography from '@/common/Typography';
import ProgressBar from '@/common/ProgressBar';

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

const ForgotPassword = ({classes, onSubmit, inStatus}) => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const [form, setForm] = useState({})
  const formOnChange = (e, edrop = null) => {
    if (e.keyCode === 13) { // Enter
      handleSubmit()
    } else {
      const { name, value } = edrop ? edrop : e.target;
      if(name in form && validateForm(name, value)){
        setForm({
          ...form,
          [name]: value,
        });
      }
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
        text: `Unable to send reset, ${i} is required`
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
    const fields = {
      email: null,
    }
    configureError(fields)
    setForm(fields)
  }, [])

  useEffect(() => {
    setShowForm(true);
  }, [form]);
  

  return errors && (
      <div className={classes.root}>
        {
          showForm ? (
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
                <Grid item lg={12} xs={12} className={classes.formTextField}>
                  <Button className={`mainButton`} onClick={handleSubmit}>Continuar</Button>
                </Grid>
              </Grid>
            </form>
          ) : (
            <ProgressBar />
          )
        }
        <Snackbar open={snack.open} severity={snack.severity} onClose={()=>setSnack({...snack,'open':false})} content={snack.text} />
      </div>
  );
}

ForgotPassword.protoTypes = {
  classes: T.object,
  onSubmit: T.func,
  inStatus: T.object,
}

export default withStyles(styles)(ForgotPassword);