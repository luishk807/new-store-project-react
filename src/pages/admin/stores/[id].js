import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import EditForm from '../../../components/common/Form/Admin/EditForm';

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
    address: null,
    email: null,
    mobile: null,
    phone: null,
    province: null,
    township: null,
    country: null,
  }
  
  return (
    <EditForm name={ADMIN_SECTIONS.store.key} id={id} entryForm={form} />
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);