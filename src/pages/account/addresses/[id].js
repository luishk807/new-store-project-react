import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
  Link,
  Grid,
} from '@material-ui/core';

import EditForm from '../../../components/common/Form/EditForm';
import { USER_SECTIONS } from '../../../constants/user';
import { defaultCountry } from '../../../../config';
import UserLayoutTemplate from '../../../components/common/Layout/UserLayoutTemplate';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  layoutRoot: {
    marginTop: 50,
  },
  formRoot: {
    width: '50%',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
});

const Edit = ({classes}) => {
  const router = useRouter();
  const id = router.query.id;
  const form = {
    name: null,
    phone: null,
    email: null,
    mobile: null,
    address: null,
    addressB: null,
    province: null,
    district: null,
    corregimiento: null,
    zone: null,
    country: defaultCountry,
    note: null,
  }

  return (
    <UserLayoutTemplate>
      <EditForm 
        ignoreForm={['email', 'note', 'addressB']} 
        classes={{root: classes.formRoot}} 
        userSection={USER_SECTIONS.userAddress} 
        id={id} 
        entryForm={form} 
      />
    </UserLayoutTemplate>
  );
}
 
Edit.protoTypes = {
  classes: T.object,
}
export default withStyles(styles)(Edit);