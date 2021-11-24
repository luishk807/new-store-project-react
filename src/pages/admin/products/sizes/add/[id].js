import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '@/constants/admin';
import AddForm from '@/common/Form/AddForm';
import { getProductById } from '@/api/products';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import ProgressBar from '@/common/ProgressBar';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
});

const Add = ({classes}) => {
  const [product, setProduct] = useState({});
  const [showData, setShowData] = useState(false);
  const router = useRouter();
  const form = {
    name: null,
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
            adminSection={ADMIN_SECTIONS.size} 
            entryForm={form}
            hideEntry={hideEntry}
            title={`size for ${product.name}`}
            ignoreForm={ignoreForm}
            customUrl={`/admin/products/sizes/${router.query.id}`}  
            cancelUrl={`/admin/products/sizes/${router.query.id}`}  
            successUrl={`/admin/products/sizes/${router.query.id}`}  
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