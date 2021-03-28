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
    textAlign: 'left',
    padding: 10,
    '& p': {
      lineHeight: '10px',
      [theme.breakpoints.down('sm')]: {
        lineHeight: 'normal',
      }
    }
  },
  saveTotal: {
    color: 'red',
  },
  originalPrice: { 
    textDecoration: 'line-through',
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
    const getProduct = await getProductItemByIds(itemIds);
    
    const newProducts = data;

    const refactorData = newProducts.map(item => {
      const getImage = getProduct.filter(prod => {
        return prod.id === item.productItemId
      })

      const data = {
        ...item,
        'productImages': getImage[0].productImages,
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
                  <p>Sku: <b>{item.sku}</b></p>
                  <p>Size: <b>{item.size}</b></p>
                  <p>Color: <b>{item.color}</b></p>
                  <p>Quantity: <b>{item.quantity}</b></p>
                  {
                    item.savePrice ? (
                      <p>Unit Total: <b><span className={classes.originalPrice}>{item.originalPrice}</span>&nbsp; ${formatNumber(item.unit_total)}</b></p>
                    ) : (
                      <p>Unit Total: <b>${formatNumber(item.unit_total)}</b></p>
                    )
                  }

                  <p>Total: <b>${formatNumber(item.total)}</b></p>
                  {
                    item.savePrice && (
                      <p className={classes.saveTotal}>You saved: <b>${formatNumber(item.savePrice)}</b></p>
                    )
                  }
                  {
                    item.productDiscount && (
                      <p className={classes.itemTotal}>Discount: <b>{item.productDiscount}</b></p>
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