import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateCart, deleteCart } from 'src/redux/actions/main'

import {
  Grid,
  Link,
  Button,
  Divider,
  Hidden,
  withWidth,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import Typography from '@/common/Typography';
import QuantitySelectorB from '@/common/QuantitySelectorB';
import CartBox from '@/components/cart/Block';
import Icons from '@/common/Icons';
import Snackbar from '@/common/Snackbar';
import { getProductById } from '@/api/products';
import { getProductItemByIds } from '@/api/productItems';
import { formatNumber, getCartTotal, getImage } from 'src/utils';
import { checkDiscountPrice, checkBundlePrice, isOutOfStock } from 'src/utils/products';
import { getImageUrlByType } from 'src/utils/form';
import { getColorName } from 'src/utils/helpers/product'

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
  cartItemTotal: {
    // borderRight: '1px solid #ccc',
    fontWeight: 'bold',
    padding: 9,
  },
  cartDescCont: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 8,
    }
  },
  cartSubtotalCont: {
    padding: '0 !important',
  },
  cartActionCont: {
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      padding: '2px 0px 2px 10px',
    },
    '& button': {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '100%',
      }
    }
  },
  cardDescDescription: {
    // whiteSpace: 'nowrap', 
    // width: 50, 
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
  cartPrice: {
    lineHeight: 2
  },
  cartPriceSave: {
    fontWeight: 600
  },
  cartItemCont: {
    padding: '0px 10px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  cartSelectCont: {
    textAlign: 'center',
    padding: '0px 10px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  cartItemDivider: {
    [theme.breakpoints.down('sm')]: {
      padding: '15px 0px',
    }
  },
  cartDropDown: {
    fontSize: '1em',
  },
  cartDropRoot: {
    padding: '10px 0px',
  },
  cardDescTitle: {
    fontSize: '1.2em',
    lineHeight: 1.5,
    textTransform: 'capitalize',
    '& a': {
      color: 'black',
    }
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
  deleteBtn: {
    [theme.breakpoints.down('sm')]: {
      height: '57px !important',
    }
  },
  deleteIcon: {
    width: 35,
    height: 35,
  },
  productPriceScratch: {
    textDecoration: 'line-through',
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
  }
}));

