import React, { useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,  
} from '@material-ui/core';

import Snackbar from '../../components/common/Snackbar';
import Typography from '../../components/common/Typography';
import { login } from '../../api/auth'
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import LoginFrom from '../../components/common/Form/Login';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = (theme) => ({
  root: {
    padding: 20,
  },
  mainTitle: {
    fontWeight: 'bold',
    margin: '10px 0px',
    fontSize: '1.5em',
  },
  subtitle: {
    padding: '10px 0px',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  loginForm: {
    padding: 0,
  },
  loginItem: {
    padding: 20,
  },
  guestItem: {
    padding: 20,
  },
  guestItemContainer: {

  }
});

const Login = ({classes, inStatus, showRegister, onCancel}) => {
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation(['checkout', 'common'])

  const handleResponse = () => {
    if (onCancel) {
      onCancel();
    } else {
      window.location.href=`/checkout/f=e`
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
          <Grid item lg={8} xs={12}>
            <Grid container className={classes.itemContainer} spacing={2} justify="center" direction="row">
              <Grid item lg={12} xs={12}>
                <Typography className={classes.mainTitle} align="center" variant="h3" component="p">{ t('checkout:message.sign_in_to_your_account') }</Typography>
              </Grid>
              <Grid item lg={5} xs={12} className={classes.loginItem}>
                <Typography className={classes.subtitle} variant="h4" component="p">{ t('checkout:returning_customer') }</Typography>
                <LoginFrom classes={{root: classes.loginForm}} inStatus={inStatus} onSubmit={handleSubmit} />
              </Grid>

              <Grid item lg={5} xs={12} className={classes.guestItem}>
                <Grid container spacing={2} className={classes.guestItemContainer}>
                  <Grid item lg={12} xs={12}>
                    <Typography className={classes.subtitle} align="center" variant="h4" component="p">{ t('common:message.no_account') }</Typography>
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Button className={`mainButton`} href="/checkout/g">{ t('checkout:continue_as_guest') }</Button>
                  </Grid>
                </Grid>
              </Grid>
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

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'checkout', 'footer']),
  },
})

export default withStyles(styles)(Login) ;