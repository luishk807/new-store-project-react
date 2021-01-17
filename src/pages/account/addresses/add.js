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
});

const Add = ({classes}) => {
  const form = {
    name: null,
    address: null,
    email: null,
    phone: null,
    mobile: null,
    province: null,
    district: null,
    corregimiento: null,
    country: defaultCountry,
  }
  return (
    <UserLayoutTemplate classes={{root: classes.templateRoot}}>
      <AddForm ignoreForm={['email']} userSection={USER_SECTIONS.userAddress} customUrl={`/account/addresses`} entryForm={form} />
    </UserLayoutTemplate>
  );
}
 
Add.protoTypes = {
  classes: T.object,
}
export default withStyles(styles)(Add);