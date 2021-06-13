import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '../../../../../constants/admin';
import { getProductItemById } from '../../../../../api/productItems';
import EditForm from '../../../../../components/common/Form/EditForm';
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

const Edit = ({classes}) => {
  const router = useRouter();
  const [basicParams, setBasicParams] = useState({})
  const [productItem, setProductItem] = useState(null)
  const [showData, setShowData] = useState(false);
  const form = {
    productColor: null,
    productSize: null,
    stock: null,
    retailPrice: null,
    model: null,
    sku: null,
    status: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreEntry=['image', 'sku']
  
  const getProductItem = async() => {
    const id = router.query.id;
    const prod = await getProductItemById(router.query.id);
    setBasicParams({
      productId: prod.product
    })
    setProductItem(prod);
    setShowData(true);
  }

  useEffect(() => {
    getProductItem();
  }, []);
  
  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <EditForm  
            id={router.query.id} 
            entryForm={form} 
            customUrl={`/admin/products/items/${productItem.product}`}  
            cancelUrl={`/admin/products/items/${productItem.product}`}  
            successUrl={`/admin/products/items/${productItem.product}`}  
            adminSection={ADMIN_SECTIONS.productItem} 
            entryForm={form}
            basicParams={basicParams}
            ignoreForm={ignoreEntry}
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