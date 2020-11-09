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

import Typography from '../../../components/common/Typography';
import { VENDOR_SECTIONS } from '../../../constants/vendor'
import CardIcon from '../../../components/common/CardIcon';
import Icons from '../../../components/common/Icons';
import VendorLayoutTemplate from '../../../components/common/Layout/VendorLayoutTemplate';
import { getProductsByVendor } from '../../../api/products';
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

const Products = ({classes, userInfo, info, vendorInfo}) => {
  const router = useRouter();
  const [products, setProducts] = useState(false);
  const [showData, setShowData] = useState(false);
  const fields = ['productImages', 'name', 'amount']

  const loadVendorProducts = async(vendor) => {
  //  console.log("vendor", vendorInfo)
    const fetchProduct = await getProductsByVendor(vendor);
    setProducts(fetchProduct);
    setShowData(true);
  };

  useEffect(() => {
    console.log("vendor", vendorInfo)
    loadVendorProducts(vendorInfo.id)
  }, [vendorInfo]);

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