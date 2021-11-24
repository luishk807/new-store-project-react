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
    category: null,
    brand: null,
    model: null,
    sku: null,
    description: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreEntry=['image', 'model']

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.product} 
        ignoreForm={ignoreEntry} 
        entryForm={form}
        customUrl={`/admin/${ADMIN_SECTIONS.product.url}`}  
        cancelUrl={`/admin/${ADMIN_SECTIONS.product.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.product.url}`} 
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);