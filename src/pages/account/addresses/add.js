import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
  Link,
  Grid,
} from '@material-ui/core';

import AddForm from '../../../components/common/Form/AddForm';
import { USER_SECTIONS } from '../../../constants/user';
import { defaultCountry } from '../../../../config';
import UserLayoutTemplate from '../../../components/common/Layout/UserLayoutTemplate';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  templateRoot: {
    marginTop: 100
  },
  formRoot: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  }
});

const Add = ({classes}) => {
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
    <UserLayoutTemplate classes={{root: classes.templateRoot}}>
      <AddForm 
        classes={{root: classes.formRoot}} 
        ignoreForm={['email', 'note', 'addressB']} 
        userSection={USER_SECTIONS.userAddress} 
        customUrl={`/account/addresses`} 
        cancelUrl={`/account/addresses`} 
        successUrl={`/account/addresses`} 
        entryForm={form} 
      />
    </UserLayoutTemplate>
  );
}
 
Add.protoTypes = {
  classes: T.object,
}
export default withStyles(styles)(Add);