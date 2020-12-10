import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  TextField,
} from '@material-ui/core';

import { USER_SECTIONS } from '../constants/user';
import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import Typography from '../components/common/Typography';
import AddForm from '../components/common/Form/AddForm';

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

const Register = ({classes, data, showRegister}) => {
  const form = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    phone: null,
    gender: null,
    date_of_birth: null,
    mobile: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreEntry=['image', 'mobile']

  return (
    <LayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2} alignItems="center" justify="center" direction="row">
          <Grid item lg={5} xs={12}>
            <Grid container spacing={2} alignItems="center" justify="center" direction="row">
              <Grid item lg={12} xs={12}>
                <Typography align="center" variant="h6" component="p">Register account</Typography>
              </Grid>
              <Grid item lg={12} xs={12}>
                <AddForm 
                  customUrl={`/account`} 
                  ignoreForm={ignoreEntry} 
                  userSection={USER_SECTIONS.user} 
                  entryForm={form}
                  showTitle={false}
                />
              </Grid>
              <Grid item lg={12} xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={12} xs={12} className={`mt-5`}>
                    <Typography align="center" variant="h6" component="p">Alredy have an account</Typography>
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <Button className={`secondButton`} href="/login">Login</Button>
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
 
export default withStyles(styles)(Register);