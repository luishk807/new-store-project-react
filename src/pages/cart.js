import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateCart, deleteCart } from '../redux/actions/main'

import {
  Grid,
  withStyles,
  Link,
  Button,
  Divider,
  CardMedia,
  CardContent,
  Card,
  Hidden,
  CardActions,
  withWidth,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';

import { formatNumber, getCartTotal } from '../utils';
import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import Typography from '../components/common/Typography';
import { noImageUrl } from '../../config';
import QuanitySelector from '../components/common/QuanitySelector';
import { CartSample } from '../constants/samples/CartSample';
import { makeStyles } from '@material-ui/core/styles';
import { getImageUrlByType } from '../utils/form';
import TextEllipsis from '../components/common/TextEllipsis';
import CartBox from '../components/CartBlock';

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

  cardDescTitle: {
    fontSize: '2em',
    lineHeight: 1.5,
    textTransform: 'capitalize',
    '& a': {
      color: 'black',
    }
  },
  cartImage: {
    padding: 10
  },
  cartGrandCont: {
    padding: '10px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  }
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
    cart[index]['quantity'] = resp.value;
    await updateCart(cart[index])
  }

  const handleDelete = (index) => {
    deleteCart(cart[index])
  }

  useEffect(() => {
    const total = getCartTotal(cart);
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
                  Your Cart
                </Typography>
              </Grid>
              {
                Object.keys(cart).map((key, index) => {
                  const item = cart[key];
                  const imgUrl = item.productImages && item.productImages.length ? (
                    <img src={`${imageUrl}/${item.productImages[0].img_url}`} className="img-fluid" />
                  ) : (
                    <img src={`${noImageUrl.img}`} className="img-fluid" />
                  );
                  return (
                    <Grid key={index} item lg={12} xs={12}>
                      <Grid container>
                        <Grid item lg={12} xs={12} className={classes.cartItemDivider} >
                          <Divider />
                        </Grid>
                        <Grid item lg={2} xs={4}  className={classes.cartImage}>
                          <Link href='/product'>
                            {
                              imgUrl && imgUrl
                            }
                          </Link>
                        </Grid>
                        <Grid item lg={6} xs={8} className={classes.cartDescCont}>
                          <Grid container>
                            <Grid item lg={12} xs={12}>
                              <Typography align="left" component="h4" className={classes.cardDescTitle}>
                                <Link href="/">{item.name}</Link>
                              </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                              <TextEllipsis classes={classes.cardDescDescription} text={item.description} limit={100} />
                            </Grid>
                            <Hidden lgDown>
                              <Grid item lg={12} xs={12}>
                                <Typography align="left" variant="body1" component="p">
                                  {formatNumber(item.amount)}
                                </Typography>
                              </Grid>
                            </Hidden>
                          </Grid>
                        </Grid>
                        <Grid item lg={2} xs={6} className={classes.cartSelectCont}>
                          <QuanitySelector data={item.quantity} classes={{ productSelectDrop: classes.cartDropDown}} onChange={handleSelectChange} title="quantity" id={`select-${key}`} />
                        </Grid>
                        <Hidden xsDown>
                          <Grid item lg={2} xs={12} >
                            <Typography align="right" className={classes.cartItemTotal} variant="body1" component="p">
                              ${formatNumber(item.amount * parseInt(item.quantity))}
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Grid item lg={12} align="right" xs={6} className={classes.cartActionCont}>
                          <Button onClick={ () => handleDelete(index)} className={`smallMainButton my-2`}>Delete</Button>
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
                  Your Cart is Empty
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