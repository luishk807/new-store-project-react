import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import EditForm from '../../../components/common/Form/EditForm';
import { getProductById } from '../../../api/products';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    margin: '0px auto',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const Edit = ({classes}) => {
  const router = useRouter()
  const [id, setId] = useState(null);
  const [showData, setShowData] = useState(false);
  const form = {
    name: null,
    category: null,
    brand: null,
    model: null,
    sku: null,
    description: null,
    image: {
      values: [],
      open: false,
    }
  }

  useEffect(() => {
    const getProduct = async () => {
      const gProd = await getProductById(router.query.pid);
      if (gProd) {
        setId(gProd.id);
      }
    }
    getProduct();
  }, [])
  const ignoreEntry=['image', 'model'];

  useEffect(() => {
    if(id) {
      setShowData(true)
    }
  }, [id])
  return showData && (
    <AdminLayoutTemplate>
      <EditForm 
        classes={{root: classes.root}}
        ignoreForm={ignoreEntry} 
        adminSection={ADMIN_SECTIONS.product} 
        id={id} 
        customUrl={`/admin/${ADMIN_SECTIONS.product.url}`} 
        cancelUrl={`/admin/${ADMIN_SECTIONS.product.url}`} 
        successUrl={`/admin/${ADMIN_SECTIONS.product.url}/${id}`} 
        entryForm={form} 
      />
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);