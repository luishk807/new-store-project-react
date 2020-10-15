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
import { adminLogin } from '../../../../api/auth'
// import { connect } from 'react-redux';
// import { setUser } from '../../../../redux/actions/main';

// import { saveUsers, loadUsers } from '../../../../redux/reducers/user'

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    height: '100%',
    padding: 5,
  },
  formItems: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    width: '50%%',
    '& div': {
      width: '100%',
    }
  },
});

const Login = ({classes, inStatus, setUser}) => {
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
    window.location.href=`/admin/home`
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
      <form noValidate autoComplete="off">
      <Grid container spacing={2} className={classes.formItems}>
        <Grid item lg={12} xs={9}>
          <img src={`/images/logo.svg`} className='img-fluid' />
        </Grid>
        <Grid item lg={12} xs={12}>
            <Typography align="center" variant="h4" component="h4">Admin Login</Typography>
        </Grid>
        <Grid item lg={12} xs={12} item>
           <TextField
              error={errors.email.error}
              name="email"
              onChange={formOnChange}
              id="filled-error"
              label="Email"
            />
        </Grid>
        <Grid item lg={12} xs={12} item>
           <TextField
           error={errors.password.error}
            name="password"
            onChange={formOnChange}
            type="password"
            id="filled-error"
            label="Password"
          />
        </Grid>
        <Grid item lg={12} xs={12} item>
          <Button onClick={handleSubmit} className={`mainButton`}>Login</Button>
        </Grid>
      </Grid>
      </form>
      <Snackbar open={snack.open} severity={snack.severity} onClose={()=>setSnack({...snack,'open':false})} content={snack.text} />
    </div>
  );
}

Login.protoTypes = {
  classes: T.object,
  inStatus: T.object,
}

// const mapStateToProps = state => ({
//   userInfo: state.user
// }) // add reducer access to props
// const mapDispatchToProps = {
//   setUser: setUser,
// } // add redux action to props

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));

export default withStyles(styles)(Login);