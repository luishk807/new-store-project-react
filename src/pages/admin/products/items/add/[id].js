import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '../../../../../constants/admin';
import { getProductById } from '../../../../../api/products';
import AddForm from '../../../../../components/common/Form/AddForm';
import AdminLayoutTemplate from '../../../../../components/common/Layout/AdminLayoutTemplate';
import ProgressBar from '../../../../../components/common/ProgressBar';

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
  const [basicParams, setBasicParams] = useState({})
  const form = {
    productColor: null,
    productSize: null,
    stock: null,
    retailPrice: null,
    model: null,
    sku: null,
    productId: router.query.id,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreForm = ['productId', 'image', 'sku'];
  const hideEntry = ['productId'];

  const getProduct = async() => {
    const prod = await getProductById(router.query.id);
    setProduct(prod);
    setShowData(true);
  }

  useEffect(() => {
    const id = router.query.id;
    setBasicParams({
      productId: id
    })
    getProduct();
  }, []);

  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <AddForm 
            adminSection={ADMIN_SECTIONS.productItem} 
            entryForm={form}
            title={`Item for ${product.name}`}
            basicParams={basicParams}
            hideEntry={hideEntry}
            ignoreForm={ignoreForm}
            customUrl={`/admin/products/items/${product.id}`}  
            cancelUrl={`/admin/products/items/${product.id}`}  
            successUrl={`/admin/products/items/${product.id}`}  
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