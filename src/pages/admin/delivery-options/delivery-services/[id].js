import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Hidden,
  Button,
} from '@material-ui/core';
import moment from 'moment';
import { useRouter } from 'next/router';

import AdminLayoutTemplate from '../../../../components/common/Layout/AdminLayoutTemplate';
import { deleteDeliveryOptionServiceById, getActiveDeliveryServicesByDeliveryOption } from '../../../../api/deliveryOptionServices';
import Snackbar from '../../../../components/common/Snackbar';
import { getImage } from '../../../../utils';
import HeaderSub from '../../../../components/common/HeaderSub';
import DialogModal from '../../../../components/common/DialogModal';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    fill: 'black'
  },
  noData: {
    color: 'red',
    fontSize: '1.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0px',
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
  itemColumn: {
    textAlign: 'center',
    padding: 5,
  },
  itemAction: {
    textAlign: 'right',
    padding: 5,
  }
});

const Index = ({classes}) => {
  const router = useRouter();
  const [deliveryOption, setDeliveryOption] = useState(null)
  const [deliveryServices, setDeliveryServices] = useState([]);
  const [showData, setShowData] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    open: false,
    value: null,
    title: "Deleting service",
    content: "Are you sure, you want to delete this service?",
    actionLabels: {
      true: "Yes",
      false: "No"
    }
  });
  
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const loadProductItems = async() => {
    const pid = router.query.id;
    setDeliveryOption(pid);
    if (pid) {
      const items = await getActiveDeliveryServicesByDeliveryOption(pid);
      setDeliveryServices(items);
      setShowData(true);
    }
  };

  const handleActionMenu = (e) => {
    if (typeof e === "object") {
      setDialogContent({
        ...dialogContent,
        open: true,
        title: `Deleting this service`,
        value: e
      })
    } else {
      router.push(e)
    }
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

  const delItem = async(id) => {
    deleteDeliveryOptionServiceById(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `Delivery Service Deleted`,
      })
      loadProductItems()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: Delivery service cannot be delete`,
      })
    })
  }

  useEffect(() => {
    loadProductItems()
  }, []);

  return (
    <AdminLayoutTemplate>
      <HeaderSub addUrl={`/admin/delivery-options/delivery-services/add/${deliveryOption}`} name="Delivery Service" />
      {
        deliveryServices && deliveryServices.length ? (
          <Grid container className={classes.mainContainer}>
            <Hidden smDown>
            <Grid item lg={12} xs={12} className={classes.mainHeader}>
              <Grid container className={classes.itemContainer}>
                <Grid item lg={1} className={classes.itemIndex}></Grid>
                <Grid item lg={5} className={classes.itemColumn}>
                  Service
                </Grid>
                <Grid item lg={3} className={classes.itemColumn}>
                  Status
                </Grid>
                <Grid item lg={1} className={classes.itemColumn}>
                  Date Created
                </Grid>
                <Grid item lg={2} className={classes.itemAction}>
                  Action
                </Grid>
              </Grid>
            </Grid>
            </Hidden>
            {
              deliveryServices.map((item, index) => {
                return (
                  <Grid key={index} item lg={12} xs={12} className={classes.mainItems}>
                    <Grid container className={classes.itemContainer}>
                      <Grid item lg={1} xs={2} className={classes.itemIndex}>
                        {
                          index + 1
                        }
                      </Grid>
                      <Grid item lg={5} xs={6} className={classes.itemColumn}>
                        {
                          item.deliveryOptionServiceDeliveryService.name
                        }
                      </Grid>
                      <Grid item lg={3} xs={6} className={classes.itemColumn}>
                        {
                          item.deliveryOptionServiceStatus.name
                        }
                      </Grid>
                      <Grid item lg={1} xs={6} className={classes.itemColumn}>
                        {
                          moment(item.createdAt).format('YYYY-MM-DD')
                        }
                      </Grid>
                      <Hidden smDown>
                      <Grid item lg={2} className={classes.itemAction}>
                        <Button className={`smallMainButton ${classes.actionBtn}`} href={`/admin/delivery-options/delivery-services/edit/${item.id}`}>
                          Edit
                        </Button>
                        <Button className={`smallMainButton ${classes.actionBtn}`} onClick={() => handleActionMenu(item)}>
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
          <Grid container className={classes.mainContainer}>
            <Grid item lg={12} xs={12} className={classes.noData}>
              No services found
            </Grid>
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