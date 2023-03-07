import React, { useState, useEffect, useDeferredValue } from 'react';
import { connect } from 'react-redux';
import { updateCart, deleteCart } from 'src/redux/actions/main'

import {
  Grid,
  Divider,
  Hidden,
  withWidth,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import Typography from '@/common/Typography';
import CartBox from '@/components/cart/Block';
import Snackbar from '@/common/Snackbar';
import { getProductById } from '@/api/products';
import { getProductItemByIds } from '@/api/productItems';
import { getCartTotal } from 'src/utils';
import { checkDiscountPrice, checkBundlePrice, isOutOfStock } from 'src/utils/products';
import CartItem from '../components/cart/CartItem';

const styles = makeStyles((theme) => ({
  root: {
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      padding: 5,
    }
  },
  cartContainer: {
    justifyContent: 'center'
  },
  firstSubTotal: {
    fontWeight: 'bold',
    padding: 5
  },
  cartTitleCont: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  cartSubtotalCont: {
    padding: '0 !important',
  },
  cardDescDescription: {
    // whiteSpace: 'nowrap', 
    // width: 50, 
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
  cartItemCont: {
    padding: '0px 10px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  cartDropDown: {
    fontSize: '1em',
  },
  cartDropRoot: {
    padding: '10px 0px',
  },
  cartImage: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 1,
    }
  },
  cartGrandCont: {
    padding: '10px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  priceSave: {
    color: 'red',
  },
  cartUpdatedItem: {
    textAlign: 'center',
    border: '2px solid orange',
    color: 'orange',
    margin: '10px auto',
    justifyContent: 'center',
    display: 'flex',
    padding: '15px 50px',
    fontSize: '1em',
  },
}));

const Cart = ({cart, updateCart, deleteCart}) => {
  const classes = styles();
  const [stockVerified, setStockVerified] = useState(false);
  const [cartChanged, setCartChanged] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    anchorPost: null,
    text: '',
  });
  const [total, setTotals] = useState({
    subtotal: 0,
    taxes: 0,
    delivery: 0,
    grandTotal: 0,
  })
  const deferredTotal = useDeferredValue(total);

  const [showCart, setShowCart] = useState(false);
  const { t } = useTranslation(['common', 'colors'])

  const handleSelectChange = async(resp) => {
    const index = resp.id.split("-")[1]
    const mainProduct = await getProductById(cart[index].productId);
    const currItem = cart[index];
    
    let getOutStock = null;

    if (resp.value > 0) {
      if (currItem.bundle) {
        const getDiscountItem = await checkBundlePrice(mainProduct, currItem, resp.value);
        
        getOutStock = isOutOfStock(getDiscountItem, cart, true);
        if (getOutStock <= currItem.stock) {
          await updateCart(getDiscountItem)
        }
      } else {
        const getDiscountItem = await checkDiscountPrice(mainProduct, currItem, resp.value);
      //  await updateCart(getDiscountItem)
        getOutStock = isOutOfStock(getDiscountItem, cart, true);
        if (getOutStock <= currItem.stock) {
          await updateCart(getDiscountItem)
        }
        
      }
    }
  }

  const handleDelete = (index, e) => {
    if (e) {
      e.preventDefault();
    }
    deleteCart(cart[index])
  }


  const checkStock = async(cart) => {
    const productItemIds = Object.keys(cart).map(key => Number(cart[key].id));
    if (productItemIds && productItemIds.length) {
      const getProductItems = await getProductItemByIds(productItemIds);
      Object.keys(cart).forEach((key) => {
        const currProd = getProductItems.filter(item => item.id === cart[key].id)[0];
        if (currProd && cart[key].stock > currProd.stock) {
          //  setCartChanged(true);
          setSnack({
            severity: 'warning',
            anchorPost: 'top',
            open: true,
            text: t('message.cart_updated'),
          })
           deleteCart(cart[key]);
        }
      })
      setStockVerified(true);
    }
  }

  useEffect(() => {
    if (cart && stockVerified) {
      // checkStock(cart);
      const total = getCartTotal({cart: cart});
      setShowCart(!!Object.keys(cart).length)
      setTotals(total)
    }
  }, [stockVerified])

  useEffect(() => {
    if (cart && !stockVerified) {
      checkStock(cart);
    }
    if (!Object.values(cart).length) {
      setShowCart(false);
      setStockVerified(false);
    }
  }, [cart])

  return (
    <LayoutTemplate>
      <div className={classes.root}>
          <Grid container spacing={2} className={classes.cartContainer}>
            {
              showCart ? (
                <>
                <Grid item lg={10} xs={12} className={classes.cartItemCont}>
                  <Grid container>
                    <Grid item lg={12} xs={12} className={classes.cartTitleCont}>
                      <Typography variant="h5" component="p">
                        { t('cart_view') }
                      </Typography>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                      <CartItem 
                        cart={cart}
                        onDelete={handleDelete}
                        onQuantityChange={handleSelectChange}
                      />
                    </Grid>
                    <Hidden lgDown>
                      <Grid item lg={12} xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item lg={12} xs={12}>
                          <Typography variant="body1" align="right" component="p"  className={classes.firstSubTotal}>
                            { t('subtotal') } ${deferredTotal.subtotal}
                          </Typography>
                      </Grid>
                    </Hidden>
                  </Grid>
                </Grid>
                <Grid lg={2} item xs={12} className={classes.cartSubtotalCont}>
                  <CartBox data={cart} showItems={false} showHeader={false} showCheckout={true} />
                </Grid>
              </>
              ) : (
                <>
                {
                  cartChanged && (
                    <Grid item lg={10} xs={12} className={classes.cartUpdatedCont}>
                      <Grid container>
                        <Grid item lg={5} xs={12} className={classes.cartUpdatedItem}>
                          {
                            t('message.cart_updated')
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                }
                <Grid item lg={10} xs={12} className={classes.cartItemCont}>
                  <Grid container>
                    <Grid item lg={12} xs={12} className={classes.cartTitleCont}>
                      <Typography variant="h5" align="center" component="p">
                        { t('message.cart_empty') }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                </>
              )
            }
        </Grid>
        <Snackbar open={snack.open} anchorPost={snack.anchorPost} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
      </div>
    </LayoutTemplate>
  );
}

const mapStateToProps = state => ({
  cart: state.cart
}) // add reducer access to props
const mapDispatchToProps = {
  updateCart: updateCart,
  deleteCart: deleteCart
}

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer', 'colors', 'product']),
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(withWidth()(Cart));