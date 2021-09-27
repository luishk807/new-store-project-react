import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  TextField,
} from '@material-ui/core';

import Typography from '@/common/Typography';
import { useTranslation } from 'next-i18next'

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

const LoginPanel = ({classes, data, showRegister}) => {
  const { t } = useTranslation('common')
  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center" justify="center" direction="row">
        <Grid item lg={4}  xs={12}>
          <Grid container spacing={2} alignItems="center" justify="center" direction="row">
            <Grid item lg={12} xs={12}>
              <Typography align="center" variant="h6" component="p">{ t('message.sign_into_your_account') }</Typography>
            </Grid>
            <Grid item lg={12} xs={12}>
              <form className={classes.formFoot} noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item lg={12} xs={12}>
                    <TextField id="email" label="Email" className={classes.formTextField} />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <TextField id="password" label="Password" className={classes.formTextField} />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Typography align="right" variant="subtitle1" component="p">{ t('message.forgot_password') }?</Typography>
                  </Grid>
                  <Grid item lg={12} xs={12} className={classes.formTextField}>
                    <Button className={`mainButton`} href="/settings">Login</Button>
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
                      <Button className={`secondButton`} href="/register">{ t('create_account') }</Button>
                    </Grid>
                  </Grid>
                </Grid>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

LoginPanel.protoTypes = {
  classes: T.object,
  data: T.object,
  showRegister: T.bool,
}
 
export default withStyles(styles)(LoginPanel);