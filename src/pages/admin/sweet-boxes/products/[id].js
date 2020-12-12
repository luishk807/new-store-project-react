import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '../../../../constants/admin';
import ItemFormAdd from '../../../../components/common/Form/ItemFormAdd';
import AdminLayoutTemplate from '../../../../components/common/Layout/AdminLayoutTemplate';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  item: {
    padding: 5
  },
  mainImage: {
    width: 150,
  }
});

const Index = ({classes}) => {
  const router = useRouter();
  const id = router.query.id;
  const fields = ['productImages', 'name', 'amount','status']
  return (
    <AdminLayoutTemplate>
      <ItemFormAdd 
        customUrl={`/admin/sweet-boxes/${id}`} 
        title="product" 
        fields={fields} 
        id={id} 
        source={ADMIN_SECTIONS.product} 
        adminSection={ADMIN_SECTIONS.sweetboxProducts} 
      />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object,
}

export default withStyles(styles)(Index);