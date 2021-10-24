import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from 'src/constants/admin';
import AddForm from 'src/components/common/Form/AddForm';
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
});

const Add = ({classes}) => {
  const form = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    phone: null,
    gender: null,
    mobile: null,
    date_of_birth: null,
    userRole: null,
    image: {
      values: [],
      open: false,
    }
  }

  const ignoreEntry=['image', 'mobile']

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.user} 
        ignoreForm={ignoreEntry} 
        entryForm={form} 
        customUrl={`/admin/${ADMIN_SECTIONS.user.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.user.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.user.url}`} 
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);