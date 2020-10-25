import React, {useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
} from '@material-ui/core';

import { ADMIN_SECTIONS } from '../../../../constants/admin'
import AddForm from '../../../../components/common/Form/Users/AddForm';

const styles = (theme) => ({
  root: {
    padding:10
  },
});

const Index = ({classes, data}) => {
  const router = useRouter();
  const id = router.query.pid;
  const [form, setForm] = useState({
    rate: null,
    title: null,
    comment: null,
    product: id,
  });

  useEffect(() => {
    setForm({
      ...form,
      id: id
    })
  }, [])

  const ignoreEntry=['product'];

  return (
    <AddForm customUrl={`/product/${id}`} ignoreForm={ignoreEntry}  name={ADMIN_SECTIONS.rate.key} entryForm={form} />
  );
}

Index.protoTypes = {
  classes: T.object,
  data: T.object,
}

export default withStyles(styles)(Index);