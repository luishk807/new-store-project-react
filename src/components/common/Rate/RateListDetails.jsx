import React, { useEffect } from 'react';
import * as T from 'prop-types';
import moment from 'moment'
import {
  withStyles,
  Button,
  Divider,
  Grid,
} from '@material-ui/core';

import Typography from '../Typography';

import Rate from './Rate';

const styles = (theme) => ({
  root: {
    with: '100%',
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
  rateBtnContainer: {
    justifyContent: 'space-between',
  },
  rateBtn: {
    borderRadius: '0px !important',
    padding: 10,
  }
}); 

const RateListDetails = ({classes, data}) => {

  const loadRates = async() => {
    // let range = questions ? questions.length + 5 : 5;
    // const fetchQuestions = await getQuestions({limit: range});
    // setQuestions(fetchQuestions);
    // console.log('questions', fetchQuestions)
  }

  useEffect(() => {
    loadRates()
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        {
          data && data.map((item, index) => {
            return (
              <Grid item lg={12} key={index} className={classes.rateItems}>
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
                    <Typography variant="caption">By {item.users.first_name}</Typography>
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
              <Button onClick={loadRates} className={`mainButton ${classes.rateBtn}`}>Ver mas</Button>
            </Grid>
            <Grid item lg={5} xs={12} align="right">
              <Button onClick={loadRates} className={`mainButton ${classes.rateBtn}`}>Agregar rate</Button>
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
}; 

export default withStyles(styles)(RateListDetails);