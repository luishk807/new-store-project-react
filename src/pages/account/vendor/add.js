import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Grid,
  Button
} from '@material-ui/core';

import VendorLayoutTemplate from '../../../components/common/Layout/VendorLayoutTemplate';
import AddForm from '../../../components/common/Form/AddForm';
import { USER_SECTIONS } from '../../../constants/user';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  smallLink: {
    fontSize: '.6em',
  },
  formRoot: {
    width: '50%',
  },
});

const Add = ({classes, userInfo, vendorInfo}) => {
  const router = useRouter();
  const id = vendorInfo.id;
  const form = {
    name: null,
    stock: null,
    amount: null,
    category: null,
    brand: null,
    model: null,
    code: null,
    vendor: vendorInfo.id,
    description: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreEntry=['image','vendor']

  const hideEntry=['vendor']

  return (
    <VendorLayoutTemplate>
      <div className={classes.root}>
        <AddForm 
          customUrl={`/account/vendor/products`} 
          cancelUrl={`/account/vendor/products`} 
          successUrl={`/account/vendor/products`} 
          ignoreForm={ignoreEntry} 
          userSection={USER_SECTIONS.vendor.product} 
          entryForm={form} 
          hideEntry={hideEntry}
        />
      </div>
    </VendorLayoutTemplate>
  );
}
 
Add.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user,
  vendorInfo: state.vendor
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Add));