import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Grid,
} from '@material-ui/core';

import CardIcon from '../../../components/common/CardIcon';
import Icons from '../../../components/common/Icons';
import UserLayoutTemplate from '../../../components/common/Layout/UserLayoutTemplate';
import { getOrderByUser } from '../../../api/orders';

const styles = (theme) => ({
  root: {
    width: '100%'
  },
});

const Index = ({classes, userInfo}) => {
  const [orders, setOrders] = useState([]);
  const [showData, setShowData] = useState(false);
  const router = useRouter();

  const getOrders = async() => {
    const gdata = await getOrderByUser();
    setOrders(gdata);
    setShowDat(true);
  }

  useEffect(() => {
    const gorders = getOrders();
  }, []);

  return (
    <UserLayoutTemplate>
      <div className={classes.root}> 
        order page
      </div>
    </UserLayoutTemplate>
  );
}
 
Index.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Index));