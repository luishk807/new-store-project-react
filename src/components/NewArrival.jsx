import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

import { 
  ProductGallerySample,
 } from '../constants/ProductGallery';

import CardIcon from './common/CardIcon';

const styles = (theme) => ({
  cardFeature: {
    width: '30%',
    height: 400,
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
                      return <CardIcon key={index} data={info} classes={{img: classes.newArrivalMainImg, root: classes.cardFeature}}/> 
                    } else {
                      return <CardIcon key={index} data={info} />
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