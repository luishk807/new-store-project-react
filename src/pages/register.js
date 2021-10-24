import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  TextField,
} from '@material-ui/core';

import { USER_SECTIONS } from 'src/constants/user';
import LayoutTemplate from 'src/components/common/Layout/LayoutTemplate';
import Typography from 'src/components/common/Typography';
import AddForm from 'src/components/common/Form/AddForm';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = (theme) => ({
  root: {
    padding: 20,

  },
  formRoot: {
    padding: 5,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  formTextField: {
    padding: '10px 0px',
    width: '100%',
  },
  terms: {
    fontSize: '1em',
    textAlign: 'center !important',
  }
});

const Register = ({classes, data, showRegister}) => {
  const form = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    phone: null,
    gender: null,
    date_of_birth: null,
    mobile: null
  }
  const { t } = useTranslation('register');
  
  const ignoreEntry=['mobile']

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center" justify="center" direction="row">
          <Grid item lg={5} xs={12}>
            <Grid container spacing={2} alignItems="center" justify="center" direction="row">
              <Grid item lg={12} xs={12}>
                <Typography align="center" variant="h6" component="p">{ t('register_account') }</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <AddForm 
                  classes={{root: classes.formRoot}}
                  customUrl={`/account`} 
                  ignoreForm={ignoreEntry} 
                  userSection={USER_SECTIONS.user} 
                  entryForm={form}
                  showTitle={false}
                />
              </Grid>
              <Grid item lg={12} xs={12} className={classes.terms}>
               <Typography align="center" component="p">{ t('message.opening_an_account') } <a target="_blank" href="/terms">{ t('message.terms_of_use') }</a> { t('and') } <a target="_blank" href="/terms">{ t('message.legal_notice_privacy') }</a>{ t('message.from_avenidaz') }</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={12} xs={12} className={`mt-5`}>
                    <Typography align="center" variant="h6" component="p">{ t('already_have_account') }</Typography>
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Button className={`secondButton`} href="/login">{ t('login') }</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </LayoutTemplate>
  );
}

Register.protoTypes = {
  classes: T.object,
  data: T.object,
  showRegister: T.bool,
}

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['register', 'forms', 'footer']),
  },
})
 
export default withStyles(styles)(Register);