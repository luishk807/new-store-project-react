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

import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import { deleteDeliveryServiceCostById, getDeliveryServiceCosts } from '@/api/deliveryServiceCosts';
import Snackbar from '@/common/Snackbar';
import Icons from '@/common/Icons';
import DialogModal from '@/common/DialogModal';
import ProgressBar from '@/common/ProgressBar';

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
  noDataFound: {
    justifyContent: 'center',
    display: 'flex',
    fontSize: '1em',
    fontWeight: 'bold',
  }
});

const Index = ({classes}) => {
  const [deliveryServiceCosts, setDeliveryServiceCost] = useState([]);
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
    const gDeliveryCost = await getDeliveryServiceCosts();
    if (gDeliveryCost) {
      setDeliveryServiceCost(gDeliveryCost);
      setShowData(true);
    }
  };

  const delItem = async(id) => {
    deleteDeliveryServiceCostById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Delivery service cost deleted`,
      })
      loadOrders()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Delivery service cost cannot be delete`,
      })
    })
  }

  const handleActionMenu = (e) => {
    setDialogContent({
      ...dialogContent,
      open: true,
      title: `Deleting Service Cost`,
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
        <Grid item lg={8} className={classes.headerTitle}>
          <h3>Delivery Service Cost</h3>
        </Grid>
        <Grid item lg={3} className={classes.headerTitle}>
          <Button className={`mainButton`} href={`/admin/delivery-service-costs/add`}>Add Delivery Cost</Button>
        </Grid>
      </Grid>
      {
        showData ? deliveryServiceCosts.length ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
              <Grid item lg={12} xs={12} className={classes.mainHeader}>
                <Grid container className={classes.itemContainer}>
                  <Grid item lg={1} className={classes.itemIndex}></Grid>
                  <Grid item lg={2} className={classes.itemName}>
                    Service
                  </Grid>
                  <Grid item lg={2} className={classes.itemLength}>
                    Corregimiento
                  </Grid>
                  <Grid item lg={2} className={classes.itemName}>
                    Zone
                  </Grid>
                  <Grid item lg={2} className={classes.itemStatus}>
                    Status
                  </Grid>
                  <Grid item lg={1} className={classes.itemDate}>
                    Amount
                  </Grid>
                  <Grid item lg={2} className={classes.itemAction}>
                    Action
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
            {
              deliveryServiceCosts.map((deliveryService, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={2} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={2} xs={7} className={classes.itemName}>
                        <a href={`delivery-service-costs/${deliveryService.id}`}>
                        {
                          deliveryService.deliveryServiceCostDeliveryService && deliveryService.deliveryServiceCostDeliveryService.name
                        }
                        </a>
                      </Grid>
                      <Grid item lg={2} xs={7} className={classes.itemName}>
                        {
                          deliveryService.deliveryServiceCostCorregimiento && deliveryService.deliveryServiceCostCorregimiento.name
                        }
                      </Grid>
                      <Grid item xs={3} className={classes.itemActionMobile}>
                        <Button className={classes.actionBtn} onClick={() => handleActionMenu(deliveryService)}>
                          <Icons name="delete" classes={{icon: classes.icon}} />
                        </Button>
                      </Grid>
                      <Hidden smDown>
                      <Grid item lg={2} xs={4} className={classes.itemName}>
                        {
                          deliveryService.deliveryServiceCostZone && deliveryService.deliveryServiceCostZone.name
                        }
                      </Grid>

                      <Grid item lg={2} xs={4} className={classes.itemType}>
                        {
                          deliveryService.deliveryServiceCostStatus && deliveryService.deliveryServiceCostStatus.name
                        }
                      </Grid>
                      <Grid item lg={1} xs={6} className={classes.itemStatus}>
                        {
                          deliveryService.amount && deliveryService.amount
                        }
                      </Grid>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`delivery-service-costs/${deliveryService.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => handleActionMenu(deliveryService)}>
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
        ) : (
          <Grid item lg={12} xs={12} className={classes.noDataFound}>No Service Found</Grid>
        ) : (
          <ProgressBar />
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