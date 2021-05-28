import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import moment from 'moment';

import OrderItem from './OrderItem';
import { canceled_status, statusAllowedCancellation } from '../../../config';
import { formatNumber, isNull, getDeliveryInfo } from '../../utils';
import PrintButton from '../common/Print/PrintButton';
import { useTranslation } from 'next-i18next'

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
  orderFlexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  orderHeaderContainer: {
    display: 'flex',
    margin: '10px 0px',
    justifyContent: 'center'
  },
  orderHeaderSubTitle: {
    fontSize: '1em',
    color: 'grey',
  },
  orderHeaderItemClose: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'flex-end;',
    justifyContent: 'center',
    padding: 0,
  },
  orderHeaderItemTitle: {
    alignItems: 'start',
    justifyContent: 'center',
  },
  orderHeaderItem: {
    '& p': {
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
  deliveryServiceItemName: {
    padding: 5,
    textAlign: 'left'
  },
  deliveryServiceItemAmount: {
    padding: 5,
    textAlign: 'right'
  },
});

const View = ({classes, order, onRemoveDelivery, isAdmin = false}) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({});
  const [showDelivery, setShowDelivery] = useState(false);
  const [showTotalSaved, setShowTotalSaved] = useState(false);
  const { t } = useTranslation(['common', 'order', 'checkout'])

  useEffect(() => {
    const totalSaved = Number(order.totalSaved);
    const showSaved = totalSaved && totalSaved > 0 ? true : false;
    setShowTotalSaved(showSaved);
  }, []);

  useEffect(() => {
    const status = parseInt(order.orderStatuses.id);
    if (canceled_status.indexOf(status) > -1) {
      setIsCancelled(true);
    }
    const delivery_info = getDeliveryInfo(order);
    setDeliveryInfo(delivery_info);
  }, []);

  useEffect(() => {
    if (Object.keys(deliveryInfo).length) {
      setShowDelivery(true)
    } else {
      setShowDelivery(false)
    }
  }, [deliveryInfo])
  
  return (
    <Grid item lg={12} xs={12} className={classes.root}>
      <Grid container className={classes.orderContainer}>
        {
          isAdmin && isCancelled && (
            <Grid item lg={12} xs={12} className={classes.cancelReason}>
              <p>{ t('reason') }:</p>
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
                      <p className={classes.orderHeaderSubTitle}>{ t('common:status')}</p>
                      <p><b>{order.orderStatuses.name}</b></p>
                    </Grid>
                    {
                      statusAllowedCancellation.includes(Number(order.orderStatus)) && (
                        <Grid item lg={2} xs={6} className={classes.itemHeaderCancel}>
                          <Button href={`cancel/${order.id}`} className={`mainButton`}>
                              { t('order:cancel_order') }
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
            <Grid item lg={4} xs={6} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem1}`}>
              <span className={classes.orderHeaderSubTitle}>{ t('common:date') }</span>
              <span>{moment(order.createdAt).format('MMMM D, YYYY')}</span>
            </Grid>
            <Grid item lg={3} xs={6} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem2}`}>
              <span className={classes.orderHeaderSubTitle}>{ t('common:delivery_method') }:</span><span>{order.deliveryOrder ? order.deliveryOrder.name : 'N/A'}</span>
            </Grid>
            <Grid item lg={3} xs={6} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem4}`}>
              <span className={classes.orderHeaderSubTitle}>{ t('order:order_number') }</span>
              <span>{order.order_number}</span>
            </Grid>
            <Grid item lg={2} xs={6} className={`${classes.orderHeaderItem} ${classes.orderHeaderItem4}`}>
              <PrintButton data={order} />
            </Grid>
          </Grid>
        </Grid>
        {
          isAdmin && order.orderPromotion && (
            <Grid item lg={12} xs={12} className={classes.itemHeader}>
              <Grid container className={classes.orderHeaderContainer}>
                <Grid item lg={12} xs={12} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem1}`}>
                  <span className={classes.orderHeaderSubTitle}>{ t('checkout:discount_with_coupon') }</span>
                </Grid>
                <Grid item lg={8} xs={8} className={classes.deliveryServiceItemName}>
                  <span>{ order.orderPromotion.name }</span>
                </Grid>
                <Grid item lg={4} xs={4} className={classes.deliveryServiceItemAmount}>
                  <span>${ order.coupon }</span>
                </Grid>
              </Grid>
            </Grid>
          )
        }
        {
          isAdmin && order.deliveryService && (
            <Grid item lg={12} xs={12} className={classes.itemHeader}>
              <Grid container className={classes.orderHeaderContainer}>
                <Grid item lg={11} xs={11} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem1} ${classes.orderHeaderItemTitle}`}>
                  <span className={classes.orderHeaderSubTitle}>{ t('order:delivery_service') }</span>
                </Grid>
                <Grid item lg={1} xs={1} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem1} ${classes.orderHeaderItemClose}`}>
                  <Button className={`secondButtonSmall`} onClick={onRemoveDelivery}>&#10005;</Button>
                </Grid>
                <Grid item lg={8} xs={8} className={classes.deliveryServiceItemName}>
                  <span>{ order.deliveryService }</span>
                </Grid>
                <Grid item lg={4} xs={4} className={classes.deliveryServiceItemAmount}>
                  <span>${ order.deliveryServiceFee ? order.deliveryServiceFee : order.delivery }</span>
                </Grid>
              </Grid>
            </Grid>
          )
        }
        {
          isAdmin && order.deliveryServiceFee && (
            <Grid item lg={12} xs={12} className={classes.itemHeader}>
              <Grid container className={classes.orderHeaderContainer}>
                <Grid item lg={11} xs={11} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem1} ${classes.orderHeaderItemTitle}`}>
                  <span className={classes.orderHeaderSubTitle}>{ t('order:delivery_service') }</span>
                </Grid>
                <Grid item lg={1} xs={1} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem1} ${classes.orderHeaderItemClose}`}>
                  <Button className={`secondButtonSmall`} onClick={onRemoveDelivery}>&#10005;</Button>
                </Grid>
                <Grid item lg={8} xs={8} className={classes.deliveryServiceItemName}>
                  <span>N/A</span>
                </Grid>
                <Grid item lg={4} xs={4} className={classes.deliveryServiceItemAmount}>
                  <span>${ order.deliveryServiceFee }</span>
                </Grid>
              </Grid>
            </Grid>
          )
        }
        <Grid item lg={12} xs={12} className={classes.orderSummary}>
          <Grid container className={classes.orderHeaderContainer}>
            <Grid item lg={4} xs={6} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderSummaryItem1}`}>
              {
                showDelivery && (
                  <span className={classes.orderHeaderSubTitle}>{ t(`order:${deliveryInfo.translate_key}`) }</span>
                )
              }
              {
                showDelivery && deliveryInfo.info.map((item, index) => {
                  return (<span key={index}>{item}</span>)
                })
              }
            </Grid>
            <Grid item lg={3} xs={6} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderSummaryItem2}`}>
              <span className={classes.orderHeaderSubTitle}>{ t('common:payment_method') }</span>
              <span>
                {
                  order.paymentOption
                }
              </span>
            </Grid>
            <Grid item lg={5} xs={12} className={`${classes.orderHeaderItem} ${classes.orderSummaryItem3}`}>
              <span className={classes.orderHeaderSubTitle}>{ t('order:order_summary') }</span>
              <Grid container>
                <Grid item lg={12} xs={12}>
                  <Grid container>
                    <Grid item lg={6} xs={6}>
                      { t('common:subtotal') }
                    </Grid>
                    <Grid item lg={6} xs={6}>
                      ${formatNumber(order.subtotal)}
                    </Grid>
                  </Grid>
                </Grid>
                
                {
                  order.coupon && (
                    <Grid item lg={12} xs={12}>
                      <Grid container>
                        <Grid item lg={6} xs={6}>
                          { t('common:discount_with_coupon') }
                        </Grid>
                        <Grid item lg={6} xs={6}>
                          ${formatNumber(order.coupon)}
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                }

                <Grid item lg={12} xs={12}>
                  <Grid container>
                    <Grid item lg={6} xs={6}>
                      { t('common:tax') } 7%
                    </Grid>
                    <Grid item lg={6} xs={6}>
                      ${formatNumber(order.tax)}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Grid container>
                    <Grid item lg={6} xs={6}>
                      { t('common:delivery') }
                    </Grid>
                    <Grid item lg={6} xs={6}>
                      ${formatNumber(order.delivery)}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={12} xs={12}>
                  <Grid container>
                    <Grid item lg={6} xs={6}>
                      { t('common:grand_total') }
                    </Grid>
                    <Grid item lg={6} xs={6}>
                      <b>${formatNumber(order.grandtotal)}</b>
                    </Grid>
                  </Grid>
                </Grid>
                {
                  showTotalSaved && (
                    <Grid item lg={12} xs={12}>
                      <Grid container>
                        <Grid item lg={6} xs={6}>
                          { t('common:message:you_saved') }
                        </Grid>
                        <Grid item lg={6} xs={6}>
                          - ${formatNumber(order.totalSaved)}
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                }
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
  onRemoveDelivery: T.func,
}

export default withStyles(styles)(View);