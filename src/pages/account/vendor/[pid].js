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
import EditForm from '../../../components/common/Form/EditForm';
import { USER_SECTIONS } from '../../../constants/user';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  smallLink: {
    fontSize: '.6em',
  },
});

const Edit = ({classes, userInfo, vendorInfo}) => {
  const router = useRouter();
  const pid = router.query.pid;
  console.log("jjk", pid)
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
        <EditForm 
          customUrl={`/account/vendor/products`} 
          ignoreFrom={ignoreEntry} 
          name="product" 
          userSection={USER_SECTIONS.vendor.product} 
          entryForm={form} 
          id={pid}
          hideEntry={hideEntry}
        />
      </div>
    </VendorLayoutTemplate>
  );
}
 
Edit.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user,
  vendorInfo: state.vendor
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Edit));