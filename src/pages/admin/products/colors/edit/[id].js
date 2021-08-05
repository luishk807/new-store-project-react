import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from 'src/constants/admin';
import ProgressBar from 'src/components/common/ProgressBar';
import { getColorsById } from 'src/api/productColors';
import EditForm from 'src/components/common/Form/EditForm';
import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';

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
  const [color, setColor] = useState({});
  const [id, setId] = useState(null);
  const [showData, setShowData] = useState(false);
  const form = {
    color: null,
    name: null,
  }

  useEffect(() => {
    const pid = router.query.id;
    setId(pid);
    const getData = async() => {
      const gData = await getColorsById(pid)
      setColor(gData);
      setShowData(true);
    }
    getData();
  }, []);

  return (
    <AdminLayoutTemplate>
      {
        showData ? (
          <EditForm 
            adminSection={ADMIN_SECTIONS.productColor} 
            id={id} 
            title={`color ${color.name}`}
            entryForm={form} 
            customUrl={`/admin/products/colors/${color.productId}`}  
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