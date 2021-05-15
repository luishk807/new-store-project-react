import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '../../../../../constants/admin';
import { getSizesById } from '../../../../../api/sizes';
import EditForm from '../../../../../components/common/Form/EditForm';
import ProgressBar from '../../../../../components/common/ProgressBar';
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
  const [size, setSize] = useState({});
  const [id, setId] = useState(null);
  const [showData, setShowData] = useState(false);
  const form = {
    name: null,
  }

  useEffect(() => {
    const pid = router.query.id;
    setId(pid);
    const getData = async() => {
      const gData = await getSizesById(pid)
      setSize(gData);
      setShowData(true);
    }
    getData();
  }, []);

  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <EditForm 
            adminSection={ADMIN_SECTIONS.size} 
            id={id} 
            title={`size for ${size.name}`}
            entryForm={form} 
            customUrl={`/admin/products/sizes/${size.productId}`}  
            cancelUrl={`/admin/products/sizes/${size.productId}`}
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