import React from 'react';
import T from 'prop-types';
import {
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';

import { 
  ProductGallerySample,
  ProductGalleryStoreSample,
  ProductGalleryMiniBannerSample,
  ProductGalleryStoreLists,
  ProductGalleryLogoSample,
 } from '../constants/ProductGallery';

const styles = (theme) => ({
  listItemCont: {
    display: 'inline-block',
    width: 'auto',
    textAlign: 'center',
  },
  miniBanner: {
    margin: '5px 0px',
  },
  listChildItem: {
    display: 'inline-block'
  }
})

const ProductGallery = ({classes, data, title, galleryType}) => {
  let ProductGalleryItems = [];
  let ProductGalleryItemsChild = [];

  switch(galleryType){
    case 'new-arrival': 
      ProductGalleryItems = ProductGallerySample.map((info, index) => {
        if (info.feature) {
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
        } else {
          return (
            <div key={index} className={`col-lg-2 col-md-4 col-sm-12`}>
              <ListItem component="a" href="/product" button className={classes.listItemCont}>
                <ListItemIcon>
                    <img className={`img-fluid`} src={`/images/products/${info.image}`} alt={info.name}/>
                </ListItemIcon>
                <ListItemText primary={info.name} />
              </ListItem>
            </div>
          )
        }
      })
    break;
    case 'store-feature': 
      ProductGalleryStoreSample.forEach((info, index) => {
        if(info.feature){
          ProductGalleryItems.push(
            <div key={index} className={`col-lg-4 col-md-8 col-sm-12`}>
              <ListItem>
                  {title}
              </ListItem>
              <ListItem>
                <Button variant="contained" color="primary">
                    Primary
                </Button>
              </ListItem>
              <ListItem button className={classes.listItemCont}>
                <ListItemIcon>
                    <img className={`img-fluid`} src={`/images/products/${info.image}`} alt={info.name}/>
                </ListItemIcon>
                <ListItemText primary={info.name} />
              </ListItem>
            </div>
          )
        }else{
          ProductGalleryItemsChild.push(
            <div key={index} className={`col-lg-3 col-md-4 col-sm-12 ${classes.listChildItem}`}>
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
      ProductGalleryItems.push(
        <div className={`col-lg-8 col-md-8 col-sm-12`}>
          {ProductGalleryItemsChild}
        </div>
      );
    break;
    case 'mini-banner':
      ProductGalleryItems.push(
        <div className={classes.miniBanner}>
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
      )
    break;
    case 'store-list':
      ProductGalleryItems = ProductGalleryStoreLists.map((info, index) => {
        return (
          <div key={index} className={`col-lg-1 col-md-4 col-sm-12`}>
            <ListItem button className={classes.listItemCont}>
              <ListItemIcon>
                  <img className={`img-fluid`} src={`/images/stores/${info.image}`} alt={info.name}/>
              </ListItemIcon>
            </ListItem>
          </div>
        )
      })
    break;
    case 'brand-list':
      ProductGalleryItems = ProductGalleryLogoSample.map((info, index) => {
        return (
          <div key={index} className={`col-lg-2 col-md-4 col-sm-12`}>
            <ListItem button className={classes.listItemCont}>
              <ListItemIcon>
                  <img className={`img-fluid`} src={`/images/brands/${info.image}`} alt={info.name}/>
              </ListItemIcon>
            </ListItem>
          </div>
        )
      })
    break;

  }

  return (
    <div className={`container-fluid`}>
      {
       galleryType !== 'store-feature' && title &&  (
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
                  ProductGalleryItems
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
  galleryType: T.string.isRequired,
}

export default withStyles(styles)(ProductGallery);