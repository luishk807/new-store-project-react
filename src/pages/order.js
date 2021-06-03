import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import ActionForm from '../components/common/Form/Action/Add';
import Snackbar from '../components/common/Snackbar';
import { getOrderByOrderNumber } from '../api/orders';
import { validateForm, handleFormResponse } from '../utils/form';
import OrderDetail from '../components/order/OrderDetail';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  mainItem: {
    width: '50% !important',
    margin: '0px auto',
  },
  action: {
    padding: '20px 0px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
})

const Order = ({classes}) => {
  const [order, setOrder] = useState(null);
  const [showData, setShowData] = useState(false);
  const { t } = useTranslation('order')
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const section = {
    name: 'Contact Us',
    url: 'contacts'
  }
  const form = {
    order: null,
    email: null,
  }

  const handleBack = () => {
    setOrder(null)
  }

  const handleDeliveryForm = async(subform) => {
    if (subform) {
      const confirm = await getOrderByOrderNumber({
        order_number: subform.order,
        email: subform.email
      });

      if (!confirm) {
        setSnack({
          severity: 'error',
          open: true,
          text: t('message.no_order_found')
        })
      }
      setOrder(confirm);
    }
  }

  return (
    <LayoutTemplate>
      <div className={classes.root}>
         <Grid container className={classes.headerContainer}>
            {
              order ? (
                <>
                <Grid item lg={8} className={classes.title}>
                    <h3>{ t('order_detail') }</h3>
                </Grid>
                <Grid item lg={8} className={classes.action}>
                  <Grid container>
                    <Grid item lg={2}>
                      <Button onClick={handleBack} className={`mainButton`}>{ t('back') }</Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={8} xs={12} className={classes.mainItem}>
                  <OrderDetail order={order} />
                </Grid>
                </>
               ) : (
                <ActionForm 
                    formSection={{
                      name: t('message.search_order'),
                    }}
                    actionButtonName={ t('search') }
                    entryForm={form} 
                    showCancel={false}
                    onSubmitAction={handleDeliveryForm}
                    type="action"
                  >
                  <p>{ t('message.order_number_to_find_status') }</p>
                </ActionForm>
               )
            }
        </Grid>
      </div>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false})} content={snack.text} />
    </LayoutTemplate>
  );
}

Order.protoTypes = {
  classes: T.object,
}

/** This section is mandatory for next-18next translation to work */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'order', 'footer']),
  },
})

export default withStyles(styles)(Order);