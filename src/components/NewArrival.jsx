import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

import { 
  ProductGallerySample,
 } from '../constants/samples/ProductGallery';

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
  newArrivalMainImg: {
    height: 197,
    width: 236,
  },
});

const NewArrival = ({classes, data, title}) => {
  return (
    <div className={`container-fluid`}>
      {
        title &&  (
        <div className={`row`}>
          <div className={`col`}>
            {title}
          </div>
        </div>
       )
      }
      <div className={`row`}>
        <div className={`col`}>
            <div className={`container-fluid`}>
              <div className={`row`}>
                {
                 ProductGallerySample.map((info, index) => {
                    if (info.feature) {
                      return (
                        <CardIcon key={index} title={info.name} classes={{ root: classes.cardFeature, img: classes.newArrivalMainImg}}>
                          <img src={`/images/products/${info.image}`} alt={info.name}/>
                        </CardIcon>
                      )
                    } else {
                      return (
                        <CardIcon key={index} title={info.name} classes={{ root: classes.cardNonFeature }}>
                          <img src={`/images/products/${info.image}`} alt={info.name}/>
                        </CardIcon>
                      )
                    } 
                  })
                }
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

NewArrival.protoTypes = {
  classes: T.object,
  data: T.object,
  title: T.string,
}

export default withStyles(styles)(NewArrival);