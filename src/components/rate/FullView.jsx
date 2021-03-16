import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';

import RateBoxBreakdown from '../common/Rate/RateBoxBreakdown';
import RateListDetails from '../common/Rate/RateListDetails';
import Typography from '../common/Typography';
import { getAllProductRatesById } from '../../api/rate';
import { containerSizesSelector } from '@material-ui/data-grid';

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
    const getRates = await getAllProductRatesById({id: data.id});
    if (getRates && getRates.length) {
      setRates(getRates);
      setShowRate(true);
    }
  }
  useEffect(() => {
    loadRates();
  }, [])

  return showRate && (
    <div className={classes.root} id="rateSection">
      <Grid container spacing={2} className={classes.mainRateContainer}>
        <Grid item lg={12} xs={12}>
          <Typography align="left" variant="h4" component="h4">Opiniones</Typography>
        </Grid>
        <Grid item lg={3} xs={12} align="left">
          <RateBoxBreakdown data={rates} />
        </Grid>
        <Grid item lg={9} xs={12} align="right">
          <RateListDetails data={rates} id={data.id} />
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