const Cart = ({cart, updateCart, deleteCart}) => {
  const classes = styles();
  const router = useRouter();
  const imageUrl = getImageUrlByType();
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

  const loadPriceInfo = (data) => {
    if (data.discount) {
      return (
        <>
        <Grid item lg={12} xs={12} className={classes.cartPrice}>
          <Typography align="left" component="p" className={classes.productPriceScratch}>
            { t('unit_price') }: ${data.originalPrice}
          </Typography>
        </Grid>
        <Grid item lg={12} xs={12} className={`${classes.cartPrice} ${classes.cartPriceSave}`}>
          <Typography align="left" component="p">
            { t('price_with_discount') }: ${data.retailPrice}
          </Typography>
        </Grid>
        <Grid item lg={12} xs={12}  className={classes.cartPrice}>
          <Typography align="left" component="p" className={classes.priceSave}>
            { t('saves') }: {`$${data.save_price} (${data.save_percentag_show})`}
          </Typography>
        </Grid>
        </>
      )
    } else {
      return (    
        <Grid item lg={12} xs={12} className={classes.cartPrice}>
          <Typography align="left" component="p">
            { t('price') }: ${data.retailPrice}
          </Typography>
        </Grid>
      )
    }
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
                    {
                      Object.keys(cart).map((key, index) => {
                        const item = cart[key];
                        const imgUrl = getImage(item)
      
                        return (
                          <Grid key={index} item lg={12} xs={12}>
                            <Grid container>
                              <Grid item lg={12} xs={12} className={classes.cartItemDivider} >
                                <Divider />
                              </Grid>
                              <Grid item lg={2} xs={5}  className={classes.cartImage}>
                                <Link href={`/product/${item.slug}`}>
                                  {
                                    imgUrl && imgUrl
                                  }
                                </Link>
                              </Grid>
                              <Grid item lg={6} xs={7} className={classes.cartDescCont}>
                                <Grid container>
                                  <Grid item lg={12} xs={12}>
                                    <Typography align="left" component="h4" className={classes.cardDescTitle}>
                                      { // If there is an productItemProduct, or it will crash page
                                        item.productItemProduct ? (
                                        <Link href={`/product/${item.slug}`}>{item.productItemProduct.name}</Link>
                                      ) : <></>
                                      }
                                    </Typography>
                                  </Grid>
                                  {
                                    loadPriceInfo(item)
                                  }
                                  <Grid item lg={12} xs={12} className={classes.cartPrice}>
                                    <Typography align="left" component="p">
                                      Sku: {item.sku}
                                    </Typography>
                                  </Grid>
                                  {
                                    item.productItemColor ? (
                                    <Grid item lg={12} xs={12} className={classes.cartPrice}>
                                      <Typography align="left" component="p">
                                        { t('common:color') }: { getColorName(item.productItemColor, t, 'colors') }
                                      </Typography>
                                    </Grid>
                                    ) : <></>
                                  }
                                  {
                                    item.productItemSize ? (
                                      <Grid item lg={12} xs={12} className={classes.cartPrice}>
                                        <Typography align="left" component="p">
                                          { t('size') }: {item.productItemSize.name}
                                        </Typography>
                                      </Grid>
                                    ) : <></>
                                  }
                                  {
                                    item.discount && (
                                      <Grid item lg={12} xs={12}>
                                        { t('message.discount_applied') }: { item.discount.name }
                                      </Grid>
                                    )
                                  }
                                  {
                                    item.bundle && (
                                      <Grid item lg={12} xs={12}>
                                        { t('message.discount_applied') }: { item.bundle.name }
                                      </Grid>
                                    )
                                  }
                                  <Hidden smUp>
                                    <strong>Total</strong>: {
                                      `$${formatNumber(item.retailPrice * parseInt(item.quantity))}`
                                    }
                                  </Hidden>
                                </Grid>
                              </Grid>
                              <Grid item lg={2} xs={9} className={classes.cartSelectCont}>
                                <QuantitySelectorB
                                  jump={item.bundle ? item.bundle.quantity : 0}  
                                  stock={item.stock} 
                                  data={item.quantity} 
                                  cart={cart}
                                  product={item}
                                  classes={{ root: classes.cartDropRoot}} 
                                  onChange={handleSelectChange} 
                                  id={`select-${key}`} 
                                />
                              </Grid>
                              <Hidden xsDown>
                                <Grid item lg={2} xs={12} >
                                  <Typography align="right" className={classes.cartItemTotal} variant="body1" component="p">
                                    ${formatNumber(item.retailPrice * parseInt(item.quantity))}
                                  </Typography>
                                </Grid>
                              </Hidden>
                              <Grid item lg={12} align="right" xs={3} className={classes.cartActionCont}>
                                <Hidden xsDown>
                                  <Button onClick={ () => handleDelete(index)} className={`${classes.deleteBtn} smallMainButton my-2`}>{ t('delete') }</Button>
                                </Hidden>
                                <Hidden lgUp>
                                  <a href="#" onClick={ (e) => handleDelete(index, e) }>
                                    <Icons name="delete" classes={{icon: `iconMainColor ${classes.deleteIcon}`}}/>
                                  </a>
                                </Hidden>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      })
                    }
                    <Hidden lgDown>
                      <Grid item lg={12} xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item lg={12} xs={12}>
                          <Typography variant="body1" align="right" component="p"  className={classes.firstSubTotal}>
                            { t('subtotal') } ${total.subtotal}
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
    ...await serverSideTranslations(locale, ['common', 'footer', 'colors']),
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(withWidth()(Cart));