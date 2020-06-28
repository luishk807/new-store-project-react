import React from 'react';
import T from 'prop-types';

import {
  withStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { ProductGallerySample } from '../constants/ProductGallery';

const styles = (theme) => ({
  listItemCont: {
    display: 'inline-block',
    width: 'auto',
    textAlign: 'center',
  },
})

const ProductGallery = ({classes, data, title}) => {

  return (
    <div className={`container-fluid`}>
      <div className={`row`}>
        <div className={`col`}>
          {title}
        </div>
      </div>
      <div className={`row`}>
        <div className={`col`}>
            <div className={`container-fluid`}>
              <div className={`row`}>
                {
                  ProductGallerySample && ProductGallerySample.map((info, index) => {
                    if(info.feature){
                      return (
                        <div key={index} className={`col-lg-4 col-md-8 col-sm-12`}>
                        <ListItem button className={classes.listItemCont}>
                          <ListItemIcon>
                              <img className={`img-fluid`} src={`/images/products/${info.image}`} alt={info.name}/>
                          </ListItemIcon>
                          <ListItemText primary={info.name} />
                        </ListItem>
                        </div>
                      )
                    }else{
                      return (
                        <div key={index} className={`col-lg-2 col-md-4 col-sm-12`}>
                        <ListItem button className={classes.listItemCont}>
                          <ListItemIcon>
                              <img className={`img-fluid`} src={`/images/products/${info.image}`} alt={info.name}/>
                          </ListItemIcon>
                          <ListItemText primary={info.name} />
                        </ListItem>
                        </div>
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

ProductGallery.protoTypes = {
  classes: T.object,
  data: T.object,
  title: T.string,
}
export default withStyles(styles)(ProductGallery);