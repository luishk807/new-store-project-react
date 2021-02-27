import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import moment from 'moment';

import Icons from '../common/Icons';
import OrderItem from './OrderItem';
import { canceled_status, statusAllowedCancellation } from '../../../config';
import { formatNumber } from '../../utils';

const styles = (theme) => ({
  root: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      padding: 2
    }
  },
  orderContainer: {
    border: '1px solid rgba(0,0,0,.07)',
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      '&:not(last-child)': {
        borderTop: '1px solid rgba(0,0,0,.07)',
        border: 'none'
      },
      '&:last-child': {
        borderBottom: '1px solid rgba(0,0,0,.07)',
      }
    }
  },
  cancelReason: {
    border: '1px solid red',
    textAlign: 'center',
    color: 'red',
    fontSize: '1.5em',
    fontWeight: 'bold',
    padding: 15,
  },
  orderSummary: {
    borderBottom: '1px solid rgba(0,0,0,.05)',
    marginBottom: 10,
  },
  itemHeader: {
    borderBottom: '1px solid rgba(0,0,0,.05)',
    marginBottom: 10,
  },
  itemProduct: {

  },
  orderHeaderContainer: {
    display: 'flex',
    margin: '10px 0px',
    justifyContent: 'center'
  },
  orderHeaderSubTitle: {
    fontSize: '1em',
    color: 'grey'
  },
  orderHeaderItem: {
    '& p': {
      lineHeight: '3px',
      [theme.breakpoints.down('sm')]: {
        lineHeight: 'normal',
      }
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center !important'
    }
  },
  orderHeaderItem1: {
    textAlign: 'left',
    padding: 5,
  },
  orderHeaderItem2: {
    textAlign: 'center',
    padding: 5,
  },
  orderHeaderItem3: {
    textAlign: 'center',
    padding: 5,
  },
  orderHeaderItem4: {
    textAlign: 'right',
    padding: 5,
  },
  orderSummaryItem1: {
    textAlign: 'left',
    padding: 5,
  },
  orderSummaryItem2: {
    textAlign: 'center',
    padding: 5,
  },
  orderSummaryItem3: {
    textAlign: 'right',
    padding: 5,
  },
  itemHeaderDelivery: {
    display: 'flex',
    justifyContent: 'left',
    '& p': {
      padding: 5
    },
  },
  itemHeaderCancel: {
    textAlign: 'right',
  },
  itemHeaderCannotCancel: {
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'green',
  },
  icon: {
    width: 24,
    height: 24,
    fill: '#000',
  },
  cancelStatus: {
    textAlign: 'center',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'red',
    border: '1px solid red',
    padding: '15px 0px',
    margin: '15px 0px',
  },
});

const View = ({classes, order, isAdmin = false}) => {
  const [isCancelled, setIsCancelled] = useState(false);
  useEffect(() => {
    const status = parseInt(order.orderStatuses.id);
    if (canceled_status.indexOf(status) > -1) {
      setIsCancelled(true);
    }
  }, []);
  
  return (
    <Grid item lg={12} xs={12} className={classes.root}>
      <Grid container className={classes.orderContainer}>
        {
          isAdmin && isCancelled && (
            <Grid item lg={12} xs={12} className={classes.cancelReason}>
              <p>Reason:</p>
              { order.orderCancelReasons && `${order.orderCancelReasons.name}` }
            </Grid>
          )
        }
        {
          isCancelled ? (
            <Grid item lg={12} xs={12}>
              <div className={classes.cancelStatus}>{order.orderStatuses.name}</div>
            </Grid>
          ) : (
            <>
              {
                !isAdmin && (
                  <>
                    <Grid item lg={10} xs={6} className={classes.itemHeaderDelivery}>
                      <p className={classes.orderHeaderSubTitle}>Status</p>
                      <p>{order.orderStatuses.name}</p>
                    </Grid>
                    {
                      statusAllowedCancellation.includes(Number(order.orderStatus)) && (
                        <Grid item lg={2} xs={6} className={classes.itemHeaderCancel}>
                          <Button href={`cancel/${order.id}`} className={`mainButton`}>
                              Cancel Order
                          </Button>
                        </Grid>
                      )
                    }
                  </>
                )
              }
            </>
          )
        }
        <Grid item lg={12} xs={12} className={classes.itemHeader}>
          <Grid container className={classes.orderHeaderContainer}>
            <Grid item lg={3} xs={6} className={`${classes.orderHeaderItem} ${classes.orderHeaderItem1}`}>
              <p className={classes.orderHeaderSubTitle}>Date</p>
              <p>{moment(order.createdAt).format('MMMM D, YYYY')}</p>
            </Grid>
            <Grid item lg={3} xs={6} className={`${classes.orderHeaderItem} ${classes.orderHeaderItem2}`}>
              <p className={classes.orderHeaderSubTitle}>Delivery Method:</p><p>{order.deliveryOrder ? order.deliveryOrder.name : 'N/A'}</p>
            </Grid>
            <Grid item lg={4} xs={6} className={`${classes.orderHeaderItem} ${classes.orderHeaderItem3}`}>
              <p className={classes.orderHeaderSubTitle}>Order Number</p>
              <p>{order.order_number}</p>
            </Grid>
            <Grid item lg={2} xs={6} className={`${classes.orderHeaderItem} ${classes.orderHeaderItem4}`}>
              <Button><Icons name="print" classes={{icon: classes.icon}} /></Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12} className={classes.orderSummary}>
          <Grid container className={classes.orderHeaderContainer}>
            <Grid item lg={4} xs={6} className={`${classes.orderHeaderItem} ${classes.orderSummaryItem1}`}>
              <p className={classes.orderHeaderSubTitle}>Shipping Address</p>
              <p>{order.shipping_name}</p>
              <p>{order.shipping_address}</p>
              <p>{`${order.shipping_province} ${order.shipping_corregimiento} ${order.shipping_district}`}</p>
              <p>{`${order.shipping_country}`}</p>
            </Grid>
            <Grid item lg={3} xs={6} className={`${classes.orderHeaderItem} ${classes.orderSummaryItem2}`}>
              <p className={classes.orderHeaderSubTitle}>Payment Method</p>
              <p>****4566</p>
            </Grid>
            <Grid item lg={5} xs={12} className={`${classes.orderHeaderItem} ${classes.orderSummaryItem3}`}>
              <p className={classes.orderHeaderSubTitle}>Order Summary</p>
              <Grid container>
                <Grid item lg={12} xs={12}>
                  <Grid container>
                    <Grid item lg={6} xs={6}>
                      Subtotal
                    </Grid>
                    <Grid item lg={6} xs={6}>
                      ${formatNumber(order.subtotal)}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Grid container>
                    <Grid item lg={6} xs={6}>
                      Taxes
                    </Grid>
                    <Grid item lg={6} xs={6}>
                      ${formatNumber(order.tax)}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Grid container>
                    <Grid item lg={6} xs={6}>
                      Delivery
                    </Grid>
                    <Grid item lg={6} xs={6}>
                      ${formatNumber(order.delivery)}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Grid container>
                    <Grid item lg={6} xs={6}>
                      GrandTotal
                    </Grid>
                    <Grid item lg={6} xs={6}>
                      ${formatNumber(order.grandtotal)}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12} className={classes.itemProduct}>
          <OrderItem order={order} isAdmin={isAdmin} />
        </Grid>
      </Grid>
    </Grid>
  );
}
 
View.protoTypes = {
  classes: T.object,
  order: T.object,
  isAdmin: T.bool,
}

export default withStyles(styles)(View);