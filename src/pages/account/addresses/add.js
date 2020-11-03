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
  templateRoot: {
    marginTop: 100
  },
});

const Add = ({classes}) => {
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
    <UserLayoutTemplate classes={{root: classes.templateRoot}}>
      <AddForm name="address" customUrl={`/account/addresses`} entryForm={form} />
    </UserLayoutTemplate>
  );
}
 
Add.protoTypes = {
  classes: T.object,
}
export default withStyles(styles)(Add);