import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '@/constants/admin';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import EditForm from '@/common/Form/EditForm';
import { defaultCountry } from 'config';

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
  const id = router.query.bid;

  const form = {
    deliveryService: null,
    amount: null,
    province: null,
    district: null,
    corregimiento: null,
    zone: null,
    country: null,
  }

  const ignoreEntry=['zone', 'corregimiento']

  return (
    <AdminLayoutTemplate>
      <EditForm 
        adminSection={ADMIN_SECTIONS.deliveryServiceCost} 
        customUrl={`/admin/${ADMIN_SECTIONS.deliveryServiceCost.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.deliveryServiceCost.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.deliveryServiceCost.url}`} 
        id={id} 
        ignoreForm={ignoreEntry} 
        entryForm={form} 
      />
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);