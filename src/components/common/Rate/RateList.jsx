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
import Typography from '@/common/Typography';

import Rate from '@/common/Rate/Rate';

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

const RateList = ({classes, data, limit}) => {
  const [showRates, setShowRates] = useState(false)
  const [rates, setRates] = useState([]);

  const createRatesHtml = () => {
    const dataLength = limit ? limit : data.length;
    let tempRate = [];
    for(let i=0; i < dataLength; i++) {
      if (!data[i]) {
        break;
      }
      tempRate.push(
        <Card key={i} className={classes.cardContainer}>
          <CardHeader 
            avatar={
              <Avatar aria-label="recipe" className={`AppBarBackColor`}>
                <PersonRoundedIcon/>
              </Avatar>
            }
            title={`${data[i].rateUsers.first_name} ${data[i].rateUsers.last_name}`}
          />
          <CardContent className={classes.cardContentContainer}>
            <Typography variant="body2" color="textSecondary" component="span">
              <Grid container>
                <Grid item lg={12} sm={12}>
                  <Rate data={data[i].rate} disabled={true} />
                </Grid>
                <Grid item lg={12} sm={12}>
                  <Typography align="left" variant="body2" color="textSecondary" component="p">{data[i].comment}</Typography>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      )
    }
    setRates(tempRate);
    setShowRates(true)
  }

  useEffect(() => {
    if (data && data.length) {
      createRatesHtml();
    }
  }, [showRates])

  return (
    <div className={classes.root}>
      {
        showRates && rates
      }
    </div>
  );
}

RateList.protoTypes = {
  classes: T.object,
  data: T.object,
  limit: T.number,
}; 

export default withStyles(styles)(RateList);