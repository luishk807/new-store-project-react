import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

import CardIcon from './common/CardIcon';

import {
  getProductById
} from '../api/products';

const styles = (theme) => ({
  cardFeature: {
    width: '30%',
    height: 400,
  },
  cardNonFeature: {
    height: 300,
    width: '15%',
  },
  sweetBoxMainImg: {
    height: 197,
    width: 236,
  },
});

const SweetBoxProducts = ({classes, id, isFeature}) => {
  const [product, setProduct] = useState({});
  const [showData, setShowData] = useState(false);

  const getProduct = async() => {
    console.log("id", id)
    const fetchProduct = await getProductById(id);
    console.log('products', fetchProduct);
    setProduct(fetchProduct);
    setShowData(true);
  }

  useEffect(() => {
    console.log("heyyyyyy", id)
    getProduct();
  }, [id])

  return showData && (
    <CardIcon title={product.name} classes={{ root: classes.cardNonFeature }}>
      <img src={`/images/products/${product.image}`} alt={product.name}/>
    </CardIcon>
  )
}

SweetBoxProducts.protoTypes = {
  classes: T.object,
  id: T.number,
  isFeature: T.bool,
}

export default withStyles(styles)(SweetBoxProducts);