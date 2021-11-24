import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import Snackbar from '@/common/Snackbar';
import OrderDetailEdit from '@/components/order/OrderDetailEdit';
import ProgressBar from '@/common/ProgressBar';
import { handleFormResponse } from '@/utils/form';
import { formatNumber } from '@/utils/index';
import { getOrderById, saveOrderStatus, saveAdminOrder } from '@/api/orders';
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
  const [order, setOrder] = useState({});
  const [showData, setShowData] = useState(false);
  const [form, setForm] = useState({});

  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const { t } = useTranslation(['common', 'order'])

  const handleOrderChange = (obj) => {
    const curForm = Object.assign({}, form);

    if (obj && Object.keys(obj).length) {
      for(const key in obj) {
        curForm[key] = obj[key];
      }
    }
    setForm(curForm)
  }

  const handleCancel = () => {
    router.push(`/admin/orders/${router.query.id}`)
  }

  const handleSubmit = async() => {
    let formCopy = {}
    let products = [];

    if (form.total) {
      const totals = form.total;
      Object.keys(totals).forEach(key => {
        formCopy[key] = formatNumber(totals[key]);
      });
    }

    if (form.products && form.products.length) {
      form.products.forEach((item) => {
        let prod = item.selectedItem;
        if (!prod.hasOwnProperty('quantity')) {
          prod['quantity'] = item.quantity;
        }
        if (item.bundle && !item.productDiscount) {
          prod['productDiscount'] = item.bundle.name;
          prod['bundle'] = item.bundle;
        }
        products.push(prod)
      })
    } else {
      setSnack({
        severity: 'error',
        open: true,
        text: t('common:must_select_one_product'),
      })
      return;
    }

    formCopy['products'] = JSON.stringify(products);

    if (form.deliveryServiceOption) {
      // formCopy['deliveryServiceOption'] = form.deliveryServiceOption;
      formCopy['deliveryOption'] = form.deliveryServiceOption.name;
      formCopy['deliveryOptionId'] = form.deliveryServiceOption.id;
    }

    if (form.deliveryServiceFee) {
     // formCopy['deliveryServiceFee'] = form.deliveryServiceFee;
      formCopy['deliveryService'] = form.deliveryServiceFee.name;
      formCopy['deliveryServiceId'] = form.deliveryServiceFee.id;
    }

    if (form.coupon) {
      formCopy['promotionCode'] = form.coupon.name;
      formCopy['promotionCodeId'] = form.coupon.id;
    }

    if (form.address) {
      console.log("address",form.address)
      formCopy['shipping_name'] = form.address.shipping_name;
      formCopy['shipping_address'] = form.address.shipping_address;
      formCopy['shipping_addressB'] = form.address.shipping_addressB;
      formCopy['shipping_corregimiento'] = form.address.shipping_corregimiento;
      formCopy['shipping_district'] = form.address.shipping_district;
      formCopy['shipping_zone'] = form.address.shipping_zone;
      formCopy['shipping_phone'] = form.address.shipping_phone;
      formCopy['shipping_province'] =form.address.shipping_province;
      formCopy['shipping_country'] = form.address.shipping_country;
      formCopy['shipping_email'] = form.address.shipping_email;
      formCopy['shipping_note'] = form.address.shipping_note;
    } else {
      formCopy['shipping_name'] = order.shipping_name;
      formCopy['shipping_address'] = order.shipping_address;
      formCopy['shipping_addressB'] = order.shipping_addressB;
      formCopy['shipping_corregimiento'] = order.shipping_corregimiento;
      formCopy['shipping_district'] = order.shipping_district
      formCopy['shipping_zone'] = order.shipping_zone;
      formCopy['shipping_phone'] = order.shipping_phone;
      formCopy['shipping_province'] =order.shipping_province;
      formCopy['shipping_country'] = order.shipping_country;
      formCopy['shipping_email'] = order.shipping_email;
      formCopy['shipping_note'] = order.shipping_note;
    }

    const getResp = await saveAdminOrder(formCopy, order.id);
    const resp = handleFormResponse(getResp);
    setSnack(resp);
    setTimeout(() => {
      setShowData(false)
    }, 1000);
  }

  const removeDeliveryService = async() => {
    const getResp = await saveOrderStatus({
      deliveryServiceFee: null
    }, order.id);
    const resp = handleFormResponse(getResp);
    setSnack(resp);
    setShowData(false)
  }

  const loadOrder = async() => {
    const id = router.query.id;
    if (id) {
      const getOrder = await getOrderById(id);
      setOrder(getOrder);
      setShowData(true);
    }
  }

  useEffect(() => {
    loadOrder();
  }, [showData])

  return (
    <AdminLayoutTemplate>
      <div className={classes.root}>
        {
          showData ? (
            <Grid container className={classes.mainContainer}>
              <Grid item lg={12} xs={12} className={classes.userInfo}>
                User: { order.orderUser ? `${order.orderUser.first_name} ${order.orderUser.last_name}` : 'Guest' }
              </Grid>
              <Grid item lg={12} xs={12}>
                <OrderDetailEdit onRemoveDelivery={removeDeliveryService} onOrderChange={handleOrderChange} order={order} isAdmin={true} />
              </Grid>
              <Grid item lg={6} xs={6} className={classes.formInput}>
                <Button className={`mainButton`} onClick={handleCancel}>{ t('common:cancel') }</Button>
              </Grid>
              <Grid item lg={6} xs={6} className={classes.formInput}>
                <Button className={`mainButton`} onClick={handleSubmit}>{ t('order:save') }</Button>
              </Grid>
            </Grid>
          ) : (
            <ProgressBar />
          )
        }
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
    ...await serverSideTranslations(locale, ['checkout','common', 'order', 'footer', 'product']),
  },
})

export default withStyles(styles)(Edit);