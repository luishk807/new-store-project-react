import React from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
} from '@material-ui/core';

import VendorLayoutTemplate from '../../../components/common/Layout/VendorLayoutTemplate';
import { USER_SECTIONS } from '../../../constants/user';
import ItemForm from '../../../components/common/Form/ItemForm';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  smallLink: {
    fontSize: '.6em',
  },
});

const Products = ({classes, userInfo, vendorInfo}) => {
  const fields = ['productImages', 'name', 'amount']

  return (
    <VendorLayoutTemplate>
      <div className={classes.root}>
        <ItemForm showTitle={false} fields={fields} userSection={USER_SECTIONS.vendor.product}  id={vendorInfo.id} />
      </div>
    </VendorLayoutTemplate>
  );
}
 
Products.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user,
  vendorInfo: state.vendor
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Products));