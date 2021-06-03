import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '../../../../../constants/admin';
import ProgressBar from '../../../../../components/common/ProgressBar';
import { getProductDiscountId } from '../../../../../api/productDiscounts';
import EditForm from '../../../../../components/common/Form/EditForm';
import AdminLayoutTemplate from '../../../../../components/common/Layout/AdminLayoutTemplate';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%',
    margin: '0px auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

const Edit = ({classes}) => {
  const router = useRouter();
  const [discount, setDiscount] = useState({});
  const [id, setId] = useState(null);
  const [showData, setShowData] = useState(false);
  const form = {
    name: null,
    percentage: null,
    useDate: null,
    startDate: null,
    endDate: null,
    minQuantity: null
  }

  const ignoreForm = ['startDate', 'endDate'];

  useEffect(() => {
    const pid = router.query.id;
    setId(pid);
    const getData = async() => {
      const gData = await getProductDiscountId(pid)
      setDiscount(gData);
      setShowData(true);
    }
    getData();
  }, []);

  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <EditForm 
            adminSection={ADMIN_SECTIONS.productDiscount} 
            id={id} 
            classes={{root: classes.root}}
            title={`discount ${discount.name}`}
            entryForm={form} 
            ignoreForm={ignoreForm}
            customUrl={`/admin/products/discounts/${discount.productId}`}
            cancelUrl={`/admin/products/discounts/${discount.productId}`}
            successUrl={`/admin/products/discounts/${discount.productId}`}  
          />
        ) : (
          <ProgressBar />
        )
      }
    </AdminLayoutTemplate>
  );
}

Edit.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Edit);