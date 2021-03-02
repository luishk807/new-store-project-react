import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  Button,
  Grid,
  withStyles 
} from '@material-ui/core';

import { formatNumber } from '../../utils';
import { getImage } from '../../utils';
import { noImageUrl } from '../../../config';
import { getProductDiscountsByProductIds } from '../../api/productDiscounts';
import { getProductItemByIds } from '../../api/productItems';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  itemProductImage: {
    padding: 10,
  },
  itemProductDescription: {
    padding: 10,
    '& p': {
      lineHeight: '10px',
      [theme.breakpoints.down('sm')]: {
        lineHeight: 'normal',
      }
    }
  },
  itemName: {
    fontSize: '1em',
    fontWeight: 'bold',
  },
});

const SimpleBox = React.memo(({ classes, data }) => {
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false);
  const loadProducts = async() => {
    const itemIds = data.map((item) => item.productItemId);
    const productDiscounts = data.map((item) => item.productDiscountId).filter(item => item);
    const getProduct = await getProductItemByIds(itemIds);
    let getDiscounts = []
    if (productDiscounts.length) {
      getDiscounts = await getProductDiscountsByProductIds(productDiscounts)
    }
    const newProducts = data;

    const refactorData = newProducts.map(item => {
      const getImage = getProduct.filter(prod => {
        return prod.id === item.productItemId
      })

      let getDiscount = null;
      if (getDiscounts.length) {
        getDiscount = getDiscounts.filter(disc => {
          return disc.id == item.productDiscountId
        })
      }
      const data = {
        ...item,
        'productImages': getImage[0].productImages,
        'productDiscount': getDiscount && getDiscount[0]
      }
      return data
    })

    setProducts(refactorData);
    setShowData(true);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return showData && (
    <div className={classes.root}>
      <Grid container>
      {
        products.map((item, indx) => {
          const img = getImage(item)
          return (
            <Grid key={indx} item>
              <Grid container>
                <Grid item lg={2} xs={6} className={classes.itemProductImage}>
                  {
                    img
                  }
                </Grid>
                <Grid item lg={10} xs={6} className={classes.itemProductDescription}>
                  <p className={classes.itemName}><a href={`/product/${item.product}`}>{item.name}</a></p>
                  <p>Quantity: <b>{item.quantity}</b></p>
                  <p>Unit Total: <b>${formatNumber(item.unit_total)}</b></p>
                  <p>Total: <b>${formatNumber(item.total)}</b></p>
                  {
                    item.productDiscount && (
                      <p className={classes.itemTotal}>Discount: <b>{item.productDiscount.name}</b></p>
                    )
                  }
                </Grid>
              </Grid>
            </Grid>
          )
        })
      }
      </Grid>
    </div>
  );
})

SimpleBox.propTypes = {
  classes: T.object,
  data: T.array.isRequired
}

export default withStyles(styles)(SimpleBox);