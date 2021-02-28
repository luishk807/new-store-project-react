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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    price: null,
    percentage: null,
    startDate: null,
    endDate: null,
    minQuantity: null
  }

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
            title={`discount ${discount.name}`}
            entryForm={form} 
            customUrl={`/admin/products/discounts/${discount.productId}`}  
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