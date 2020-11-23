import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { useRouter } from 'next/router';

import { ADMIN_SECTIONS } from '../../../../constants/admin';
import ItemForm from '../../../../components/common/Form/ItemForm';
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
      <ItemForm fields={fields} id={id} adminSection={ADMIN_SECTIONS.product} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);