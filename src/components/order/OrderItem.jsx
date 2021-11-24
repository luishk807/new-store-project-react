import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import ProgressBar from '@/common/ProgressBar';
import SimpleBox from '@/components/product/SimpleBox';
const styles = (theme) => ({
  root: {
    width: '100%'
  },
});

const OrderItem = ({classes, order, isAdmin = false}) => {
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    setShowData(true);
  }, [order]);

  return showData ? (
    <Grid container className={classes.root}>
      <Grid item lg={12} xs={12}>
        <SimpleBox data={order.orderOrderProduct} />
      </Grid>
      {/* <Grid item lg={3} xs={3}>
        {
          !isAdmin && (
            <>
              <Grid container>
                <Grid item lg={12} xs={12}>
                  <Button className={`mainButton`}>Review</Button>
                </Grid>
              </Grid>
            </>
          )
        }
      </Grid> */}
    </Grid>
  ) : (
    <ProgressBar />
  );
}
 
OrderItem.protoTypes = {
  classes: T.object,
  isAdmin: T.bool,
  order: T.object.isRequired,
}

export default withStyles(styles)(OrderItem);