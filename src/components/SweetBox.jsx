import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import SweetBoxProducts from './SweetBoxProducts';

 import {
  getSweetBoxesByType
 } from '../api/sweetbox';

import CardIcon from './common/CardIcon';

const styles = (theme) => ({
  cardBtn: {
    width: 'inherit'
  }
});

const SweetBox = React.memo(({classes, type}) => {
  const [sweetBoxes, setSweetBoxes] = useState([]);
  const [showData, setShowData] = useState(false);

  const getSweetBox = async() => {
    const fetchSweetBox = await getSweetBoxesByType(type);
    setSweetBoxes(fetchSweetBox);
    setShowData(true);
  }

  useEffect(() => {
    getSweetBox();
  }, [showData])

  return showData && sweetBoxes.map((sweetbox, index) => {
    const featureSweetBox = sweetbox.sweetBoxSweetboxProduct[0];
    const otherSweetBoxes = sweetbox.sweetBoxSweetboxProduct.filter((item, index) => index !== 0)
    return (
        <div key={index} className={`container-fluid`}>
        {
          sweetbox.name &&  (
            <Grid container>
              <Grid item lg={12}>
                {sweetbox.name}
              </Grid>
            </Grid>
          )
        }
        <Grid container>
          <Grid item lg={12}>
            <Grid container>
              <Grid item lg={3} xs={3}>
                <SweetBoxProducts key={index} isFeature={true} id={featureSweetBox.productId} />
              </Grid>
              <Grid item lg={9} xs={9}>
                <Grid container>
                  {
                    otherSweetBoxes.map((product, index) => {
                      return (
                        <Grid item lg={3} xs={3}>
                          <SweetBoxProducts key={index} isFeature={false} id={product.productId} />
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