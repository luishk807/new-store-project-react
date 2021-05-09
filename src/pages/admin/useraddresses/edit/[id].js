import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
  Button
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../../constants/admin';
import EditForm from '../../../../components/common/Form/EditForm';
import { defaultCountry } from '../../../../../config';
import AdminLayoutTemplate from '../../../../components/common/Layout/AdminLayoutTemplate';

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
            customUrl={`/admin/useraddresses/${id}`} 
            cancelUrl={`/admin/useraddresses/${id}`} 
            successUrl={`/admin/useraddresses/${id}`} 
            ignoreForm={['mobile','phone', 'province', 'district', 'corregimiento', 'addressB', 'zone', 'country']}
            adminSection={ADMIN_SECTIONS.address} 
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