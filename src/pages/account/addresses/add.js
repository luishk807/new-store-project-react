import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
  Link,
  Grid,
} from '@material-ui/core';

import Typography from '../../../components/common/Typography';
import CardIcon from '../../../components/common/CardIcon';
import Icons from '../../../components/common/Icons';
import AddForm from '../../../components/common/Form/Users/AddForm';
import { getAddresses } from '../../../api/addresses';
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

const Add = ({classes}) => {
  const form = {
    address: null,
    province: null,
    township: null,
    city: null,
    country: defaultCountry,
    phone: null,
    mobile: null,
    zip: null,
  }

  return (
    <UserLayoutTemplate>
      <AddForm name="address" customUrl={`/account/addresses`} entryForm={form} />
    </UserLayoutTemplate>
  );
}
 
Add.protoTypes = {
  classes: T.object,
}
export default withStyles(styles)(Add);