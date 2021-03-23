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

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import Typography from '../components/common/Typography';
import { getProductById } from '../api/products';
import QuantitySelectorB from '../components/common/QuantitySelectorB';
import { formatNumber, getCartTotal, getImage } from '../utils';
import { checkDiscountPrice } from '../utils/products';
import { getImageUrlByType } from '../utils/form';
import TextEllipsis from '../components/common/TextEllipsis';
import CartBox from '../components/CartBlock';
import Icons from '../components/common/Icons';

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

  const handleSelectChange = async(resp) => {
    const index = resp.id.split("-")[1]
    const mainProduct = await getProductById(cart[index].productId);
    cart[index] = await checkDiscountPrice(mainProduct, cart[index], resp.value);
    await updateCart(cart[index])
  }

  const handleDelete = (index, e) => {
    if (e) {
      e.preventDefault();
    }
    deleteCart(cart[index])
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
                  Cart View
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
                                <Link href={`/product/${item.productItemProduct.id}`}>{item.productItemProduct.name}</Link>
                              </Typography>
                            </Grid>
                            {

                              item.discount ? (
                                <>
                                <Grid item lg={12} xs={12} className={classes.cartPrice}>
                                  <Typography align="left" component="p" className={classes.productPriceScratch}>
                                    Precio Unitario: ${item.originalPrice}
                                  </Typography>
                                </Grid>
                                <Grid item lg={12} xs={12} className={`${classes.cartPrice} ${classes.cartPriceSave}`}>
                                  <Typography align="left" component="p">
                                    Precio con Desc.: ${item.retailPrice}
                                  </Typography>
                                </Grid>
                                <Grid item lg={12} xs={12}  className={classes.cartPrice}>
                                  <Typography align="left" component="p" className={classes.priceSave}>
                                    Ahorras: {`$${item.save_price} (${item.save_percentag_show})`}
                                  </Typography>
                                </Grid>
                                </>
                              ) : (
                                <Grid item lg={12} xs={12} className={classes.cartPrice}>
                                  <Typography align="left" component="p">
                                    Price: ${item.retailPrice}
                                  </Typography>
                                </Grid>
                              )
                            }
                            <Grid item lg={12} xs={12} className={classes.cartPrice}>
                              <Typography align="left" component="p">
                                Sku: {item.sku}
                              </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12} className={classes.cartPrice}>
                              <Typography align="left" component="p">
                                Color: {item.productItemColor.name}
                              </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12} className={classes.cartPrice}>
                              <Typography align="left" component="p">
                                Size: {item.productItemSize.name}
                              </Typography>
                            </Grid>
                            {
                              item.discount && (
                                <Grid item lg={12} xs={12}>
                                  Discount Applied: { item.discount.name }
                                </Grid>
                              )
                            }
                          </Grid>
                        </Grid>
                        <Grid item lg={2} xs={9} className={classes.cartSelectCont}>
                          <QuantitySelectorB stock={item.stock} data={item.quantity} classes={{ root: classes.cartDropRoot}} onChange={handleSelectChange} id={`select-${key}`} />
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
                            <Button onClick={ () => handleDelete(index)} className={`${classes.deleteBtn} smallMainButton my-2`}>Delete</Button>
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
                       Subtotal ${total.subtotal}
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
                  Su carrito esta vacio
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
export default connect(mapStateToProps,mapDispatchToProps)(withWidth()(Cart));