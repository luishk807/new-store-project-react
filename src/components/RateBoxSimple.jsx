import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Typography
} from '@material-ui/core';

import Rate from './common/Rate';
import RateList from './common/RateList';
import { calculateRate } from '../utils';

const styles = (theme) => ({});

const RateBoxSimple = ({classes, data}) => {
  const [rate, setRate] = useState(2);
  const [hover, setHover] = useState(-1);

  useEffect(()=>{
    const rate = calculateRate(data);
    setRate(rate);
  }, [])

  return (
    <Grid container>
      <Grid item lg={12} sm={12}>
        <Typography align="center" variant="h4" component="h3">Opiniones del Cliente</Typography>
      </Grid>
      <Grid item lg={12} sm={12} align="center">
        <Rate data={rate} onChange={(event, newValue)=>setRate(newValue)} onChangeActive={(event, newHover)=>setHover(newHover)} />
      </Grid>
      <Grid item lg={12} sm={12}>
        <RateList data={data} />
      </Grid>
    </Grid>
  );
}

RateBoxSimple.protoTypes = {
  classes: T.object,
  data: T.object,
}

export default withStyles(styles)(RateBoxSimple);