import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button
} from '@material-ui/core';
import {isMobile} from 'react-device-detect';
import { connect } from 'react-redux';
import { useTranslation } from 'next-i18next'

import { getCartTotal, getTotal, getImage } from 'src/utils';
import { getColorName } from '@/utils/helpers/product'
import { isLoggedIn } from '@/utils/auth';

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
  originalPrice: {
    textDecoration: 'line-through',
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

const Index = React.memo(({
  data, 
  classes,
  showItems = true,
  showHeader = true,
  showCheckout = false,
  onCartTotal,
  userInfo,
  deliveryOption,
  promotionCode
}) => {
  const [products, setProducts] = useState([]);
  const [totals, setTotals] = useState({});
  const [checkoutHtml, setCheckoutHtml] = useState(null);
  const { t } = useTranslation(['common', 'colors'])

  const dispathGetTotal = useMemo(() => (obj) => {
    return getCartTotal(obj);
  }, [])

  useEffect(() => {
    if (showCheckout) {
      const checkUserLoggedIn = isLoggedIn();
      if (checkUserLoggedIn) {
        setCheckoutHtml(
          <Grid item lg={12} xs={12} >
            <Button href="/checkout/f=e" className={`mainButton`}>{ t('common:checkout') }</Button>
          </Grid>
        )
      } else {
        setCheckoutHtml(
          <Grid item lg={12} xs={12} >
            <Button href="/checkout" className={`mainButton`}>{ t('common:checkout') }</Button>
          </Grid>
        )
      }
    }
  }, [])

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
        delivery: deliveryOption ? deliveryOption : 0,
        coupon: promotionCode ? promotionCode.percentage : 0
      }
      const total = dispathGetTotal(obj);

      if (onCartTotal) {
        onCartTotal(total);
      }
      setTotals(total)
      setProducts(prods);
    }
  }, [data, deliveryOption, promotionCode]);

  return (
    <div className={isMobile ? classes.root : `${classes.root} checkoutStickyTotalBox`}>
      {
        showHeader && (
          <Grid container className={classes.itemHeader}>
            <Grid item lg={6} xs={6} className={classes.itemHeaderTitle}>
              { t('common:items') }: {products.length}
            </Grid>
            <Grid item lg={6} xs={6} className={classes.itemHeaderButton}>
              <a href="/cart">{ t('common:edit') }</a>
            </Grid>
          </Grid>
        )
      }
      {
        showItems && (
          <Grid container className={classes.itemItemsContainer}>
            {
              products && products.map((product, index) => {
                const image = getImage(product);
                const itemTotal = getTotal(product);
                return (
                  <Grid item key={index} lg={12} xs={12} className={`borderTopMain ${classes.itemItems}`}>
                    <Grid container className={classes.itemItemsItemsContainer}>
                      <Grid item lg={4} xs={4} className={classes.itemItemsImg}>
                      {
                        image
                      }
                      </Grid>
                      <Grid item lg={8} xs={8} className={classes.itemItemsContent}>
                        <p>{product.productItemProduct.name}</p>
                        <p>{ t('common:color') }: { getColorName(product.productItemColor, t, 'colors') }</p>
                        <p>{ t('common:size') }: {product.productItemSize.name}</p>
                        <p>{ t('common:quantity') }: {product.quantity}</p>
                        {
                          product.save_price ? (
                            <p>{ t('common:price') }: <span className={classes.originalPrice}>${product.originalPrice}&nbsp; </span>${product.retailPrice}</p>
                          ) : (
                            <p>{ t('common:price') }: ${product.retailPrice}</p>
                          )
                        }
                        <p>{ t('common:total') }: {`${itemTotal}`}</p>
                        {
                          product.bundle && (
                            <p>{ t('common:bundle') }:&nbsp;{`${product.bundle.name}`}</p>   
                          )
                        }
                        {
                          product.discount && (
                            <p>{ t('common:discount') }:&nbsp;{`${product.discount.name}`}</p>   
                          )
                        }
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
              { t('common:subtotal') }
            </Grid>
            <Grid item className={classes.totalTotalTotal}>
              ${totals.subtotal}
            </Grid>
          </Grid>
        </Grid>
        {
          totals.coupon > 0 && (
            <Grid item className={classes.totalTotalitems} lg={12} xs={12}>
              <Grid container className={classes.totalTotalContainer}>
                <Grid item className={classes.totalTotalTitle}>
                  { t('common:promo') }
                </Grid>
                <Grid item className={classes.totalTotalTotal}>
                  - ${totals.coupon}
                </Grid>
              </Grid>
            </Grid>
          )
        }
        <Grid item className={classes.totalTotalitems} lg={12} xs={12}>
          <Grid container className={classes.totalTotalContainer}>
            <Grid item className={classes.totalTotalTitle}>
              { t('common:tax') } 7%
            </Grid>
            <Grid item className={classes.totalTotalTotal}>
            ${totals.taxes}
            </Grid>
          </Grid>
        </Grid>

        <Grid item className={classes.totalTotalitems} lg={12} xs={12}>
          <Grid container className={classes.totalTotalContainer}>
            <Grid item className={classes.totalTotalTitle}>
              { t('common:delivery') }
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
                  { t('common:grand_total') }
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
                  <b>{ t('common:grand_total') }</b>
                </Grid>
                <Grid item className={classes.totalTotalTotal}>
                  <b>${totals.grandTotal}</b>
                </Grid>
              </Grid>
            </Grid>
          )
        }
        {
          totals.saved > 0 && (
            <Grid item className={classes.totalTotalitems} lg={12} xs={12}>
              <Grid container className={classes.totalTotalContainer}>
                <Grid item className={classes.totalTotalTitle}>
                  { t('common:message.you_saved') }
                </Grid>
                <Grid item className={classes.totalTotalTotal}>
                  - ${totals.saved}
                </Grid>
              </Grid>
            </Grid>
          )
        }
        {
          checkoutHtml
        }
      </Grid>
    </div>
  );
})

Index.protoTypes = {
  classes: T.object,
  data: T.object.isRequired,
  showItems: T.bool,
  onCartTotal: T.func,
  showHeader: T.bool,
  promotionCode: T.object,
  deliveryOption: T.Object,
  showCheckout: T.bool,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Index));