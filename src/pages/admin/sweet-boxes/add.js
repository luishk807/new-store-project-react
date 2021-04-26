import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import AddForm from '../../../components/common/Form/AddForm';
import { defaultCountry } from '../../../../config';

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
    sweetBoxType: null,
    key: null,
  }

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.sweetbox} 
        entryForm={form} 
        customUrl={`/admin/${ADMIN_SECTIONS.sweetbox.url}`} 
        cancelurl={`/admin/${ADMIN_SECTIONS.sweetbox.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.sweetbox.url}`} 
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);