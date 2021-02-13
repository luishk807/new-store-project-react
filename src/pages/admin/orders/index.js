import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Link,
  Button,
  Hidden,
} from '@material-ui/core';
import moment from 'moment';

import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import { deleteOrderById, getAllOrders } from '../../../api/orders';
import Snackbar from '../../../components/common/Snackbar';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
  },
  actionBtn: {
    margin: 2,
  },
  mainContainer: {
    padding: 5,
  },
  headerTitle: {
    padding: 20
  },
  headerButton: {
    padding: 20
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  mainHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainItems: {
    textAlign: 'center',
    borderTop: '1px solid rgba(0,0,0,.08)',
    '&:last-child': {
      borderBottom: '1px solid rgba(0,0,0,.08)',
    }
  },
  itemContainer: {
    textAlign: 'center'
  },
  itemIndex: {
    textAlign: 'left',
    padding: 5,
  },
  itemName: {
    textAlign: 'center',
    padding: 5,
  },
  itemLength: {
    textAlign: 'center',
    padding: 5,
  },
  itemType: {
    textAlign: 'center',
    padding: 5,
  },
  itemStatus: {
    textAlign: 'center',
    padding: 5,
  },
  itemDate: {
    textAlign: 'center',
    padding: 5,
  },
  itemAction: {
    textAlign: 'right',
    padding: 5,
  }
});

const Index = ({classes}) => {
  const [orders, setOrders] = useState([]);
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadOrders = async() => {
    const gOrders = await getAllOrders();
    setOrders(gOrders);
    setShowData(true);
  };

  const delItem = async(id) => {
    deleteOrderById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Order Deleted`,
      })
      loadOrders()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Order cannot be delete`,
      })
    })
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <AdminLayoutTemplate>
      <Grid container className={classes.headerContainer}>
        <Grid item className={classes.headerTitle}>
          <h3>Orders</h3>
        </Grid>
      </Grid>
      {
        showData && (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={2} className={classes.itemName}>
                  Name
                </Grid>
                <Grid item lg={1} className={classes.itemName}>
                  Delivery
                </Grid>
                <Grid item lg={1} className={classes.itemLength}>
                  Products
                </Grid>
                <Grid item lg={2} className={classes.itemType}>
                  Total
                </Grid>
                <Grid item lg={2} className={classes.itemStatus}>
                  Status
                </Grid>
                <Grid item lg={1} className={classes.itemDate}>
                  Date Created
                </Grid>
                <Grid item lg={2} className={classes.itemAction}>
                  Action
                </Grid>
              </Grid>
            </Grid>
            </Hidden>
            {
              orders.map((order, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={2} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemName}>
                        <a href={`orders/${order.id}`}>
                        {
                          order.shipping_name
                        }
                        </a>
                      </Grid>
                      <Hidden mdUp>
                      <Grid item lg={2} xs={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`orders/${order.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => delItem(order.id)}>
                          Delete
                        </Button>
                      </Grid>
                      </Hidden>
                      <Grid item lg={1} xs={4} className={classes.itemName}>
                        {
                          order.deliveryOrder ? order.deliveryOrder.name : 'N/A'
                        }
                      </Grid>
                      <Grid item lg={1} xs={4} className={classes.itemLength}>
                        {
                          order.orderOrderProduct && order.orderOrderProduct.length ? order.orderOrderProduct.length : 0
                        }
                      </Grid>
                      <Grid item lg={2} xs={4} className={classes.itemType}>
                        {
                          order.grandtotal
                        }
                      </Grid>
                      <Grid item lg={2} xs={6} className={classes.itemStatus}>
                        {
                          order.orderStatuses.name
                        }
                      </Grid>
                      <Grid item lg={1} xs={6} className={classes.itemDate}>
                        {
                          moment(order.createdAt).format('YYYY-MM-DD')
                        }
                      </Grid>
                      <Hidden smDown>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`orders/${order.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => delItem(order.id)}>
                          Delete
                        </Button>
                      </Grid>
                      </Hidden>
                    </Grid>
                  </Grid>
                )
              })
            }
          </Grid>
        )
      }
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);