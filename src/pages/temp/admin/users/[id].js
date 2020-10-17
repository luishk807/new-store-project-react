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
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    phone: null,
    gender: null,
    date_of_birth: null,
    mobile: null,
    status: null,
    userRole: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreEntry=['image', 'mobile', 'password']

  return (
    <EditForm ignoreForm={ignoreEntry} name={ADMIN_SECTIONS.user.key} id={id} entryForm={form} />
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);