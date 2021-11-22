import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
  FormControl,
  TextField,
  Button,
  MenuItem,
  Select,
} from '@material-ui/core';

import { FORM_SCHEMA } from 'config';
import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';
import Snackbar from 'src/components/common/Snackbar';
import OrderDetail from 'src/components/order/OrderDetail';
import ProgressBar from 'src/components/common/ProgressBar';
import { loadMainOptions, validateForm, handleFormResponse } from 'src/utils/form';
import { getOrderById, saveOrderStatus, saveOrder } from 'src/api/orders';
import OrderActivity from 'src/components/order/OrderActivity';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    textAlign: 'center',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  orderDetailContainer: {
    border: 'none',
    padding: 0,
  },
  formInput: {
    padding: '10px 5px',
  },
  userInfo: {
    textAlign: 'left',
    fontSize: '1.5em',
    fontWeight: 'bold',
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      padding: 15
    }
  },
  mainContainer: {
    justifyContent: 'space-between',
    padding: 10,
  },
  orderActivity: {
    margin: '20px 0px',
  }
});

const Edit = ({classes}) => {
  const router = useRouter()
  const [statuses, setStatuses] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [order, setOrder] = useState({});
  const [showDeliveryCost, setShowDeliveryCost] = useState(false);
  const [showData, setShowData] = useState(false);
  const [form, setForm] = useState({});
  const [orderStatus, setOrderStatus] = useState('');
  const [formDefault, setFormDefault] = useState({});
  const [errors, setErrors] = useState({
    deliveryServiceFee: {
      error: false,
      message: ''
    }
  })
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const { t } = useTranslation(['common', 'order'])

  const resetErrors = () => {
    const getErrors = {}

    Object.keys(errors).forEach(key => {
      getErrors[key] = {
        error: false,
        message: ''
      }
    })
    
    setErrors(getErrors);
  }

  const formOnChange = (evt, field) => {
    resetErrors();
    setForm({
      ...form,
      [field.name]: field.value
    })
  }

  const handleCancel = () => {
    router.push('/admin/orders')
  }

  const handleSubmit = async() => {
    let errorFound = false;
    let key = '';

    let formCopy = Object.assign({}, form);
    if (showDeliveryCost && !formCopy.hasOwnProperty('deliveryServiceFee')) {
      formCopy.deliveryServiceFee = null
    }

    if(!showDeliveryCost) {
      delete formCopy.deliveryServiceFee
    }
    for (var i in formCopy) {
      errorFound = await validateForm(i, formCopy[i]);
      key = i;
    }
    if (!errorFound) {
      setErrors({
        ...errors,
        [i]: {
          error: true,
          message: `Unable to send form, ${FORM_SCHEMA[i].label} is required`
        }
      })
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to send form, ${FORM_SCHEMA[i].label} is required`
      })
    } else {
      const data = {
        ...formCopy,
        orderStatus: formCopy.orderStatus ? formCopy.orderStatus.id : formCopy.orderStatus
      }
      const getResp = await saveOrderStatus(data, order.id);
      const resp = handleFormResponse(getResp);
      setSnack(resp);
      setTimeout(() => {
        setShowData(false)
      }, 1000);
    }
  }

  const removeDeliveryService = async() => {
    const getResp = await saveOrderStatus({
      deliveryServiceFee: null
    }, order.id);
    const resp = handleFormResponse(getResp);
    setSnack(resp);
    setShowData(false)
  }

  const loadBasic = async(order) => {
    const getBasic = await loadMainOptions();
    if (order && order.orderStatus) {
      const getStatus = getBasic.orderStatus.filter((item) => {
        return item.id === order.orderStatus
      });
      const selectedStatus = getBasic.orderStatus[0];
  
      setForm({
        ...form,
        orderStatus: selectedStatus,
      });
  
      setFormDefault({
        ...formDefault,
        orderStatus: selectedStatus,
      });
      
      setStatuses(getBasic.orderStatus);
      setOrderStatus(selectedStatus.id)
      setShowData(true);
    }
  }

  useEffect(() => {
    if (form.orderStatus && form.orderStatus.id == '3') {
      setOrderStatus(form.orderStatus.id)
      setShowDeliveryCost(true);
    } else {
      if (form.orderStatus) {
        setOrderStatus(form.orderStatus.id)
      }
      setShowDeliveryCost(false)
    }
    setForm({
      ...form,
      deliveryServiceFee: null
    })
  }, [form.orderStatus])


  useEffect(() => {
    if(statuses && statuses.length) {
      setShowStatus(true);
    } else {
      setShowStatus(false);
    }
  }, [statuses])
  
  const loadOrder = async() => {
    const id = router.query.id;
    if (id) {
      const getOrder = await getOrderById(id);
      setOrder(getOrder);
      loadBasic(getOrder);
    }
  }

  useEffect(() => {
    setForm({
      orderStatus: null,
    });
    loadOrder();
  }, [showData])

  return (
    <AdminLayoutTemplate>
      <div className={classes.root}>
        <form>
        {
          showData ? (
            <Grid container className={classes.mainContainer}>
              <Grid item lg={12} xs={12} className={classes.userInfo}>
                User: { order.orderUser ? `${order.orderUser.first_name} ${order.orderUser.last_name}` : 'Guest' }
              </Grid>
              <Grid item lg={12} xs={12}>
                <OrderDetail onRemoveDelivery={removeDeliveryService} classes={{ orderContainer: classes.orderDetailContainer }} order={order} isAdmin={true} />
              </Grid>
              <Grid item lg={12} xs={12}>
                <OrderActivity classes={{root: classes.orderActivity}} order={order} />
              </Grid>
              {
                showStatus && (
                  <Grid item lg={12} xs={12} className={classes.formInput}>
                    <FormControl fullWidth variant="outlined">
                      <Select
                        className={classes.whiteBackground}
                        name="orderStatus"
                        value={orderStatus}
                        onChange={(e) => {
                          const stat = statuses.filter(item => item.id === e.target.value);
                          formOnChange(null, { name: 'orderStatus', value: stat[0]})
                        }}
                      >
                      {
                        statuses.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                          )
                        })
                      }
                      </Select>
                    </FormControl>
                  </Grid>
                )
              }
              {
                showDeliveryCost && (
                  <Grid item lg={12} xs={12} className={classes.formInput}>
                    <FormControl fullWidth variant="outlined">
                      <TextField 
                        error={errors.deliveryServiceFee.error}
                        variant="outlined" 
                        type="number"
                        name='deliveryServiceFee' 
                        onChange={(e) => {
                          formOnChange(null, { name: 'deliveryServiceFee', value: e.target.value})
                        }}
                        label='Costo de entrega'
                        helperText={errors.deliveryServiceFee.message}
                      />
                    </FormControl>
                  </Grid>
                )
              }
              <Grid item lg={6} xs={6} className={classes.formInput}>
                <Button onClick={handleCancel} className={`mainButton`}>{ t('common:back') }</Button>
              </Grid>
              <Grid item lg={6} xs={6} className={classes.formInput}>
                <Button className={`mainButton`} onClick={handleSubmit}>{ t('order:save_order') }</Button>
              </Grid>
            </Grid>
          ) : (
            <ProgressBar />
          )
        }
        </form>
        <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false})} content={snack.text} />
      </div>
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

/**
 * This section is mandatory for next-18next translation to work, only inside /pages.
 * Use get ServerSideProps instead of getStaticProps because it's a dinamic route
 */
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'order', 'footer']),
  },
})

export default withStyles(styles)(Edit);