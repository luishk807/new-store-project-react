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
import Icons from '../../../components/common/Icons';
import DialogModal from '../../../components/common/DialogModal';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
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
    textAlign: 'center',
    alignCenter: 'center'
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
  },
  itemActionMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
});

const Index = ({classes}) => {
  const [orders, setOrders] = useState([]);
  const [showData, setShowData] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    open: false,
    value: null,
    title: "Deleting Item",
    content: "Are you sure, you want to delete this item?",
    actionLabels: {
      true: "Yes",
      false: "No"
    }
  })
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

  const handleActionMenu = (e) => {
    setDialogContent({
      ...dialogContent,
      open: true,
      title: `Deleting Order No. ${e.order_number}`,
      value: e
    })
  }

  const handleDialogClick = (e) => {
    setDialogContent({
      ...dialogContent,
      open: false
    })
    if (e) {
      delItem(dialogContent.value.id)
    }
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
                    Order Number
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
                      <Grid item lg={2} xs={7} className={classes.itemName}>
                        <a href={`orders/${order.id}`}>
                        {
                          order.order_number
                        }
                        </a>
                      </Grid>
                      <Grid item xs={3} className={classes.itemActionMobile}>
                        <Button className={classes.actionBtn} onClick={() => handleActionMenu(order)}>
                          <Icons name="delete" classes={{icon: classes.icon}} />
                        </Button>
                      </Grid>
                      <Hidden smDown>
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
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`orders/${order.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => handleActionMenu(order)}>
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
      <DialogModal open={dialogContent.open} onClick={handleDialogClick} title={dialogContent.title} content={dialogContent.content} actionLabels={dialogContent.actionLabels} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);