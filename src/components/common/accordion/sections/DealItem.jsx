import React, { useEffect, useState, useCallback } from 'react';
import * as T from 'prop-types';
import { 
  Grid,
  withStyles,
  Link,
  Hidden
} from '@material-ui/core';
import moment from 'moment';

import { getProductDiscountsByProductIds } from '../../../../api/productDiscounts';

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
      lineHeight: '10px',
      [theme.breakpoints.down('sm')]: {
        lineHeight: 'normal',
      }
    }
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

const VariantItem = React.memo(({ classes, data }) => {
  const [items, setItems] = useState([]);
  const [showData, setShowData] = useState(false);

  const loaddItems = async() => {
    const itemIds = data.map((item) => item.id);
    if (itemIds && itemIds.length) {
      const getProduct = await getProductDiscountsByProductIds(itemIds);
      if (getProduct) {
        setItems(getProduct);
        setShowData(true);
      }
    }
  }

  useEffect(() => {
    if (data) {
      loaddItems();
    }
  }, [data]);

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Hidden smDown>
          <Grid className={classes.itemHeaderItem} item lg={12} xs={12}>
            <Grid container className={classes.itemContainer}>
              <Grid item lg={4} xs={4} className={classes.itemHeader}>
                Name
              </Grid>
              <Grid item lg={3} xs={3} className={classes.itemHeader}>
                Qty
              </Grid>
              <Grid item lg={3} xs={3} className={classes.itemHeader}>
                Percentage
              </Grid>
              <Grid item lg={2} xs={2} className={classes.itemHeader}>
                Created
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      {
        items.map((item, indx) => {
          return (
            <Grid key={indx} className={classes.item} item lg={12} xs={12}>
              <Link href={`/admin/products/discounts/edit/${item.id}`} variant="body2">
                <Grid container>
                  <Grid item lg={4} xs={4} className={classes.itemProductDescription}>
                    {
                      item.name
                    }
                  </Grid>
                  <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
                    {
                      item.minQuantity
                    }
                  </Grid>
                  <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
                    {
                      item.percentage
                    }
                  </Grid>
                  <Grid item lg={2} xs={2} className={classes.itemProductDescription}>
                    {
                      moment(item.createdAt).format('YYYY-MM-DD')
                    }
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