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
});

const Edit = ({classes}) => {
  const router = useRouter();
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
    <UserLayoutTemplate>
      <EditForm userSection={USER_SECTIONS.userAddress} id={id} customUrl={`/account/addresses`} entryForm={form} />
    </UserLayoutTemplate>
  );
}
 
Edit.protoTypes = {
  classes: T.object,
}
export default withStyles(styles)(Edit);