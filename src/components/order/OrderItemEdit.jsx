import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import ProgressBar from '@/common/ProgressBar';
import SimpleBoxEdit from '@/components/product/SimpleBoxEdit';
const styles = (theme) => ({
  root: {
    width: '100%'
  },
});

const OrderItemEdit = ({classes, order, isAdmin = false, onUpdateProduct}) => {
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    setShowData(true);
  }, [order]);

  return showData ? (
    <Grid container className={classes.root}>
      <Grid item lg={12} xs={12}>
        <SimpleBoxEdit onUpdateProduct={onUpdateProduct} data={order.orderOrderProduct} />
      </Grid>
    </Grid>
  ) : (
    <ProgressBar />
  );
}
 
OrderItemEdit.protoTypes = {
  classes: T.object,
  isAdmin: T.bool,
  order: T.object.isRequired,
  onUpdateProduct: T.func
}

export default withStyles(styles)(OrderItemEdit);