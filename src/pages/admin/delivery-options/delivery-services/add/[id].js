import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '../../../../../constants/admin';
import { getDeliveryOptionById } from '../../../../../api/deliveryOptions';
import AddForm from '../../../../../components/common/Form/AddForm';
import AdminLayoutTemplate from '../../../../../components/common/Layout/AdminLayoutTemplate';
import ProgressBar from '../../../../../components/common/ProgressBar';

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

const Add = ({classes}) => {
  const router = useRouter();
  const [showData, setShowData] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null)
  const [basicParams, setBasicParams] = useState({})
  const form = {
    deliveryService: null,
    deliveryOption: router.query.id,
  }
  
  const ignoreForm = ['deliveryOption'];
  const hideEntry = ['deliveryOption'];

  const loadDeliveryOption = async() => {
    const item = await getDeliveryOptionById(router.query.id);
    setDeliveryOption(item);
    setShowData(true);
  }

  useEffect(() => {
    const id = router.query.id;
    setBasicParams({
      deliveryOption: id
    })
    loadDeliveryOption();
  }, []);

  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <AddForm 
            adminSection={ADMIN_SECTIONS.deliveryOptionService} 
            entryForm={form}
            title={`Service for ${deliveryOption.name}`}
            basicParams={basicParams}
            hideEntry={hideEntry}
            ignoreForm={ignoreForm}
            customUrl={`/admin/delivery-options/delivery-services/${deliveryOption.id}`} 
            cancelUrl={`/admin/delivery-options/delivery-services/${deliveryOption.id}`} 
            successUrl={`/admin/delivery-options/delivery-services/${deliveryOption.id}`}  
          />
        ) : (
          <ProgressBar />
        )
      }
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);