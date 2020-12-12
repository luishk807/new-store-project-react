import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import Typography from './common/Typography';
import SweetBoxProducts from './SweetBoxProducts';

 import {
  getSweetBoxesByType
 } from '../api/sweetbox';

import CardIcon from './common/CardIcon';

const styles = (theme) => ({
  root: {
    margin: '50px 0px',
  },
  cardBtn: {
    width: 'inherit'
  },
  title: {
    fontWeight: 'bold',
    margin: '10px 0px',
    fontSize: '1.5em',
  },
  featureBox: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  }
});

const SweetBox = React.memo(({classes, type}) => {
  const [sweetBoxes, setSweetBoxes] = useState([]);
  const [showData, setShowData] = useState(false);

  const getSweetBox = async() => {
    const fetchSweetBox = await getSweetBoxesByType(type);
    if (fetchSweetBox.length) {
      setSweetBoxes(fetchSweetBox);
      setShowData(true);
    }
  }

  useEffect(() => {
    getSweetBox();
  }, [showData])

  return showData && sweetBoxes.map((sweetbox, index) => {
    const featureSweetBox = sweetbox.sweetBoxSweetboxProduct[0];
    const otherSweetBoxes = sweetbox.sweetBoxSweetboxProduct.filter((item, index) => index !== 0)
    return (
      <div key={index} className={`container-fluid`} className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12}>
            <Typography className={classes.title}>{sweetbox.name}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={12} xs={12}>
            <Grid container>
              <Grid item lg={4} xs={12} className={classes.featureBox}>
                <SweetBoxProducts key={index} isFeature={true} id={featureSweetBox.product} />
              </Grid>
              <Grid item lg={8} xs={12}>
                <Grid container>
                  {
                    otherSweetBoxes.map((product, index) => {
                      return (
                        <Grid key={index} item lg={3} xs={6}>
                          <SweetBoxProducts key={index} isFeature={false} id={product.product} />
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  })
});

SweetBox.protoTypes = {
  classes: T.object,
  type: T.number.isRequired
}

export default withStyles(styles)(SweetBox);