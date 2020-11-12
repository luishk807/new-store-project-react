import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
// import EditForm from '../../../components/common/Form/Admin/EditForm';
import EditForm from '../../../components/common/Form/EditForm';

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
    email: null,
    position: null,
    user: null,
    address: null,
    mobile: null,
    phone: null,
    province: null,
    township: null,
    country: null,
    image: {
      values: [],
      open: false,
    }
  }
  const ignoreEntry=['image', 'email', 'mobile', 'phone', 'address', 'province', 'township', 'country']
  return (
    <EditForm 
      ignoreForm={ignoreEntry} 
      adminSection={ADMIN_SECTIONS.vendor} 
      id={id} 
      entryForm={form} 
      customUrl={`/admin/vendors`}
    />
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);