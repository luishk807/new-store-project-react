import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';

import RateBoxBreakdown from './common/Rate/RateBoxBreakdown';
import RateListDetails from './common/Rate/RateListDetails';
import Typography from './common/Typography';
import { getAllProductRatesById } from '../api/rate';

const styles = (theme) => ({
  mainRateContainer: {
    justifyContent: 'space-between',
  },
  ratingStyle: {
    verticalAlign: 'middle',
  },
  rateLabel: {
    display: 'inline-block',
    marginLeft: 5,
  },
});

const RateFullView = ({classes, data}) => {
  const [rates, setRates] = useState({});
  const [showRate, setShowRate] = useState(false);

  const loadRates = async() => {
    console.log("dtaa", data)
    const getRates = await getAllProductRatesById({id: data.id});
    console.log('ratex', getRates)
    setRates(getRates);
    setShowRate(true);
  }
  useEffect(() => {
    loadRates();
  }, [])

  return showRate && (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.mainRateContainer}>
        <Grid item lg={12}>
          <Typography align="left" variant="h4" component="h4">Preguntas y respuestas</Typography>
        </Grid>
        <Grid item lg={3} align="left">
          <RateBoxBreakdown data={rates} />
        </Grid>
        <Grid item lg={9} align="right">
          <RateListDetails data={rates} />
        </Grid>
      </Grid>
    </div>
  );
}

RateFullView.protoTypes = {
  classes: T.object,
  data: T.object,
}
export default withStyles(styles)(RateFullView);