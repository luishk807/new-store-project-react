import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';

import { ADMIN_SECTIONS } from 'src/constants/admin';
import ItemForm from 'src/components/common/Form/ItemForm';
import AdminLayoutTemplate from 'src/components/common/Layout/AdminLayoutTemplate';
import { Description } from '@material-ui/icons';

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
  const fields = ['name', 'description', 'status']
  return (
    <AdminLayoutTemplate>
      <ItemForm fields={fields} adminSection={ADMIN_SECTIONS.paymentOption} />
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);