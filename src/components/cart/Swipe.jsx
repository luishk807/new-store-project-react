import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Link,
  Button,
  Grid,
  SwipeableDrawer
} from '@material-ui/core';
import {isMobile} from 'react-device-detect';
import Pluralize from 'react-pluralize'
import { connect } from 'react-redux';
import { useTranslation } from 'next-i18next'
import { getImage, getCartTotalItems, getCartTotal, getTotal } from 'src/utils';
import Icons from '@/common/Icons';
import { getColorName } from '@/utils/helpers/product'
import { isLoggedIn } from '@/utils/auth';

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: 8,
    background: 'rgba(0,0,0, .04)',
  },
  title: {
    fontSize: '1em',
  },
  titleTitle: {
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
  swipeContainer: {
    width: 350,
    overflow: 'hidden',
  },
  cartHeader: {
    padding: 10
  },
  cartItemsMain: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  itemImg: {
    padding: 10,
    alignItems: 'center',
    display: 'flex',
  },
  itemText: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 'inherit',
    justifyContent: 'start',
    alignItems: 'self-start',
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  itemTitle: {
    fontWeight: 'bold'
  },
  cartItemsCont: {
    borderTop: '1px solid #ccc',
    padding: '15px 0px'
  },
  cartMainItemContainer: {
    overflowY: 'auto',
    height: '100%',
    height: 'calc(100vh - 75px - 100px)',
  }
});

const Swipe = React.memo(({
  classes,
  cart,
  userInfo,
  data,
  forceUpdate
}) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [checkoutBtnHtml, setCheckoutBtnHtml] = useState(null);
  const [cartItemsTotal, setCartItemsTotal] = useState(0);
  const [cartTotal, setCartTotal] = useState({});
  const [checkUpdate, setCheckUpdate] = useState(false)
  const { t } = useTranslation(['common'])

  useEffect(() => {
    if (Object.keys(cart).length) {
      const data = Object.values(cart);
      const tempCart = {
        cart: data
      }
      const getTotal = getCartTotal(tempCart);
      setCartTotal(getTotal);
      setCartData(Object.values(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (cartData) {
      const total = getCartTotalItems(cartData);
      setCartItemsTotal(total);
      setShowCart(true)
    }
  }, [cartData]);

  useEffect(() => {
    if (data) {
      setShowData(true)
    }
    if (data && forceUpdate != checkUpdate) {
      setCheckUpdate(forceUpdate)
        setCartOpen(true) 
    }
  }, [data, forceUpdate])

  useEffect(() => {
    const checkUserLoggedIn = isLoggedIn();

    if (checkUserLoggedIn) {
      setCheckoutBtnHtml(
        <Button href="/checkout/f=e" className={`mainButton`}>{ t('common:checkout') }</Button>
      )
    } else {
      setCheckoutBtnHtml(
        <Button href="/checkout" className={`mainButton`}>{ t('common:checkout') }</Button>
      )
    }
  }, [])

  const handleCloseCart = () => {
    setCartOpen(false);
  }

  return (
    <SwipeableDrawer
      anchor="right"
      open={cartOpen}
      onClose={handleCloseCart}
      onOpen={() => setCartOpen(true)}
    >
      <Grid container className={classes.swipeContainer}>
        <Grid item lg={12} xs={12} className={classes.cartHeader}>
          <Grid container>
            <Grid item lg={10} xs={10} className={classes.title}>
              { showData && (
                  <>
                    <span className={classes.titleTitle}>{data.productItemProduct.name}</span>
                    &nbsp;<span className={classes.titleCart}>{t('added_to_cart')}</span>
                    &nbsp;<span>(<Pluralize singular={t('item')} plural={t('items')} count={cartItemsTotal} />)</span>
                  </>
              ) }
            </Grid>
            <Grid item lg={2} xs={2}>
              <Button className={`iconBtnBlackSimple`} onClick={handleCloseCart}>
                <Icons name="close" classes={{icon:classes.closeIcon}}/>
              </Button>
            </Grid>
            <Grid item lg={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={6} xs={6}>
                  <Button className={`secondButton`} href="/cart">{ t('cart') }</Button>
                </Grid>
                <Grid item lg={6} xs={6}>
                  {
                    checkoutBtnHtml
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12}  className={classes.cartMainItemContainer}>
          <Grid container>
            {
              showCart && cartData.map((item, index) => {
                const img = getImage(item)
                return (
                  <Grid item key={index} lg={12} xs={12} className={classes.cartItemsMain}>
                    <Grid container className={classes.cartItemsCont}>
                      <Grid item lg={12} xs={12}>
                        <Grid container>
                          <Grid item lg={4} xs={4} className={classes.itemImg}>
                            {/* image */}
                            {
                              img
                            }
                          </Grid>
                          <Grid item lg={8} xs={8} className={classes.itemText}>
                            <span className={classes.itemTitle}>{item.productItemProduct.name}</span>
                            <span>{ t('color') }: { getColorName(item.productItemColor, t, 'colors') }</span>
                            <span>{ t('size') }: {item.productItemSize.name}</span>
                            <span>{ t('quantity') }: {item.quantity}</span>
                            {
                              item.bundle && (
                                <span>{ t('bundle') }: {item.bundle.name}</span>
                              )
                            }
                            <span>{t('price')}: <b>{getTotal(item)}</b></span>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>

      </Grid>
    </SwipeableDrawer>
  );
})

Swipe.protoTypes = {
  classes: T.object,
  data: T.object.isRequired,
  forceUpdate: T.bool
}

const mapStateToProps = state => ({
  cart: state.cart,
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Swipe));