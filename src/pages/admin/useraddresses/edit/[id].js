import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
  Button
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../../constants/admin';
import EditForm from '../../../../components/common/Form/Admin/EditForm';
import { defaultCountry } from '../../../../../config';

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
    address: null,
    province: null,
    township: null,
    country: defaultCountry,
    phone: null,
    mobile: null,
    zip: null,
  }

  return (
    <Grid container>
      <Grid item lg={12}>
        <EditForm customUrl={`/admin/useraddresses/${id}`} name={ADMIN_SECTIONS.address.key} id={id} entryForm={form} />
      </Grid>
    </Grid>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);