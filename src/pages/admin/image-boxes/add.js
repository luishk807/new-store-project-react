import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import AddForm from '../../../components/common/Form/AddForm';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';

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
    imageBoxType: null,
    imageBox: [
      {
        url: '',
        open: false,
        values: [],
      }
    ]
  }

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.imageBox} 
        entryForm={form}
        fileLimit={true}
        customUrl={`/admin/${ADMIN_SECTIONS.imageBox.url}`}  
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);