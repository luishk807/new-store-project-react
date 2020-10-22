import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Card, 
  CardHeader,
  CardContent,
  Avatar,
  Grid,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

import Typography from './Typography';

const styles = (theme) => ({
  root: {
    with: '100%',
  },
  cardContainer: {
    padding: '0px 20px',
    boxShadow: 'none',
  },
  avatar: {
    backgroundColor: blue[500],
  },
  cardContentContainer: {
    paddingTop: 2,
  },
}); 

const RateBar = ({classes, rate}) => {
  console.log("rate",data)
  
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={3}>
          {rate} starts
        </Grid>
        <Grid item lg={8}>
          line
        </Grid>
        <Grid item lg={1}>444</Grid>
      </Grid>
    </div>
  );
}

RateBar.protoTypes = {
  classes: T.object,
  rate: T.object,
}; 

export default withStyles(styles)(RateBar);