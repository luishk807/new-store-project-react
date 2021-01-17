import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button
} from '@material-ui/core';
import Icons from './common/Icons';
import { connect } from 'react-redux';
import { formatNumber, getCartTotal } from '../utils';
import { getImageUrlByType } from '../utils/form';
import { noImageUrl } from '../../config';
import TextEllipsis from './common/TextEllipsis';
const styles = (theme) => ({
  root: {
    width: '100%',
    padding: 8,
    background: 'rgba(0,0,0, .04)',
  },
  centerContainer: {
    display: 'flex',
    aligmItems: 'center',
  },

  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  itemHeaderTitle: {
    textAlign: 'left',
  },
  itemHeaderButton: {
    textAlign: 'right',
    '& a': {
      color: 'black',
      textDecoration: 'none'
    },
    '& a:hover': {
      textDecoration: 'underline'
    }
  },
  itemItemsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  itemItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '15px 8px',
    margin: '7px 0px',
  },
  itemItemsItemsContainer: {
    textAlign: 'left',
  },
  itemItemsImg: {
    textAlign: 'left',
  },
  itemItemsContent: {
    padding: '0px 10px',
    fontSize: '.8em',
  },
  itemItemsContentDescription: {
    fontSize: 'inherit',
    marginBottom: '1px'
  },
  totalContainer: {
    margin: '10px 0px',
  },
  totalTotalitems: {
    padding: 8,
    '&:last-child > div': {
      fontWeight: 'bold'
    }
  },
  totalTotalitemsCheckout: {
    padding: 10,
    margin: '10px 0px',
  },
  totalTotalContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  totalTotalTitle: {
    textAlign: 'left',
  },
  totalTotalTotal: {
    textAlign: 'right',
  }
});

const Index = ({
  data, 
  classes,
  showItems = true,
  showHeader = true,
  showCheckout = false,
  onCartTotal,
  userInfo,
  deliveryOption
}) => {
  const imageUrl = getImageUrlByType('product');
  const [products, setProducts] = useState([]);
  const [totals, setTotals] = useState({});

  const setDelivery = (val) => {
    setTotal({
      ...totals,
      delivery: val
    })
  }

  useEffect(() => {
    if (data && Object.keys(data).length) {
      let prods = [];
      if (Object.keys(data).length) {
        for(const item in data) {
          prods.push(data[item]);
        }
      }
      const cart = Object.assign({}, data);

      const obj = {
        cart: cart,
        delivery: deliveryOption ? deliveryOption : 0
      }
      const total = getCartTotal(obj);

      if (onCartTotal) {
        onCartTotal(total);
      }
      
      setTotals(total)
      setProducts(prods);
    }
  }, [data, deliveryOption]);

  return (
    <div className={classes.root}>
      {
        showHeader && (
          <Grid container className={classes.itemHeader}>
            <Grid item lg={6} xs={6} className={classes.itemHeaderTitle}>
              Items: {products.length}
            </Grid>
            <Grid item lg={6} xs={6} className={classes.itemHeaderButton}>
              <a href="/cart">Edit</a>
            </Grid>
          </Grid>
        )
      }
      {
        showItems && (
          <Grid container className={classes.itemItemsContainer}>
            {
              products && products.map((product, index) => {
                const image = product.productImages && product.productImages.length ? <img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} alt={product.name} /> : <img className={`img-fluid`}  src={`${noImageUrl.img}`} alt={noImageUrl.alt} />
                return (
                  <Grid item key={index} lg={12} xs={12} className={`borderTopMain ${classes.itemItems}`}>
                    <Grid container className={classes.itemItemsItemsContainer}>
                      <Grid item lg={4} xs={4} className={classes.itemItemsImg}>
                      {
                        image
                      }
                      </Grid>
                      <Grid item lg={8} xs={8} className={classes.itemItemsContent}>
                        <p>${product.amount}</p>
                        <p>{product.name}</p>
                        <TextEllipsis classes={classes.itemItemsContentDescription} text={product.description} limit={50} />
                        <p>color:</p>
                        <p>size:</p>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        )
      }
      <Grid container className={`${showItems && 'borderTopMain'} ${classes.totalContainer}`}>
        <Grid item className={classes.totalTotalitems} lg={12} xs={12}>
          <Grid container className={classes.totalTotalContainer}>
            <Grid item className={classes.totalTotalTitle}>
              Subtotal
            </Grid>
            <Grid item className={classes.totalTotalTotal}>
              ${totals.subtotal}
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.totalTotalitems} lg={12} xs={12}>
          <Grid container className={classes.totalTotalContainer}>
            <Grid item className={classes.totalTotalTitle}>
              Tax
            </Grid>
            <Grid item className={classes.totalTotalTotal}>
            ${totals.taxes}
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.totalTotalitems} lg={12} xs={12}>
          <Grid container className={classes.totalTotalContainer}>
            <Grid item className={classes.totalTotalTitle}>
              Delivery
            </Grid>
            <Grid item className={classes.totalTotalTotal}>
              ${totals.delivery}
            </Grid>
          </Grid>
        </Grid>

        {
          showCheckout ? (
            <Grid item className={`${showCheckout && 'borderTopMain'} ${classes.totalTotalitemsCheckout}`} lg={12} xs={12}>
              <Grid container className={classes.totalTotalContainer}>
                <Grid item className={classes.totalTotalTitle}>
                  GrandTotal
                </Grid>
                <Grid item className={classes.totalTotalTotal}>
                  ${totals.grandTotal}
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item className={`${classes.totalTotalitems}`} lg={12} xs={12}>
              <Grid container className={classes.totalTotalContainer}>
                <Grid item className={classes.totalTotalTitle}>
                  GrandTotal
                </Grid>
                <Grid item className={classes.totalTotalTotal}>
                  ${totals.grandTotal}
                </Grid>
              </Grid>
            </Grid>
          )
        }
        {
          showCheckout && (
            <Grid item lg={12} xs={12} >
              <Button href={`${userInfo.id ? '/checkout/f=e' : '/checkout'}`} className={`mainButton`}>Checkout</Button>
            </Grid>
          )
        }
      </Grid>
    </div>
  );
}

Index.protoTypes = {
  classes: T.object,
  data: T.object.isRequired,
  showItems: T.bool,
  onCartTotal: T.func,
  showHeader: T.bool,
  deliveryOption: T.Object,
  showCheckout: T.bool,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Index));