import React, { useEffect, useState, useCallback } from 'react';
import * as T from 'prop-types';
import { 
  Hidden,
  Link,
  Grid,
  withStyles 
} from '@material-ui/core';
import moment from 'moment';

import { getSizesByIds  } from '../../../../api/sizes';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  item: {
    borderTop: '1px solid rgba(0,0,0,.05);'
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

  const loadItems = async() => {
    const itemIds = data.map((item) => item.id);
    const getProduct = await getSizesByIds(itemIds);
    if (getProduct) {
      setItems(getProduct);
      setShowData(true);
    }
  }

  useEffect(() => {
    loadItems();
  }, [data]);

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Hidden smDown>
          <Grid className={classes.itemHeaderItem}  item lg={12} xs={12}>
            <Grid container className={classes.itemContainer}>
              <Grid item lg={6} xs={6} className={classes.itemHeader}>
                Name
              </Grid>
              <Grid item lg={3} xs={3} className={classes.itemHeader}>
                Status
              </Grid>
              <Grid item lg={3} xs={3} className={classes.itemHeader}>
                Created
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      {
        items.map((item, indx) => {
          return (
            <Grid key={indx} className={classes.item} item lg={12} xs={12}>
              <Link href={`/admin/products/sizes/edit/${item.id}`} variant="body2">
                <Grid container>
                  <Grid item lg={6} xs={6} className={classes.itemProductDescription}>
                    {
                      item.name
                    }
                  </Grid>
                  <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
                    {
                      item.sizeStatus.name
                    }
                  </Grid>
                  <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
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