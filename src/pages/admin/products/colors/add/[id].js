import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '../../../../../constants/admin';
import { getProductById } from '../../../../../api/products';
import AddForm from '../../../../../components/common/Form/AddForm';
import ProgressBar from '../../../../../components/common/ProgressBar';
import AdminLayoutTemplate from '../../../../../components/common/Layout/AdminLayoutTemplate';

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
  const [product, setProduct] = useState({});
  const [showData, setShowData] = useState(false);
  const form = {
    color: '#000',
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
            adminSection={ADMIN_SECTIONS.color} 
            entryForm={form}
            title={`Color for ${product.name}`}
            hideEntry={hideEntry}
            ignoreForm={ignoreForm}
            customUrl={`/admin/products/colors/${router.query.id}`}  
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