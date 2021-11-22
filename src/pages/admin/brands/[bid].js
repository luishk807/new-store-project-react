import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from 'src/constants/admin';
import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';
import EditForm from 'src/components/common/Form/EditForm';


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
  const id = router.query.bid;

  const form = {
    name: null,
    status: null,
    image: {
      values: [],
      open: false,
    }
  }

  const ignoreEntry=['image']

  return (
    <AdminLayoutTemplate>
      <EditForm 
        ignoreForm={ignoreEntry} 
        adminSection={ADMIN_SECTIONS.brand} 
        customUrl={`/admin/${ADMIN_SECTIONS.brand.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.brand.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.brand.url}`} 
        id={id} 
        entryForm={form} 
      />
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);