import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from 'src/constants/admin';
import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';
import AddForm from 'src/components/common/Form/AddForm';
import { defaultCountry } from 'config';

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
    name: null,
    user: null,
    email: null,
    position: null,
    address: null,
    email: null,
    mobile: null,
    phone: null,
    province: null,
    township: null,
    country: defaultCountry,
    image: {
      values: [],
      open: false,
    }
  }

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.vendor} 
        entryForm={form} 
        customUrl={`/admin/${ADMIN_SECTIONS.vendor.url}`} 
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);