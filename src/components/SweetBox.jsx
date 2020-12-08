import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

// import { 
//   ProductGallerySample,
//  } from '../constants/samples/ProductGallery';

import SweetBoxProducts from './SweetBoxProducts';

 import {
  getSweetBoxesByType
 } from '../api/sweetbox';

import CardIcon from './common/CardIcon';

const styles = (theme) => ({
  cardFeature: {
    width: '30%',
    height: 400,
  },
  cardNonFeature: {
    height: 300,
    width: '15%',
  },
  sweetBoxMainImg: {
    height: 197,
    width: 236,
  },
});

const SweetBox = ({classes, type}) => {
  const [sweetBoxes, setSweetBoxes] = useState({});
  const [showData, setShowData] = useState(false);

  const getSweetBox = async() => {
    const fetchSweetBox = await getSweetBoxesByType(type);
    console.log('feee',fetchSweetBox);
    setSweetBoxes(fetchSweetBox);
    setShowData(true);
  }

  useEffect(() => {
    getSweetBox();
  }, [type])

  return showData && sweetBoxes.map((sweetbox, index) => {
    return (
        <div key={index} className={`container-fluid`}>
        {
          sweetbox.name &&  (
            <div className={`row`}>
              <div className={`col`}>
                {sweetbox.name}
              </div>
            </div>
          )
        }
        <div className={`row`}>
          <div className={`col`}>
              <div className={`container-fluid`}>
                <div className={`row`}>
                  {
                  sweetbox.sweetBoxSweetboxProduct.map((product, index) => {
                      <h1>Luis</h1>
                      // if (!index) {
                      //   return (
                      //     <CardIcon key={index} title={info.name} classes={{ root: classes.cardFeature, img: classes.sweetBoxMainImg}}>
                      //       <img src={`/images/products/${info.image}`} alt={info.name}/>
                      //     </CardIcon>
                      //   )
                      // } else {
                      //   return (
                      //     <CardIcon key={index} title={info.name} classes={{ root: classes.cardNonFeature }}>
                      //       <img src={`/images/products/${info.image}`} alt={info.name}/>
                      //     </CardIcon>
                      //   )
                      // } 
                    })
                  }
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  })
}

SweetBox.protoTypes = {
  classes: T.object,
  type: T.number.isRequired
}

export default withStyles(styles)(SweetBox);