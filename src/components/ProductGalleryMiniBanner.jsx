import React from 'react';
import T from 'prop-types';

import {
  withStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { ProductGalleryMiniBannerSample } from '../constants/ProductGalleryMiniBanner';

const styles = (theme) => ({
  root: {
    margin: '5px 0px',
  },
  listItemCont: {
    display: 'inline-block',
    width: 'auto',
    textAlign: 'center',
  },
})

const ProductGalleryMiniBanner = ({classes, data}) => {

  return (
    <div className={classes.root}>
      <div className={`container-fluid`}>
        <div className={`row`}>
          {
            ProductGalleryMiniBannerSample && ProductGalleryMiniBannerSample.map((info, index) => {
              return (
                <div key={index} className={`col-lg-4 col-md-6 col-sm-12`}>
                <ListItem button className={classes.listItemCont}>
                  <ListItemIcon>
                      <img className={`img-fluid`} src={`/images/banners/mini/${info.image}`} alt={info.name}/>
                  </ListItemIcon>
                </ListItem>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

ProductGalleryMiniBanner.protoTypes = {
  classes: T.object,
  data: T.object,
}
export default withStyles(styles)(ProductGalleryMiniBanner);