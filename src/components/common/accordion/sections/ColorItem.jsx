import React, { useEffect, useState, useCallback } from 'react';
import * as T from 'prop-types';
import { 
  Grid,
  Hidden,
  Link,
  withStyles 
} from '@material-ui/core';
import moment from 'moment';

import { getColorByIds } from '@/api/productColors';
import ColorBlock from '@/common/ColorBlock';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  item: {
    borderTop: '1px solid rgba(0,0,0,.05);'
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
  itemContainer: {
    alignItems: 'center',
  },
  itemName: {
    fontSize: '1em',
    fontWeight: 'bold',
  },
  colorBlock: {
    width: '10%',
    height: 20,
    background: 'red',
    border: '2px solid black',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  colorUrl: {
    display: 'flex',
    width: '100%',
  }
});

const ColorItem = React.memo(({ classes, data }) => {
  const [colors, setColors] = useState([]);
  const [showData, setShowData] = useState(false);

  const loadProducts = async() => {
    const itemIds = data.map((item) => item.id);
    if (itemIds && itemIds.length) {
      const getColors = await getColorByIds(itemIds);
      if (getColors) {
        setColors(getColors);
        setShowData(true);
      }
    }
  }

  useEffect(() => {
    if (data) {
      loadProducts();
    }
  }, [data]);

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Hidden smDown>
          <Grid className={classes.itemHeaderItem} item lg={12} xs={12}>
            <Grid container className={classes.itemContainer}>
              <Grid item lg={3} xs={3} className={classes.itemHeader}>
                
              </Grid>
              <Grid item lg={3} xs={3} className={classes.itemHeader}>
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
        colors.map((item, indx) => {
          return (
            <Grid key={indx} className={classes.item} item lg={12} xs={12}>
              <Link target="_blank" href={`/admin/products/colors/edit/${item.id}`} variant="body2">
                <Grid container className={classes.itemContainer}>
                  <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
                    <ColorBlock classes={{colorBlock: classes.colorBlock}} color={item.color} />
                  </Grid>
                  <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
                    {
                      item.name
                    }
                  </Grid>
                  <Grid item lg={3} xs={3} className={classes.itemProductDescription}>
                    {
                      item.colorStatus.name
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

ColorItem.propTypes = {
  classes: T.object,
  data: T.array.isRequired
}

export default withStyles(styles)(ColorItem);