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
import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import Typography from '../components/common/Typography';
import QuanitySelector from '../components/common/QuanitySelector';
import { CartSample } from '../constants/samples/CartSample';
import { makeStyles } from '@material-ui/core/styles';
import { getImageUrlByType } from '../utils/form';

const styles = makeStyles((theme) => ({
  root: {
    padding: 30,
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
      padding: 0,
    }
  },
  cartSubtotalCont: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  cartActionCont: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
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
  cartDropDown: {
    fontSize: '1em',
  },
  cartTotalItems: {
    padding: '2px 0px;',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  cartTotalCont: {
    background: '#F8F8F8',
    padding: 8,
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
  const [cartItems, setCartItems] = useState({})
  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log("hey hey", value)
  }

  useEffect(() => {
    if (cart) {
      Object.keys(cart).map((key, index) => {
        if (cart[key].amount) {
          let test = cart[key].amount;
          console.log(parseFloat(test.replace(/\$/g, '')))
        }
        console.log('hi', key, ':', cart[key].amount)
        
      })
      //console.log("hey", data)
    }
  }, [])
  return (
    <LayoutTemplate>
      <div className={classes.root}>
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
                  return (
                    <Grid key={index} item lg={12} xs={12}>
                      <Grid container>
                        <Grid item lg={12} xs={12}>
                          <Divider />
                        </Grid>
                        <Grid item lg={2} xs={4}  className={classes.cartImage}>
                          <Link href='/product'>
                            <img src={`${imageUrl}/${item.product_images[0].img_url}`} className="img-fluid" />
                          </Link>
                        </Grid>
                        <Grid item lg={6} xs={8} className={classes.cartDescCont}>
                          <Grid container>
                            <Grid item lg={12} xs={12}>
                              <Typography align="left" variant="body1" component="p">
                                {item.description}
                              </Typography>
                            </Grid>
                            <Hidden lgDown>
                              <Grid item lg={12} xs={12}>
                                <Typography align="left" variant="body1" component="p">
                                  {item.amount}
                                </Typography>
                              </Grid>
                            </Hidden>
                          </Grid>
                        </Grid>
                        <Grid item lg={2} xs={4} className={classes.cartSelectCont}>
                          <QuanitySelector data={item.quantity} classes={{ productSelectDrop: classes.cartDropDown}} onChange={handleSelectChange} title="quantity" id="quant-select" />
                        </Grid>
                        <Hidden xsDown>
                          <Grid item lg={2} xs={12} >
                            <Typography align="right" className={classes.cartItemTotal} variant="body1" component="p">
                              {item.amount}
                            </Typography>
                          </Grid>
                        </Hidden>
                        <Grid item lg={12} xs={8} className={classes.cartActionCont}>
                          <Typography align="right" variant="body1" component="p">
                            <Button className={`smallMainButton my-2`}>Delete</Button>
                          </Typography>
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
                       Subtotal $9.00
                    </Typography>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={2} className={classes.cartSubtotalCont}>
            <Grid container spacing={2} className={classes.cartTotalCont}>
              <Grid item xs={12} lg={12} xs={12} className={classes.cartTotalItems}>
                <Grid container>
                  <Grid item xs={10} lg={10}>
                    <Typography variant="body1" component="p">
                      Subtotal
                    </Typography>
                  </Grid>
                  <Grid item xs={2} lg={2}>
                    <Typography variant="body1" component="p">
                       $9.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} xs={12} className={classes.cartTotalItems}>
                <Grid container>
                  <Grid item lg={10} xs={10}>
                    <Typography variant="body1" component="p">
                      Delivery
                    </Typography>
                  </Grid>
                  <Grid item lg={2} xs={2}>
                    <Typography variant="body1" component="p">
                       $9.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} xs={12} className={classes.cartTotalItems}>
                <Grid container>
                  <Grid item lg={10} xs={10}>
                    <Typography variant="body1" component="p">
                      Taxes
                    </Typography>
                  </Grid>
                  <Grid item lg={2} xs={2}>
                    <Typography variant="body1" component="p">
                       $9.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} xs={12}>
                <Divider />
              </Grid>
              <Grid item lg={12} xs={12} className={classes.cartGrandCont}>
                <Grid container>
                  <Grid item lg={10} xs={10}>
                    <Typography variant="body1" component="p">
                      Grand Total
                    </Typography>
                  </Grid>
                  <Grid item lg={2} xs={2}>
                    <Typography variant="body1" component="p">
                       $9.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={12} xs={12} >
                <Button className={`mainButton`}>Checkout</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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