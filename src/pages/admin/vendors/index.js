import React from 'react';
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import ItemForm from '../../../components/common/Form/ItemForm';

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
  const fields = ['img', 'first_name', 'email']
  return (
    <ItemForm fields={fields} adminSection={ADMIN_SECTIONS.vendor} />
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);