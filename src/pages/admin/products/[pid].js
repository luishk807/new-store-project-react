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
  const id = router.query.pid;
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

  const ignoreEntry=['image'];

  return (
    <AdminLayoutTemplate>
      <EditForm 
        ignoreForm={ignoreEntry} 
        adminSection={ADMIN_SECTIONS.product} 
        id={id} 
        customUrl={`/admin/${ADMIN_SECTIONS.product.url}`} 
        entryForm={form} 
      />
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);