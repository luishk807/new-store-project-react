import React, { useEffect, useState, useCallback } from 'react';
import * as T from 'prop-types';
import { 
  Grid,
  Hidden,
  withStyles, 
  Link
} from '@material-ui/core';

import { getImageBaseOnly } from '../../../../utils';
import { getProductItemByIds } from '../../../../api/productItems';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  item: {
    borderTop: '1px solid rgba(0,0,0,.05);'
  },
  itemProductImage: {
    padding: 10,
  },
  itemContainer: {
    alignItems: 'center',
  },
  itemHeader: {
    padding: 10,
    fontWeight: 'bold',
    '& p': {
      [theme.breakpoints.down('sm')]: {
        lineHeight: 'normal',
      }
    }
  },
  itemProductDescription: {
    padding: 10,
    '& p': {
      [theme.breakpoints.down('sm')]: {
        lineHeight: 'normal',
      }
    }
  },
  itemProductDescriptionMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column'
    },
    padding: 10,
    '& p': {
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

const VariantItem = React.memo(({ classes, data }) => {
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false);
  const { t } = useTranslation('colors');

  const loadProducts = async() => {
    const itemIds = data.map((item) => item.id);
    if (itemIds && itemIds.length) {
      const getProduct = await getProductItemByIds(itemIds);
      if (getProduct) {
        setProducts(getProduct);
        setShowData(true);
      }
    }
  }

  useEffect(() => {
    if (data) {
      loadProducts();
    }
  }, [data]);

  const getColorName = (color) => {
    if (color) {
      return t(`colors:${color.color}`);
    }
    return '';
  }

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Hidden smDown>
          <Grid className={classes.itemHeaderItem} item lg={12} xs={12}>
            <Grid container className={classes.itemContainer}>
              <Grid item lg={1} xs={3} className={classes.itemHeader}>
                
              </Grid>
              <Grid item lg={2} xs={2} className={classes.itemHeader}>
                Sku
              </Grid>
              <Grid item lg={3} xs={3} className={classes.itemHeader}>
                Color
              </Grid>
              <Grid item lg={3} xs={3} className={classes.itemHeader}>
                Size
              </Grid>
              <Grid item lg={3} xs={3} className={classes.itemHeader}>
                Status
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      {
        products.map((item, indx) => {
          const img = getImageBaseOnly(item)
          return (
            <Grid key={indx} className={classes.item} item lg={12} xs={12}>
              <Link href={`/admin/products/items/edit/${item.id}`} variant="body2">
                <Grid container className={classes.itemContainer}>
                  <Grid item lg={1} xs={3} className={classes.itemProductImage}>
                    {
                      img
                    }
                  </Grid>
                  <Hidden smDown>
                    <Grid item lg={2} xs={2} className={classes.itemProductDescription}>
                      {
                        item.sku
                      }
                    </Grid>
                    <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
                      {
                        item.productItemColor && item.productItemColor.name
                      }
                    </Grid>
                    <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
                      {
                        item.productItemSize && item.productItemSize.name
                      }
                    </Grid>
                    <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
                      {
                        item.productItemsStatus && item.productItemsStatus.name
                      }
                    </Grid>
                  </Hidden>
                  <Grid item xs={9} className={classes.itemProductDescriptionMobile}>
                    <p>
                      { item.sku }
                    </p>
                    <p>
                      { getColorName(item.productItemColor) }
                    </p>
                    <p>
                      { item.productItemSize && item.productItemSize.name }
                    </p>
                    <p>
                      { item.productItemsStatus && item.productItemsStatus.name }
                    </p>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          )
        })
      }
      </Grid>
    </div>
  );
})

VariantItem.propTypes = {
  classes: T.object,
  data: T.array.isRequired
}

export default withStyles(styles)(VariantItem);