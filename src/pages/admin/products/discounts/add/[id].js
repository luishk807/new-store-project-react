import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '@/constants/admin';
import { getProductById } from '@/api/products';
import AddForm from '@/common/Form/AddForm';
import ProgressBar from '@/common/ProgressBar';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '70%',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const Add = ({classes}) => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [showData, setShowData] = useState(false);
  const form = {
    name: null,
    percentage: null,
    useDate: false,
    startDate: null,
    endDate: null,
    minQuantity: null,
    productId: router.query.id
  }

  const ignoreForm = ['productId'];
  const hideEntry = ['productId'];

  const loadProductInfo = async() => {
    const getProduct = await getProductById(router.query.id);
    setProduct(getProduct);
    setShowData(true);
  };


  useEffect(() => {
    loadProductInfo()
  }, [])

  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <AddForm 
            classes={{root: classes.root}}
            adminSection={ADMIN_SECTIONS.productDiscount} 
            entryForm={form}
            title={`Discount for ${product.name}`}
            hideEntry={hideEntry}
            ignoreForm={ignoreForm}
            successUrl={`/admin/products`} 
            customUrl={`/admin/products/discounts/${router.query.id}`}  
          />
        ) : (
          <ProgressBar />
        )
      }
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);