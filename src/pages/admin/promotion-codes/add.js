import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import AddForm from '../../../components/common/Form/AddForm';
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

const Add = ({classes}) => {
  const form = {
    name: null,
    promoCode: null,
    percentage: null,
    useDate: false,
    startDate: null,
    endDate: null,
  }

  const ignoreEntry=['image', 'model']

  return (
    <AdminLayoutTemplate>
      <AddForm 
        adminSection={ADMIN_SECTIONS.promotionCode} 
        entryForm={form}
        ignoreForm={ignoreEntry} 
        customUrl={`/admin/${ADMIN_SECTIONS.promotionCode.url}`}
        cancelUrl={`/admin/${ADMIN_SECTIONS.promotionCode.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.promotionCode.url}`} 
      />
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);