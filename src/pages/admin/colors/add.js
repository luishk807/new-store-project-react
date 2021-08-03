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
    name: null,
    color: 'black'
  }

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.color} 
        entryForm={form}
        customUrl={`/admin/${ADMIN_SECTIONS.color.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.color.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.color.url}`} 
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);