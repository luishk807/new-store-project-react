import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';

import { getImageUrlByType } from '../utils/form';
import {
  getProductById
} from '../api/products';
import CardIcon from './common/CardIcon';
import Rate from './common/Rate/Rate';

const styles = (theme) => ({
  featureBtn: {
    padding: '10px 25px',
    border: '1px solid black',
    borderRadius: 5,
    display: 'block',
    margin: '10px 0px',
    fontSize: '0.8em',
    flexBasis: 'auto',
    fontWeight: 'bold',
  }
});

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
          <Button className={classes.cardBtn}  href={`product/${product.id}`}>
            <Grid container>
              <Grid item lg={12} xs={12} className={classes.featureBtn}>
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
          <Button className={classes.cardBtn} href={`product/${product.id}`}>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} alt={product.name} />
              </Grid>
              <Grid item lg={12} xs={12}>
               {product.name}
              </Grid>
              <Grid item lg={12} xs={12}>
                <Rate 
                  data={0} 
                  disabled={true} 
                />
              </Grid>
              <Grid item lg={12} xs={12}>
                <NumberFormat value={product.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
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