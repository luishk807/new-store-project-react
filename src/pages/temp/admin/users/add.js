import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import AddForm from '../../../components/common/Form/Admin/AddForm';

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
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    phone: null,
    gender: null,
    mobile: null,
    date_of_birth: null,
    userRole: null,
    image: {
      values: [],
      open: false,
    }
  }

  const ignoreEntry=['image', 'mobile']

  return (
    <AddForm name={ADMIN_SECTIONS.user.key} ignoreForm={ignoreEntry} entryForm={form} />
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);