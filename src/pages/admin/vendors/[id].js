import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import Edit from '../../../components/common/Form/Edit';

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

const EditForm = ({classes}) => {
   const router = useRouter()
   const id = router.query.id;

  const form = {
    first_name: null,
    last_name: null,
    email: null,
    position: null,
    password: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  return (
    <Edit name={ADMIN_SECTIONS.vendor.key} id={id} entryForm={form} />
  );
}

EditForm.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(EditForm);