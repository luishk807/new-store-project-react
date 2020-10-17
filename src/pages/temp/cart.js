import React from 'react';
import * as T from 'prop-types';
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
import Select from '../components/common/Select';
import { CartSample } from '../constants/samples/CartSample';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    padding: 30,
    [theme.breakpoints.down('sm')]: {
      padding: 5,
    }
  },
  cartTitleCont: {
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  cartItemCont: {
    borderRight: '1px solid #ccc',
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
  cartTotalCont: {
    padding: '2px 0px;',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  },
  cartGrandCont: {
    padding: '10px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    }
  }
}));

const Cart = (props) => {
  const classes = styles();
  const data = CartSample;

  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log("hey hey", value)
  }

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
                data.map((item, index) => {
                  return (
                    <Grid item lg={12} xs={12}>
                      <Grid container>
                        <Grid item lg={12} xs={12}>
                          <Divider />
                        </Grid>
                        <Grid item lg={2} xs={4}>
                          <Link href='/product'>
                            <img src={`/images/products/${item.image}`} className="img-fluid" />
                          </Link>
                        </Grid>
                        <Grid item lg={6} xs={8} className={classes.cartDescCont}>
                          <Grid container>
                            <Grid item lg={12} xs={12}>
                              <Typography align="left" variant="body1" component="p">
                                {item.desc}
                              </Typography>
                            </Grid>
                            <Hidden lgDown>
                              <Grid item lg={12} xs={12}>
                                <Typography align="left" variant="body1" component="p">
                                  ${item.total}
                                </Typography>
                              </Grid>
                            </Hidden>
                          </Grid>
                        </Grid>
                        <Grid item lg={2} xs={4} className={classes.cartSelectCont}>
                          <Select data={item.quantity} classes={{ productSelectDrop: classes.cartDropDown}} onChange={handleSelectChange} title="quant" id="quant-select" />
                        </Grid>
                        <Hidden xsDown>
                          <Grid item lg={2} xs={12} className={classes.cartItemCont}>
                            <Typography align="right" variant="body1" component="p">
                              ${item.total}
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
            </Grid>
          </Grid>
          <Hidden lgDown>
            <Grid item lg={12} xs={12}>
              <Divider />
            </Grid>
          </Hidden>
          <Grid item xs={12} xs={12} lg={2} className={classes.cartSubtotalCont}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12} xs={12} className={classes.cartTotalCont}>
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
              <Grid item lg={12} xs={12} className={classes.cartTotalCont}>
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
              <Grid item lg={12} xs={12} className={classes.cartTotalCont}>
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

export default withWidth()(Cart);