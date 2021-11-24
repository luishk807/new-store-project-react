import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Hidden,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import { useRouter } from 'next/router';

import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import { deleteProductBundleById, getProductBundlesByIds } from '@/api/productBundles';
import { getProductItemById } from '@/api/productItems';
import Snackbar from '@/common/Snackbar';
import Icons from '@/common/Icons';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
  },
  noData: {
    color: 'red',
    fontSize: '1.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0px',
  },
  actionBtn: {
    margin: 2,
  },
  mainContainer: {
    padding: 5,
  },
  headerTitle: {
    padding: 20
  },
  headerButton: {
    padding: 20
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainItems: {
    textAlign: 'center',
    borderTop: '1px solid rgba(0,0,0,.08)',
    '&:last-child': {
      borderBottom: '1px solid rgba(0,0,0,.08)',
    }
  },
  itemContainer: {
    textAlign: 'center'
  },
  itemIndex: {
    textAlign: 'left',
    padding: 5,
  },
  itemColumn: {
    textAlign: 'center',
    padding: 5,
  },
  itemAction: {
    textAlign: 'right',
    padding: 5,
  }
});

const Index = ({classes}) => {
  const router = useRouter();
  const [productItem, setProductItem] = useState(null);
  const [productBundles, setProductBundles] = useState(null);
  const [showData, setShowData] = useState(false);
  const [showBundles, setShowBundles] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadProductItems = async() => {
    const pid = router.query.id;
    if (pid) {
      const productItem = await getProductItemById(pid)
      setProductItem(productItem);
      if (productItem && productItem.productItemProductBundles) {
        const ids = productItem.productItemProductBundles.map(item => item.id);
        if (ids && ids.length) {
          const getBundles = await getProductBundlesByIds(ids);
          setProductBundles(getBundles);
        }
      }
    }
  };

  const delItem = async(id) => {
    deleteProductBundleById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Product bundle Item Deleted`,
      })
      loadProductItems()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Product bundle cannot be delete`,
      })
    })
  }

  useEffect(() => {
    loadProductItems()
  }, []);

  useEffect(() => {
    if (productItem && productItem.productItemProductBundles && productItem.productItemProductBundles.length) {
      setShowBundles(true)
    }
  }, [productBundles]);

  useEffect(() => {
    if (productItem) {
      setShowData(true)
    }
  }, [productItem]);

  return (
    <AdminLayoutTemplate>
      {
        showData && (
          <Grid container className={classes.headerContainer}>
            <Grid item className={classes.headerTitle} lg={10} xs={7}>
              <h3><Button href={`/admin/products/items/${productItem.productId}`}><Icons classes={{icon: classes.icon}} name="backArrow" /></Button>&nbsp; bundle for <a href={`/admin/products/items/${productItem.id}`}>{`${productItem.productItemProduct.name}`}</a></h3>
            </Grid>
            <Grid item className={classes.headerTitle} lg={2} xs={5}>
              <Button className={`mainButton`} href={`/admin/products/items/bundles/add/${productItem.id}`}>Add {name}</Button>
            </Grid>
          </Grid>
        )
      }
      {
        showBundles ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={3} className={classes.itemColumn}>
                  Name
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Quantity
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Retail Price
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Status
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Date Created
                </Grid>
                <Grid item lg={2} className={classes.itemAction}>
                  Action
                </Grid>
              </Grid>
            </Grid>
            </Hidden>
            {
              productBundles.map((item, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={2} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={3} xs={6} className={classes.itemColumn}>
                        <a href={`/admin/products/items/edit/${item.id}`}>
                        {
                          item.name
                        }
                        </a>
                      </Grid>
                      <Grid item lg={1} xs={6} className={classes.itemColumn}>
                        {
                          item.quantity
                        }
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        {
                          item.retailPrice
                        }
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemColumn}>
                        {
                          item.productBundleStatus.name
                        }
                      </Grid>
                      <Grid item lg={1} xs={6} className={classes.itemColumn}>
                        {
                          moment(item.createdAt).format('YYYY-MM-DD')
                        }
                      </Grid>
                      <Hidden smDown>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/products/items/bundles/edit/${item.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => delItem(item.id)}>
                          Delete
                        </Button>
                      </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        ) : (
          <Grid container className={classes.mainContainer}>
            <Grid item lg={12} xs={12} className={classes.noData}>
              No bundle found
            </Grid>
          </Grid>
        )
      }
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);