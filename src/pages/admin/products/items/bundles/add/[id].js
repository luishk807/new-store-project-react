import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from 'src/constants/admin';
import { getProductItemById } from 'src/api/productItems';
import AddForm from 'src/components/common/Form/AddForm';
import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';
import ProgressBar from 'src/components/common/ProgressBar';

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
  const router = useRouter();
  const [showData, setShowData] = useState(false);
  const [product, setProduct] = useState(null)
  const form = {
    name: null,
    quantity: null,
    productItemId: router.query.id,
    retailPrice: null
  }
  
  const ignoreForm = [];
  const hideEntry = ['productItemId'];

  const getProduct = async() => {
    const prod = await getProductItemById(router.query.id);
    setProduct(prod);
    setShowData(true);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <AddForm 
            adminSection={ADMIN_SECTIONS.productBundle} 
            entryForm={form}
            title={`Bundle for ${product.productItemProduct.name}`}
            hideEntry={hideEntry}
            ignoreForm={ignoreForm}
            customUrl={`/admin/products/items/bundles/${product.id}`}  
            cancelUrl={`/admin/products/items/bundles/${product.id}`}  
            successUrl={`/admin/products/items/bundles/${product.id}`}  
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