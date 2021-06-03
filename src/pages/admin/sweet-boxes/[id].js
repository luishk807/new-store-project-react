import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import EditForm from '../../../components/common/Form/EditForm';
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

const Edit = ({classes}) => {
   const router = useRouter()
   const id = router.query.id;

  const form = {
    name: null,
    status: null,
    sweetBoxType: null,
    products: null,
    key: null,
    maxItems: null
  }
  const ignoreEntry=['products'];

  return (
    <AdminLayoutTemplate>
      <EditForm 
        ignoreForm={ignoreEntry} 
        adminSection={ADMIN_SECTIONS.sweetbox} 
        id={id} 
        entryForm={form} 
        customUrl={`/admin/${ADMIN_SECTIONS.sweetbox.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.sweetbox.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.sweetbox.url}`} 
      >
      </EditForm>
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);