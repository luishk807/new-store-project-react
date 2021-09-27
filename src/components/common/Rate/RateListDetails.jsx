import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import moment from 'moment';
import {
  withStyles,
  Button,
  Divider,
  Grid,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import Typography from '@/common/Typography';
import Rate from './Rate';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  ratingStyle: {
    verticalAlign: 'middle',
  },
  rateLabel: {
    display: 'inline-block',
    marginLeft: 5,
  },
  rateItems: {
    paddingDown: 5
  },
  rateDivider: {
    padding: '20px 0px'
  },
  rateDate: {

  },
  rateRate: {

  },
  rateTitle: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    padding: '5px 0px'
  },
  rateComment: {
    padding: '5px 0px'
  },
  rateOwner: {
    padding: '5px 0px'
  },
  rootContainer: {
    width: '100%',
  },
  rateBtnContainer: {
    justifyContent: 'space-between',
  },
  rateBtn: {
    borderRadius: '0px !important',
    padding: 10,
    width: '100%',
  }
}); 

const RateListDetails = ({classes, data, id}) => {
  const initialLimit = 5;
  const router = useRouter();
  const [limit, setLimit] = useState(initialLimit);
  const [rates, setRates] = useState([]);
  const [showRates, setShowRates] = useState(false);
  const loadRates = () => {
    let temp = []
    for(let i = 0; i < limit; i++) {
        if (data[i]) {
          temp.push(data[i]);
        } else {
          break;
        }
    }
    setRates(temp);
    setShowRates(true);
  }

  const setRateLimit = () => {
    if (data.length > rates.length) {
      setLimit(rates.length + initialLimit);
    }
  }
  useEffect(() => {
    loadRates()
  }, [limit]);

  return (
    <div className={classes.root}>
      <Grid container  className={classes.rootContainer}>
        {
          showRates && rates.map((item, index) => {
            return (
              <Grid item lg={12} xs={12} key={index} className={classes.rateItems}>
                <Grid container>
                  <Grid item lg={6} xs={5} align="left">
                    <Rate className={classes.ratingStyle} data={item.rate} disabled={true} />
                  </Grid>
                  <Grid item lg={6} xs={5} align="right" className={classes.rateDate}>
                    {moment(item.createdAt).format('MMMM D, YYYY')}
                  </Grid>
                  <Grid item lg={12} xs={12} align="left" className={classes.rateTitle}>
                    {item.title}
                  </Grid>
                  <Grid item lg={12} xs={12}  align="left" className={classes.rateComment}>
                    {item.comment}
                  </Grid>
                  <Grid item lg={12} xs={12} align="left" className={classes.rateOwner}>
                    <Typography variant="caption">{ t('by') } {item.rateUsers.first_name}</Typography>
                  </Grid>
                  <Grid item lg={12} xs={12} className={classes.rateDivider}>
                    <Divider className={classes.qaDivider} />
                  </Grid>
                </Grid>
              </Grid>     
            )
          })
        }
        <Grid item lg={12} xs={12}>
          <Grid container className={classes.rateBtnContainer}>
            <Grid item lg={5} xs={12} align="left">
              <Button onClick={setRateLimit} className={`mainButton ${classes.rateBtn}`}>{ t('view_more') }</Button>
            </Grid>
            <Grid item lg={5} xs={12} align="right">
              <Button onClick={() => router.push(`review/create/${id}`)} className={`mainButton ${classes.rateBtn}`}>{ t('rate_product') }</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

RateListDetails.protoTypes = {
  classes: T.object,
  data: T.object,
  id: T.number
}; 

export default withStyles(styles)(RateListDetails);