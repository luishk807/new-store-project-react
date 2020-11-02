import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
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
import UserLayoutTemplate from '../../../components/common/Layout/UserLayoutTemplate';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  layoutRoot: {
    marginTop: 50,
  },
});

const Add = ({classes, userInfo}) => {
  const form = {
    address: null,
    province: null,
    township: null,
    city: null,
    state: null,
    countryId: null,
    phone: null,
    mobile: null,
    zip: null,
    userId: userInfo.id,
  }

  const ignoreEntry=['userId']

  return (
    <UserLayoutTemplate>
      <AddForm ignoreForm={ignoreEntry} name="address" entryForm={form} />
    </UserLayoutTemplate>
  );
}
 
Add.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Add));