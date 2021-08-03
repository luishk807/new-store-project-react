import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
  Hidden,
} from '@material-ui/core';
import moment from 'moment';
import { getOrderActivitiesByOrderid } from 'src/api/ordersActivities';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  headerTitle: {
    fontWeight: 'bold',
    padding: '10px 0px',
  },
  items: {
    padding: '10px 0px',
    borderTop: '1px solid rgba(0,0,0,.09)',
  }
});

const OrderActivity = React.memo(({classes, order}) => {
  const [activiy, setActivity] = useState([]);
  const [showData, setShowData] = useState(false);
  
  const loadActivities = async() => {
    const getActivity = await getOrderActivitiesByOrderid(order.id);
    setActivity(getActivity);
    setShowData(true);
  };

  useEffect(() => {
    loadActivities(); 
  }, []);

  return showData && (
    <Grid container className={classes.root}>
      <Grid item lg={12} xs={12} className={classes.headerTitle}>
        <Grid container>
          <Grid item lg={1} xs={1}>
          </Grid>
          <Grid item lg={5} xs={5}>
            Status
          </Grid>
          <Grid item lg={3} xs={3}>
            Created
          </Grid>
          <Grid item lg={3} xs={3}>
            By
          </Grid>
        </Grid>
      </Grid>
      {
        activiy.map((item, index) => {
          const counter = index + 1;
          const userRole = item.orderActivityUser &&  item.orderActivityUser.userRole && item.orderActivityUser.userRole == 1 ? 'Admin' : 'User';
          return (
            <Grid item lg={12} key={index} xs={12} className={classes.items}>
              <Grid container>
                <Grid item lg={1} xs={1}>
                    {counter}.
                </Grid>
                <Grid item lg={5} xs={5}>
                    {item.orderActivityStatuses.name}
                </Grid>
                <Grid item lg={3} xs={3}>
                    {moment(item.createdAt).format('MMMM D, YYYY HH:mm A')}
                </Grid>
                <Hidden smDown>
                  <Grid item lg={3} xs={3}>
                    {
                      item.orderActivityUser ? `${item.orderActivityUser.first_name}(${userRole})` : 'System'
                    }
                  </Grid>
                </Hidden>
                <Hidden smUp>
                  <Grid item lg={3} xs={3}>
                    {
                      item.orderActivityUser ? `${item.orderActivityUser.first_name}` : 'System'
                    }
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          )
        })
      }
    </Grid>
  );
})
 
OrderActivity.protoTypes = {
  classes: T.object,
  order: T.object.isRequired,
}

export default withStyles(styles)(OrderActivity);