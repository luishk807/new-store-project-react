import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateCart, deleteCart } from '../redux/actions/main'

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

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import Typography from '../components/common/Typography';
import QuantitySelectorB from '../components/common/QuantitySelectorB';
import TextEllipsis from '../components/common/TextEllipsis';
import CartBox from '../components/CartBlock';
import Icons from '../components/common/Icons';
import { getProductById } from '../api/products';
import { formatNumber, getCartTotal, getImage } from '../utils';
import { checkDiscountPrice, checkBundlePrice } from '../utils/products';
import { getImageUrlByType } from '../utils/form';

const styles = makeStyles((theme) => ({
  root: {
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      padding: 5,
    }
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
}));

const Cart = ({cart, updateCart, deleteCart}) => {
  const classes = styles();
  const router = useRouter();
  const imageUrl = getImageUrlByType();
  const [total, setTotals] = useState({
    subtotal: 0,
    taxes: 0,
    delivery: 0,
    grandTotal: 0,
  })
  const [showCart, setShowCart] = useState(false);
  const { t } = useTranslation('common')

  const handleSelectChange = async(resp) => {
    const index = resp.id.split("-")[1]
    const mainProduct = await getProductById(cart[index].productId);
    const currItem = cart[index];
    if (currItem.bundle) {
      const getDiscountItem = await checkBundlePrice(mainProduct, currItem, resp.value);
      await updateCart(getDiscountItem)
    } else {
      const getDiscountItem = await checkDiscountPrice(mainProduct, currItem, resp.value);
      await updateCart(getDiscountItem)
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
    } else if (data.bundle) {
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
            { t('saves') }: {`$${data.save_price}`}
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

  useEffect(() => {
    const total = getCartTotal({cart: cart});
    setShowCart(!!Object.keys(cart).length)
    setTotals(total)
  }, [cart])

  return (
    <LayoutTemplate>
      <div className={classes.root}>
      {
        showCart ? (
          <Grid container spacing={2}>
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
                          <Link href={`/product/${item.productId}`}>
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
                                  <Link href={`/product/${item.productItemProduct.id}`}>{item.productItemProduct.name}</Link>
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
                                  { t('color') }: {item.productItemColor.name}
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
        </Grid>
        ) : (
          <Grid container spacing={2}>
          <Grid item lg={10} xs={12} className={classes.cartItemCont}>
            <Grid container>
              <Grid item lg={12} xs={12} className={classes.cartTitleCont}>
                <Typography variant="h5" align="center" component="p">
                  { t('message.cart_empty') }
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        )
      }
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
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(withWidth()(Cart));