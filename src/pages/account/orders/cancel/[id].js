import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Grid,
  Button,
} from '@material-ui/core';
import moment from 'moment';

import ActionForm from '../../../../components/common/Form/Action/Add';
import UserLayoutTemplate from '../../../../components/common/Layout/UserLayoutTemplate';
import { handleFormResponse } from '../../../../utils/form';
import { canceled_status } from '../../../../../config';
import LeftOrderColumn from '../../../../components/common/Layout/Left/account/OrderLeftColumn';
import Snackbar from '../../../../components/common/Snackbar';
import { cancelOrder, getOrderById } from '../../../../api/orders';


const styles = (theme) => ({
  root: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '10px 0px',
  },
  formRoot: {
    width: '100%',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  mainContainer: {
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'left',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  subTitle: {
    display: 'flex',
    justifyContent: 'center',
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  buttons: {
    padding: 10,
  },
  cancelStatus: {
    textAlign: 'center',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'red',
    border: '1px solid red',
    padding: '15px 0px',
    margin: '15px 0px',
  }
});

const CancelOrder = ({classes, userInfo, id}) => {
  const [order, setOrder] = useState(null);
  const [showData, setShowData] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({});
  const [cancelReason, setCancelReason] = useState({});
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handleCancel = () => {
    router.push("/account/orders")
  }

  const handleFormChange = async(add) => {
    if (typeof add.val === "object" && !add.val) {
      setCancelReason({})
    } else {
      setCancelReason({
        ...cancelReason,
        [add.key]: typeof add.val === "object" ? add.val.id : add.val
      })
    }
  }

  const handleConfirm = async() => {
    const submit = {
      id: order,
      cancel: cancelReason.orderCancelReason
    }
    const confimg = await cancelOrder(submit);
    const resp = handleFormResponse(confirm);
    setSnack(resp);
    setSnack({
      severity: 'success',
      open: true,
      text: `Order cancel request send`,
    })
    setTimeout(() => {
      handleCancel() 
    }, 1000);
  }

  useEffect(() => {
    const getOrder = async() => {
      const data = await getOrderById(router.query.id)
      if (data) {
        setOrder(router.query.id)
        const status = parseInt(data.orderStatuses.id);
        if (canceled_status.indexOf(status) === -1) {
          setForm({
            orderCancelReason: null
          })
          setShowData(true);
        } else {
          setCancelReason(data.orderStatuses);
        }
      }
    }
    getOrder();
  }, []);

  return (
    <UserLayoutTemplate>
      <div className={classes.root}> 
        <Grid container className={classes.mainContainer}>
          <Grid className={classes.title} item lg={12} xs={12}>
            <h3>Order Cancel Confirm</h3>
          </Grid>
          <Grid item lg={12} xs={12}>
            <LeftOrderColumn>
              <Grid container className={classes.subContainer}>
                <Grid container>
                  {
                    order ? 
                      showData ? (
                      <Grid item lg={7} xs={12}>
                        <Grid container>
                          <Grid item lg={12} xs={12} className={classes.subTitle}>
                            Are you sure you want to cancel this order?
                          </Grid>
                          <Grid item lg={12} xs={12} className={classes.subTitle}>
                            Please select a reason for cancelation
                          </Grid>
                          <Grid item lg={12} xs={12}>
                            <ActionForm 
                              classes={{root: classes.formRoot}}
                              onFormChange={handleFormChange}
                              entryForm={form} 
                              actionButtonName="Yes"
                              actionCancelButtonName="No"
                              showTitle={false}
                              onSubmitAction={handleConfirm}
                              onCancel={handleCancel}
                              type="action"
                            />
                          </Grid>
                        </Grid>
                      </Grid>) :
                        (
                          <Grid item lg={12} xs={12}>
                            <div className={classes.cancelStatus}>
                            {
                              cancelReason.name
                            }
                            </div>
                          </Grid>
                        )
                      : (
                      <Grid item lg={7} xs={12}>
                        <div> Unable to find order
                        </div>
                      </Grid>
                    )
                  }
                </Grid>
              </Grid>
            </LeftOrderColumn>
          </Grid>
        </Grid>
        <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false})} content={snack.text} />
      </div>
    </UserLayoutTemplate>
  );
}
 
CancelOrder.protoTypes = {
  classes: T.object,
  id: T.number
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(CancelOrder));