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

import Rate from './Rate';

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

const RateBox = ({classes, data}) => {

  const rates = data.rates.map((rate, index) => {
    return (
      <Card key={index} className={classes.cardContainer}>
        <CardHeader 
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <PersonRoundedIcon/>
            </Avatar>
          }
          title={rate.name}
        />
        <CardContent className={classes.cardContentContainer}>
          <Typography variant="body2" color="textSecondary" component="span">
            <Grid container>
              <Grid item lg={12} sm={12}>
                <Rate data={rate.rate} disabled={true} />
              </Grid>
              <Grid item lg={12} sm={12}>
                <Typography align="left" variant="body2" color="textSecondary" component="p">{rate.comment}</Typography>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </Card>
    )  
  })
  
  return (
    <div className={classes.root}>
      {rates && rates}
    </div>
  );
}

RateBox.protoTypes = {
  classes: T.object,
  data: T.object,
}; 

export default withStyles(styles)(RateBox);