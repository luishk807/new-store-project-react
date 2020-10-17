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
  const id = router.query.pid;
  const form = {
    name: null,
    stock: null,
    amount: null,
    category: null,
    brand: null,
    model: null,
    code: null,
    description: null,
    vendor: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreEntry=['image']

  return (
    <EditForm ignoreForm={ignoreEntry} name={ADMIN_SECTIONS.product.key} id={id} entryForm={form} />
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);