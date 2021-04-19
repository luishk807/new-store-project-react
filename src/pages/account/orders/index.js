import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Grid,
  Button,
  Hidden,
} from '@material-ui/core';
import moment from 'moment';
import UserLayoutTemplate from '../../../components/common/Layout/UserLayoutTemplate';
import ProgressBar from '../../../components/common/ProgressBar';
import LeftOrderColumn from '../../../components/common/Layout/Left/account/OrderLeftColumn';
import OrderItem from '../../../components/order/OrderItem';
import { getOrderByUser } from '../../../api/orders';
import { formatNumber } from '../../../utils';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  title: {
    textAlign: 'center',
    padding: '10px 0px',
  },
  mainContainer: {

  },
  orderItems: {
    // margin: '10px auto',
    padding: 0,
    '&:not(:first-child)': {
      margin: '20px auto',
    },
    [theme.breakpoints.down('sm')]: {
      padding: 2,
      margin: '20px 0px',
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
  itemHeader: {
    borderBottom: '1px solid rgba(0,0,0,.05)',
    marginBottom: 10,
  },
  itemProduct: {
    width: '100%'
  },
  orderHeaderContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  orderHeaderTitle: {
    fontSize: '1em',
    color: 'grey',
    padding: 5,
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
  orderStatus: {
    fontWeight: 'bold'
  },
});

const Index = ({classes, userInfo}) => {
  const [orders, setOrders] = useState([]);
  const [showData, setShowData] = useState(false);
  const { t } = useTranslation(['common', 'order'])

  const getOrders = async() => {
    const gdata = await getOrderByUser();
    setOrders(gdata);
    setShowData(true);
  }

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <UserLayoutTemplate>
      <div className={classes.root}> 
        <Grid container className={classes.mainContainer}>
          <Grid className={classes.title} item lg={12} xs={12}>
            <h3>{ t('order:order_page') }</h3>
          </Grid>
          <Grid item lg={12} xs={12}>
            <LeftOrderColumn>
              {
                showData ? (
                  <>
                  {
                    orders && orders.map((order, index) => {
                      const totalSaved = Number(order.totalSaved);
                      const showSaved = totalSaved && totalSaved > 0 ? true : false;
                      return (
                        <Grid item key={index} lg={12} xs={12} className={classes.orderItems}>
                          <Grid container className={classes.orderContainer}>
                            <Grid item lg={12} xs={12}>
                              <span className={classes.orderHeaderTitle}>{ t('order:order_number') }</span>:&nbsp;
                              <a href={`/account/orders/${order.id}`}>{order.order_number}</a>
                            </Grid>
                            <Grid item lg={12} xs={12} className={classes.itemHeader}>
                              <Grid container className={classes.orderHeaderContainer}>
                                <Grid item lg={3} xs={3} className={`${classes.orderHeaderItem} ${classes.orderHeaderItem1}`}>
                                  <span className={classes.orderHeaderSubTitle}>{ t('date') }</span><br/>
                                 {moment(order.createdAt).format('MMMM D, YYYY')}
                                </Grid>
                                <Grid item lg={3} xs={5} className={`${classes.orderHeaderItem} ${classes.orderHeaderItem2}`}>
                                  <span className={classes.orderHeaderSubTitle}>{ t('grand_total') }</span><br/>
                                  {`$${formatNumber(order.grandtotal)}`}
                                </Grid>
                                <Hidden smDown>
                                  <Grid item lg={3} xs={5} className={`${classes.orderHeaderItem} ${classes.orderHeaderItem2}`}>
                                    <span className={classes.orderHeaderSubTitle}>{ t('order:total_saved') }</span><br/>
                                    {
                                      showSaved ? `$${order.totalSaved}` : 'N/A'
                                    }
                                  </Grid>
                                </Hidden>
                                <Grid item lg={3} xs={4} className={`${classes.orderHeaderItem} ${classes.orderHeaderItem4}`}>
                                  <span className={classes.orderHeaderSubTitle}>{ t('status') }</span><br/>
                                  <span className={classes.orderStatus}>{order.orderStatuses.name}</span>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item lg={12} xs={12} className={classes.itemProduct}>
                              <OrderItem order={order} />
                            </Grid>
                          </Grid>
                        </Grid>
                      )
                    })
                  }
                  </>
                ) : (
                  <ProgressBar />
                )
              }
            </LeftOrderColumn>
          </Grid>
        </Grid>
      </div>
    </UserLayoutTemplate>
  );
}
 
Index.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'order', 'footer']),
  },
})

export default connect(mapStateToProps)(withStyles(styles)(Index));