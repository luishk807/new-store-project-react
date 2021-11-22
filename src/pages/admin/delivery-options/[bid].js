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
    description: null,
    status: null,
    total: null
  }

  const ignoreEntry=['description', 'total'];

  return (
    <AdminLayoutTemplate>
      <EditForm 
        ignoreForm={ignoreEntry}
        adminSection={ADMIN_SECTIONS.deliveryOption} 
        customUrl={`/admin/${ADMIN_SECTIONS.deliveryOption.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.deliveryOption.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.deliveryOption.url}`} 
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