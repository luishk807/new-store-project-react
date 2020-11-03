import React from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../constants/admin';

import ItemForm from '../../../components/common/Form/Admin/ItemForm';


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
  const uid = router.query.uid;
  const fields = ['address', 'township', 'country']
  return (
    <ItemForm fields={fields} id={uid} adminSection={ADMIN_SECTIONS.address} />
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);