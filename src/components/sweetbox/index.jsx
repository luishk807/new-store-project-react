import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';

import Typography from '@/components/common/Typography';
import SweetBoxProducts from '@/components/sweetbox/Products';
import ProgressBar from '@/components/common/ProgressBar';

 import {
  getSweetBoxesByType
 } from 'src/api/sweetbox';

 import {
  getProductByIds
 } from 'src/api/products';

const styles = (theme) => ({
  root: {
    margin: '50px 0px',
  },
  cartBtn: {
    width: 'inherit',
    width: '50%'
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
  },
  cardSingle: {
    alignItems: 'center'
  },
  cardSingleText: {
    textAlign: 'left'
  }
});

const SweetBox = React.memo(({classes, type, plain}) => {
  const [sweetBoxes, setSweetBoxes] = useState([]);
  const [showData, setShowData] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const sweetClasses = {
    cartBtn: classes.cardBtn, 
    cardSingle: classes.cardSingle, 
    cardSingleText: classes.cardSingleText
  }

  const getSweetBox = async() => {
    const fetchSweetBox = await getSweetBoxesByType(type);
    if (fetchSweetBox.length) {
      fetchSweetBox.forEach(async(sweetbox) => {
        let item = Object.assign({}, sweetbox);
        const ids = sweetbox.sweetBoxSweetboxProduct.map(item => item.product);
        if (ids && ids.length) {
          const getProd = await getProductByIds(ids)
          item.sweetBoxSweetboxProduct = getProd;
          setSweetBoxes(prev => [
            ...prev,
            item
          ])
        }
      });      
    } else {
      setSweetBoxes([])
    }
  }

  useEffect(() => {
    if (sweetBoxes && sweetBoxes.length) {
      setShowData(true);
    } else {
      setShowEmpty(true);
    }
  }, [sweetBoxes]);

  useEffect(() => {
    getSweetBox();
  }, [])

  return showData ? sweetBoxes.map((sweetbox, index) => {
    const featureSweetBox = sweetbox.sweetBoxSweetboxProduct[0];
    const otherSweetBoxes = sweetbox.sweetBoxSweetboxProduct.filter((item, index) => index !== 0)
    return (
      <div key={index} className={`container-fluid`} className={classes.root}>
        {
          plain ? (
            <>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Typography className={classes.title}>{sweetbox.name}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Grid container>
                  {
                    otherSweetBoxes.map((product, index) => {
                      return (
                        <Grid key={index} item lg={3} xs={6}>
                          <SweetBoxProducts classes={{...sweetClasses}} key={index} id={product.product} />
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Grid>
            </Grid>
            </>
          ) : (
            <>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Typography className={classes.title}>{sweetbox.name}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Grid container>
                  <Grid item lg={4} xs={12} className={classes.featureBox}>
                    <SweetBoxProducts classes={{...sweetClasses}} key={index} type="feature" data={featureSweetBox} />
                  </Grid>
                  <Grid item lg={8} xs={12}>
                    <Grid container>
                      {
                        otherSweetBoxes && otherSweetBoxes.map((product, index) => {
                          return (
                            <Grid key={index} item lg={3} xs={6}>
                              <SweetBoxProducts key={index} data={product} />
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            </>
          )
        }
      </div>
    )
  }) : !showEmpty && (<ProgressBar />) 

});

SweetBox.protoTypes = {
  plain: T.bool,
  classes: T.object,
  type: T.number.isRequired
}

export default withStyles(styles)(SweetBox);