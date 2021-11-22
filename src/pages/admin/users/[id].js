import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
  Button
} from '@material-ui/core';

import { ADMIN_SECTIONS } from 'src/constants/admin';
import EditForm from 'src/components/common/Form/EditForm';
import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  formRoot: {
    width: '50%',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
});

const Edit = ({classes}) => {
   const router = useRouter()
   const id = router.query.id;

  const form = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    phone: null,
    gender: null,
    date_of_birth: null,
    mobile: null,
    status: null,
    userRole: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreEntry=['image', 'mobile', 'password']

  return (
    <AdminLayoutTemplate>
      <Grid container>
        <Grid item lg={12}>
          <EditForm  
            classes={{root: classes.formRoot}}
            customUrl={`/admin/${ADMIN_SECTIONS.user.url}`} 
            cancelUrl={`/admin/${ADMIN_SECTIONS.user.url}`} 
            successUrl={`/admin/${ADMIN_SECTIONS.user.url}`} 
            ignoreForm={ignoreEntry} 
            adminSection={ADMIN_SECTIONS.user} 
            id={id} 
            entryForm={form} 
          />
        </Grid>
      </Grid>
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);