import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '@/constants/admin';
import { getDeliveryOptionServiceById } from '@/api/deliveryOptionServices';
import EditForm from '@/common/Form/EditForm';
import AdminLayoutTemplate from '@/common/Layout/AdminLayoutTemplate';
import ProgressBar from '@/common/ProgressBar';

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
  const [basicParams, setBasicParams] = useState({})
  const [deliveryOptionService, setDeliveryOptionService] = useState(null)
  const [showData, setShowData] = useState(false);

  const form = {
    deliveryService: null,
    deliveryOption: router.query.id,
  }
  
  const loadDeliveryOption = async() => {
    const item = await getDeliveryOptionServiceById(router.query.id);
    setBasicParams({
      deliveryOption: item.deliveryOptionId
    })
    setDeliveryOptionService(item);
    setShowData(true);
  }

  useEffect(() => {
    loadDeliveryOption();
  }, []);
  
  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <EditForm  
            id={router.query.id} 
            customUrl={`/admin/delivery-options/delivery-services/${deliveryOptionService.deliveryOptionId}`}  
            cancelUrl={`/admin/delivery-options/delivery-services/${deliveryOptionService.deliveryOptionId}`}  
            successUrl={`/admin/delivery-options/delivery-services/${deliveryOptionService.deliveryOptionId}`}  
            adminSection={ADMIN_SECTIONS.deliveryOptionService} 
            entryForm={form}
            basicParams={basicParams}
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