import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import AddForm from '../../../components/common/Form/AddForm';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
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
    deliveryOption: null,
    name: null,
    amount: null,
  }

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.deliveryServiceGroupCost} 
        entryForm={form}
        customUrl={`/admin/${ADMIN_SECTIONS.deliveryServiceGroupCost.url}`}  
        cancelUrl={`/admin/${ADMIN_SECTIONS.deliveryServiceGroupCost.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.deliveryServiceGroupCost.url}`} 
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);