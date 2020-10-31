import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Grid,
  Typography
} from '@material-ui/core';

import Rate from './common/Rate/Rate';
import RateList from './common/Rate/RateList';
import { Link, animateScroll as scroll } from "react-scroll";
import { getAllProductRatesById } from '../api/rate';
import { calculateRate, getRatingAvg } from '../utils';

const styles = (theme) => ({
  linkClass: {
    fontSize: '1rem',
    verticalAlign: 'top',
    fontWeight: 'bold'
  },
  rateContainer: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

const RateBoxSimple = ({classes, data}) => {
  const [rate, setRate] = useState();
  const [rates, setRates] = useState(2);
  const [showRates, setShowRates] = useState(false);
  const [hover, setHover] = useState(-1);

  const getAllRates = async(id) => {
    const resp = await getAllProductRatesById({id: id});
    if (resp) {
      const getAvg = getRatingAvg(resp)
      setRates(resp);
      setRate(getAvg);
      setShowRates(true);
    }
  }
  useEffect(()=>{
    getAllRates(data.id);
  }, [showRates])

  return showRates && (
    <Grid container>
      <Grid item lg={12} sm={12}>
        <Typography align="center" variant="h4" component="h3">Opiniones del Cliente</Typography>
      </Grid>
      <Grid item lg={12} sm={12} align="center">
            <Rate data={rate} disabled={true} onChange={(event, newValue)=>setRate(newValue)} onChangeActive={(event, newHover)=>setHover(newHover)} />&nbsp;
            <Link className={`${classes.linkClass} main_text_link`} activeClass="active" to="rateSection"  smooth={true}>{rates.length}</Link>
      </Grid>
      <Grid item lg={12} sm={12}>
        <RateList data={rates} limit={5} />
      </Grid>
    </Grid>
  );
}

RateBoxSimple.protoTypes = {
  classes: T.object,
  data: T.object,
}

export default withStyles(styles)(RateBoxSimple);