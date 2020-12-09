import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import { getImageUrlByType } from '../utils/form';
import {
  getProductById
} from '../api/products';
import CardIcon from './common/CardIcon';

const styles = (theme) => ({});

const SweetBoxProducts = ({classes, id, isFeature}) => {
  const [product, setProduct] = useState({});
  const [showData, setShowData] = useState(false);
  const imageUrl = getImageUrlByType('product');

  const getProduct = async() => {
    const fetchProduct = await getProductById(id);
    setProduct(fetchProduct);
    setShowData(true);
  }

  const loadCardIcons = () => {
    if (isFeature) {
      return (
          <Button className={classes.cardBtn}>
            <Grid container>
              <Grid item lg={12} xs={12}>
                {product.name}
              </Grid>
              <Grid item lg={12} xs={12}>
                Show Now
              </Grid>
              <Grid item lg={12} xs={12}>
                <img src={`${imageUrl}/${product.productImages[0].img_url}`} className={`img-fluid`} alt={product.name} />
              </Grid>
            </Grid>
          </Button>
      )
    } else {
      return (
          <Button className={classes.cardBtn}>
            <Grid container>
              <Grid item>
                <img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} alt={product.name} />
              </Grid>
              <Grid item>
               {product.name}
              </Grid>
            </Grid>
          </Button>
      )
    }
  }
  useEffect(() => {
    getProduct();
  }, [showData])

  return showData && loadCardIcons()
}

SweetBoxProducts.protoTypes = {
  classes: T.object,
  id: T.number,
  isFeature: T.bool,
}

export default withStyles(styles)(SweetBoxProducts);