import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  Button,
  Grid,
  withStyles 
} from '@material-ui/core';

import { formatNumber } from '../../utils';
import { getImageUrlByType } from '../../utils/form';
import { noImageUrl } from '../../../config';
import { getProductsByOrderId } from '../../api/orderProducts';
import { getProductByIds } from '../../api/products';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  container: {

  },
  items: {

  },
  itemsContainer: {

  },
  itemProductContainer: {

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
  itemQuantity: {

  },
  itemUnitTotal: {

  },
  itemTotal: {

  },
});

const SimpleBox = React.memo(({ classes, data }) => {
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false);
  const imageUrl = getImageUrlByType('product');

  const loadProducts = async() => {
    const ids = data.map((item) => item.productId);
    const getProduct = await getProductByIds(ids);
    const newProducts = data;

    const refactorData = newProducts.map(item => {
      const getImage = getProduct.filter(prod => {
        return prod.id === item.productId
      })
      const data = {
        ...item,
        'productImages': getImage[0].productImages
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
      <Grid container className={classes.container}>
      {
        products.map((item, indx) => {
          return (
            <Grid key={indx} item className={classes.items}>
              <Grid container className={classes.itemsContainer}>
                <Grid item lg={2} xs={6} className={classes.itemProductImage}>
                  <img className='img-fluid' src={`${item.productImages && item.productImages.length ? `${imageUrl}/${item.productImages[0].img_url} `: noImageUrl.img}`} alt={`${data.name}`} />
                </Grid>
                <Grid item lg={10} xs={6} className={classes.itemProductDescription}>
                  <p className={classes.itemName}><a href={`/product/${item.productId}`}>{item.name}</a></p>
                  <p className={classes.itemQuantity}>Quantity: <b>{item.quantity}</b></p>
                  <p className={classes.itemUnitTotal}>Unit Total: <b>${formatNumber(item.unit_total)}</b></p>
                  <p className={classes.itemTotal}>Total: <b>${formatNumber(item.total)}</b></p>
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