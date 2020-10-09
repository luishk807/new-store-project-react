import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import AddForm from '../../../components/common/Form/AddForm';

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
    position: null,
    password: null,
    image: {
      values: [],
      open: false,
    }
  }

  return (
    <AddForm name={ADMIN_SECTIONS.vendor.key} entryForm={form} />
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);