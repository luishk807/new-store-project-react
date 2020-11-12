import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
// import AddForm from '../../../components/common/Form/Admin/AddForm';
import AddForm from '../../../components/common/Form/AddForm';
import { defaultCountry } from '../../../../config';

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
    name: null,
    user: null,
    email: null,
    position: null,
    address: null,
    email: null,
    mobile: null,
    phone: null,
    province: null,
    township: null,
    country: defaultCountry,
    image: {
      values: [],
      open: false,
    }
  }

  return (
    <AddForm 
      adminSection={ADMIN_SECTIONS.vendor} 
      entryForm={form} 
      customUrl={`/admin/vendors`}
    />
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);