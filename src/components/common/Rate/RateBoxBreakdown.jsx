import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core';

import Rate from '@/common/Rate/Rate';
import { getRatingAvg } from 'src/utils';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {

  },
  rateRoot: {
    '& span':{
      color: 'white'
    }
  },
  ratingStyle: {
    color: 'white',
    opacity: '1 !Important'
  },
  mainRateContainer: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 0px'
  },
  mainRateSubText: {
    fontSize: '1.2em',
  },
  mainRateSubMainItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateLabel: {
    display: 'inline-block',
    marginLeft: 5,
  },
  mainRate: {
    fontSize: '4em',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rateBreakDownTitle: {
    padding: '10px 0px',
    textAlign: 'left',
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  colorPrimary: {
    backgroundColor: '#FEE9AA',
  },
  barColorPrimary: {
    backgroundColor: '#B2DFDB',
  },
  rateBreakdownContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

const RateBoxBreakdown = ({classes, data}) => {
  const [totalRate, setTotalRate] = useState(data.length);
  const [totalAverage, setTotalAverage] = useState(0);
  const [breakdown, setBreakdown] = useState({});
  const [showRates, setShowRates] = useState(false);
  const { t } = useTranslation('product')

  useEffect(()=>{
    let rateFetch = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    }
    let total = 0;
    if (data && Object.keys(data).length) {
      data.forEach((item, index) => {
        const rate = parseInt(item.rate);
        total += item.rate * rate;
        rateFetch = {
          ...rateFetch,
          [rate] : rateFetch[rate] + 1
        }
      })
      let totalAvgTptal = getRatingAvg(data)
      setTotalRate(data.length);
      setTotalAverage(totalAvgTptal);
      setBreakdown(rateFetch);
      setShowRates(true);
    }
  }, [showRates])

  return showRates && (
    <div className={classes.root}>
      <Grid container className={`${classes.mainRateContainer} AppBarBackColor`}>
        <Grid item lg={5} xs={5} className={classes.mainRate}>
          {totalAverage}
        </Grid>
        <Grid item lg={7} xs={7} className={classes.mainRateSubMainItem}>
          <Grid container>
            <Grid item lg={12} xs={12}>
              <Rate className={classes.ratingStyle} data={totalAverage} disabled={true} />
            </Grid>
            <Grid item lg={12} xs={12} className={classes.mainRateSubText}>
              <b>{totalRate}</b> { t('reviews') }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item lg={12}>
          <Typography  className={classes.rateBreakDownTitle}>{ t('rating_breakdown') }</Typography>
        </Grid>
        {
          breakdown && Object.keys(breakdown).reverse().map((item, index) => {
            return (
              <Grid key={index} item lg={12} xs={12}>
                <Grid container className={classes.rateBreakdownContainer}>
                  <Grid item lg={2} xs={2} align="left">
                  {item} Stars
                  </Grid>
                  <Grid item lg={8} xs={8}  align="center">
                    <LinearProgress classes={{colorPrimary: classes.colorPrimary, barColorPrimary: `AppBarBackColor`}} variant="determinate" value={breakdown[item]} />
                  </Grid>
                  <Grid item lg={2} xs={2}  align="right">
                    {breakdown[item]}
                  </Grid>
                </Grid>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
}

RateBoxBreakdown.protoTypes = {
  classes: T.object,
  data: T.object,
}

export default withStyles(styles)(RateBoxBreakdown);