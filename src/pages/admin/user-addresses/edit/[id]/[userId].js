import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
  Button
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '@/constants/admin';
import EditForm from '@/common/Form/EditForm';
import { defaultCountry } from 'config';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';

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
   const uid = router.query.userId;

  const form = {
    name: null,
    phone: null,
    mobile: null,
    address: null,
    addressB: null,
    province: null,
    district: null,
    corregimiento: null,
    zone: null,
    country: defaultCountry,
  }

  return (
    <AdminLayoutTemplate>
      <Grid container>
        <Grid item lg={12}>
          <EditForm 
            customUrl={`/admin/user-addresses/${uid}`} 
            cancelUrl={`/admin/user-addresses/${uid}`} 
            successUrl={`/admin/user-addresses/${uid}`} 
            ignoreForm={['mobile','phone', 'province', 'district', 'corregimiento', 'addressB', 'zone', 'country']}
            adminSection={ADMIN_SECTIONS.userAddress} 
            id={id} 
            entryForm={form} 
          />
        </Grid>
      </Grid>
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);