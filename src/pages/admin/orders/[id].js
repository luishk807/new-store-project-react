import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
  FormHelperText,
  FormControl,
  TextField,
  Button,
} from '@material-ui/core';
import { 
  Autocomplete,
} from '@material-ui/lab';

import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import Snackbar from '../../../components/common/Snackbar';
import OrderDetail from '../../../components/order/OrderDetail';
import ProgressBar from '../../../components/common/ProgressBar';
import { loadMainOptions, validateForm, handleFormResponse } from '../../../utils/form';
import { getOrderById, saveOrderStatus } from '../../../api/orders';
import OrderActivity from '../../../components/order/OrderActivity';
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
    padding: 15,
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
  const [order, setOrder] = useState({});
  const [showData, setShowData] = useState(false);
  const [form, setForm] = useState({});
  const [formDefault, setFormDefault] = useState({});
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation(['common', 'order'])

  const formOnChange = (evt, field) => {
    setForm({
      ...form,
      orderStatus: field.value
    })
  }

  const handleCancel = () => {
    router.push('/admin/orders')
  }

  const handleSubmit = async() => {
    let errorFound = false;
    let key = '';
    for (var i in form) {
      errorFound = await validateForm(i, form[i]);
      key = i;
    }
    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to send form, ${FORM_SCHEMA[i].label} is required`
      })
    } else {
      const data = {
        status: form.orderStatus.id
      }
      const getResp = await saveOrderStatus(data, order.id);
      const resp = handleFormResponse(getResp);
      setSnack(resp);
      setTimeout(() => {
        handleCancel() 
      }, 1000);
    }
  }

  const loadBasic = async(order) => {
    const getBasic = await loadMainOptions();
    if (order && order.orderStatus) {
      const getStatus = getBasic.orderStatus.filter((item) => {
        return item.id === order.orderStatus
      });
      const selectedStatus = getStatus ? getStatus[0] : getBasic.orderStatus[0];
  
      setForm({
        ...form,
        orderStatus: selectedStatus,
      });
  
      setFormDefault({
        ...formDefault,
        orderStatus: selectedStatus,
      });
      
      setStatuses(getBasic.orderStatus);
      setShowData(true);
    }
  }

  useEffect(() => {
    setForm({
      orderStatus: null,
    });

    const loadOrder = async() => {
      const id = router.query.id;
      if (id) {
        const getOrder = await getOrderById(id);
        setOrder(getOrder);
        loadBasic(getOrder);
      }
    }
    loadOrder();
  }, [])

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
                <OrderDetail classes={{ orderContainer: classes.orderDetailContainer }} order={order} isAdmin={true} />
              </Grid>
              <Grid item lg={12} xs={12}>
                <OrderActivity classes={{root: classes.orderActivity}} order={order} />
              </Grid>
              <Grid item lg={12} xs={12} className={classes.formInput}>
                  <FormControl fullWidth variant="outlined">
                    <Autocomplete
                      className={classes.whiteBackground}
                      name="orderStatus"
                      options={statuses}
                      onChange={(e, value) => {
                        formOnChange(null, { name: 'orderStatus', value: value})
                      }}
                      getOptionLabel={(option) => option.name}
                      value={formDefault.orderStatus}
                      renderInput={(params) => <TextField {...params} label="Order status" variant="outlined" />}
                    />
                    <FormHelperText name="orderStatus">{`Select your order status`}</FormHelperText>
                  </FormControl>
              </Grid>
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