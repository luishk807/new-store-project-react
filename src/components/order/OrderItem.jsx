import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import SimpleBox from '../product/SimpleBox';
const styles = (theme) => ({
  root: {
    width: '100%'
  },
  container: {

  },
  actionBtn: {

  },
  itemProduct: {

  },
  orderOrderProduct: {

  },
  itemAction: {

  },
  itemActionItems: {

  },
  itemActionContainer: {

  }
});

const OrderItem = ({classes, order, isAdmin = false}) => {
  return (
    <Grid container className={classes.container}>
      <Grid item lg={9} xs={9} className={classes.itemProduct}>
        <SimpleBox data={order.orderOrderProduct} />
      </Grid>
      <Grid item lg={3} xs={3} className={classes.itemAction}>
        {
          !isAdmin && (
            <>
              <Grid container className={classes.itemActionContainer}>
                <Grid item lg={12} xs={12} className={classes.itemActionItems}>
                  <Button className={`mainButton ${classes.actionBtn}`}>Review</Button>
                </Grid>
                <Grid item lg={12} xs={12} className={classes.itemActionItems}>
                  <Button className={`mainButton ${classes.actionBtn}`}>Re-Order</Button>
                </Grid>
              </Grid>
            </>
          )
        }
      </Grid>
    </Grid>
  );
}
 
OrderItem.protoTypes = {
  classes: T.object,
  isAdmin: T.bool,
  order: T.object.isRequired,
}

export default withStyles(styles)(OrderItem);