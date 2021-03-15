import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,
  Hidden,
} from '@material-ui/core';
import moment from 'moment';

import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import { deleteProduct, getAdminProducts } from '../../../api/products';
import Snackbar from '../../../components/common/Snackbar';
import { getImage } from '../../../utils';
import Icons from '../../../components/common/Icons';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
  },
  deleteIcon: {
    width: 25,
    height: 25,
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
  mobileDeleteItem: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
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
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadProducts = async() => {
    const getProducts = await getAdminProducts();
    setProducts(getProducts);
    setShowData(true);
  };

  const delItem = async(id) => {
    const result = await deleteProduct(id);

    if (result && result.status) {
      setSnack({
        severity: 'success',
        open: true,
        text: `Product Deleted`,
      })
      loadProducts()
    } else {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Product cannot be delete`,
      })
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <AdminLayoutTemplate>
      <Grid container className={classes.headerContainer}>
        <Grid item lg={9} className={classes.headerTitle}>
          <h3>Products</h3>
        </Grid>
        <Grid item lg={3} className={classes.headerTitle}>
          <Button className={`mainButton`} href={`/admin/products/add`}>Add Product</Button>
        </Grid>
      </Grid>
      {
        showData && (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Name
                </Grid>
                <Grid item lg={2} className={classes.itemColumn}>
                  Categories
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Colors
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Sizes
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Items
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Deals
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Brand
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Status
                </Grid>
                <Grid item lg={1} className={classes.itemAction}>
                  Action
                </Grid>
              </Grid>
            </Grid>
            </Hidden>
            {
              products.map((product, index) => {
                const img = getImage(product)
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={2} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={2} xs={8} className={classes.itemColumn}>
                        <a href={`/admin/products/${product.id}`}>
                        {
                          product.name
                        }
                        </a>
                      </Grid>
                      <Grid item xs={1} className={classes.mobileDeleteItem}>
                        <Button onClick={() => delItem(product.id)}>
                          <Icons name="delete" classes={{icon: classes.deleteIcon}} />
                        </Button>
                      </Grid>
                      <Hidden xsDown>
                        <Grid item lg={2} xs={6} className={classes.itemColumn}>
                          {
                            product.categories && product.categories.name
                          }
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          <a href={`/admin/products/colors/${product.id}`}>
                          {
                            product.productColors.length
                          }
                          </a>
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          <a href={`/admin/products/sizes/${product.id}`}>
                          {
                            product.productSizes.length
                          }
                          </a>
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          <a href={`/admin/products/items/${product.id}`}>
                          {
                            product.productProductItems.length
                          }
                          </a>
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          <a href={`/admin/products/discounts/${product.id}`}>
                          {
                            product.productProductDiscount.length
                          }
                          </a>
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          {
                            product.productBrand && product.productBrand.name
                          }
                        </Grid>
                        <Grid item lg={1} xs={6} className={classes.itemColumn}>
                          {
                            product.productStatus.name
                          }
                        </Grid>
                        <Grid item lg={1} className={classes.itemAction}>
                          <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => delItem(product.id)}>
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