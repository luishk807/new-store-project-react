import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Grid,
  Button
} from '@material-ui/core';

import Typography from '../../../../components/common/Typography';
import VendorLayoutTemplate from '../../../../components/common/Layout/VendorLayoutTemplate';
import { getOrderByUser } from '../../../../api/orders';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  smallLink: {
    fontSize: '.6em',
  },
});

const Index = ({classes, userInfo}) => {
  const router = useRouter();
  const [orders, setOrders] = useState({});
  const [showData, setShowData] = useState(false);

  const loadOrders = async() => {
    const fetchOrders = await getOrderByUser();
    setOrders(orders);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <VendorLayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item>
            test
          </Grid>
        </Grid>
      </div>
    </VendorLayoutTemplate>
  );
}
 
Index.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Index));