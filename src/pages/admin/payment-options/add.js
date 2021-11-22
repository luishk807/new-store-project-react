import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '@/constants/admin';
import AddForm from '@/common/Form/AddForm';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';

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
    description: null
  }

  const ignoreEntry=['description'];
  
  return (
    <AdminLayoutTemplate>
      <AddForm 
        ignoreForm={ignoreEntry}
        adminSection={ADMIN_SECTIONS.paymentOption} 
        entryForm={form}
        customUrl={`/admin/${ADMIN_SECTIONS.paymentOption.url}`}  
        cancelUrl={`/admin/${ADMIN_SECTIONS.paymentOption.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.paymentOption.url}`} 
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);