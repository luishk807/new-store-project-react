import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Grid,
  Button,
} from '@material-ui/core';
import moment from 'moment';

import Icons from 'src/components/common/Icons';
import UserLayoutTemplate from 'src/components/common/Layout/UserLayoutTemplate';
import LeftOrderColumn from 'src/components/common/Layout/Left/account/OrderLeftColumn';
import ProgressBar from 'src/components/common/ProgressBar';
import OrderDetail from 'src/components/order/OrderDetail';
import { getOrderById } from 'src/api/orders';
import { getImageUrlByType } from 'src/utils/form';
import { noImageUrl } from 'config';
import { formatNumber } from 'src/utils';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  title: {
    textAlign: 'center',
    padding: '10px 0px',
  },
  actionBtn: {

  },
  mainContainer: {

  },
});

const View = ({classes, userInfo}) => {
  const [order, setOrder] = useState([]);
  const [showData, setShowData] = useState(false);
  const router = useRouter();

  const getOrders = async() => {
    const id = router.query.id
    const gdata = await getOrderById(id);
    setOrder(gdata);
    setShowData(true);
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <UserLayoutTemplate>
      <div className={classes.root}> 
        <Grid container className={classes.mainContainer}>
          <Grid className={classes.title} item lg={12} xs={12}>
            <h3>Order Detail</h3>
          </Grid>
          <Grid item lg={12} xs={12}>
            <LeftOrderColumn>
              {
                showData ? (
                  <OrderDetail order={order} />
                ) : (
                  <ProgressBar />
                )
              }
            </LeftOrderColumn>
          </Grid>
        </Grid>
      </div>
    </UserLayoutTemplate>
  );
}
 
View.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

/**
 * This section is mandatory for next-18next translation to work, only inside /pages.
 * Use get ServerSideProps instead of getStaticProps because it's a dinamic route
 */
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'order', 'footer']),
  },
})

export default connect(mapStateToProps)(withStyles(styles)(View));