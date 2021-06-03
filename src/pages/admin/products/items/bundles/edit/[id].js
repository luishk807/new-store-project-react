import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '../../../../../../constants/admin';
import ProgressBar from '../../../../../../components/common/ProgressBar';
import { getProductBundlesById } from '../../../../../../api/productBundles';
import EditForm from '../../../../../../components/common/Form/EditForm';
import AdminLayoutTemplate from '../../../../../../components/common/Layout/AdminLayoutTemplate';

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

const Edit = ({classes}) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [showData, setShowData] = useState(false);
  const form = {
    name: null,
    quantity: null,
    productItemId: router.query.id,
    retailPrice: null,
    status: null
  }

  const hideEntry = ['productItemId'];

  const getProduct = async() => {
    const prod = await getProductBundlesById(router.query.id);
    setProduct(prod);
  }

  useEffect(() => {
    if (product) {
      setShowData(true);
    }
  }, [product]);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <EditForm 
            adminSection={ADMIN_SECTIONS.productBundle} 
            id={router.query.id} 
            title={`Edit Bundle ${product.name}`}
            entryForm={form} 
            hideEntry={hideEntry}
            cancelUrl={`/admin/products/items/bundles/${product.productItem}`}  
            customUrl={`/admin/products/items/bundles/${product.productItem}`} 
            successUrl={`/admin/products/items/bundles/${product.productItem}`} 
          />
        ) : (
          <ProgressBar />
        )
      }
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);