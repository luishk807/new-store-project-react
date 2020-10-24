import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Card, 
  CardHeader,
  CardContent,
  Avatar,
  Grid,
  Blue,
} from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import Typography from '../Typography';

import Rate from './Rate';

const styles = (theme) => ({
  root: {
    with: '100%',
    padding: '0px 20px',
  },
  cardContainer: {
    boxShadow: 'none',
  },
  cardContentContainer: {
    paddingTop: 2,
  },
}); 

const RateList = ({classes, data}) => {
  const [showRates, setShowRates] = useState(false)

  useEffect(() => {
    if (data && data.length) {
      setShowRates(true)
    }
  }, [data])

  return (
    <div className={classes.root}>
      {
        showRates && data.map((rate, index) => {
          return (
            <Card key={index} className={classes.cardContainer}>
              <CardHeader 
                avatar={
                  <Avatar aria-label="recipe" className={`AppBarBackColor`}>
                    <PersonRoundedIcon/>
                  </Avatar>
                }
                title={`${rate.users.first_name} ${rate.users.last_name}`}
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
      }
    </div>
  );
}

RateList.protoTypes = {
  classes: T.object,
  data: T.object,
}; 

export default withStyles(styles)(RateList);