import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { 
  Grid,
  withStyles,
} from '@material-ui/core';

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import BigCarrousel from '../components/BigCarrousel';
import ProductGallery from '../components/ProductGallery';
import ProductCategoryIcons from '../components/ProductCategoryIcons'
import NewArrival from '../components/NewArrival';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  layoutClass: {
    marginTop: 80
  }
});

class ClassComponent extends Component {
  // static async getInitialProps() {
  //   const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
  //   const data = await res.json()

  //   return {
  //     title: data.title,
  //     imageUrl: data.url
  //   }
  // }

  render () {
    const { classes } = this.props;
    
    return (
      <LayoutTemplate classes={{root: classes.layoutClass}}>
        <Grid container className="main-section">
          <Grid item>
            <BigCarrousel image={'main-banner.jpg'} />
            {/* <ProductCategoryIcons />
            <NewArrival title="Nuevas Llegadas" />
            <ProductGallery galleryType='store-list' title="Tiendas" />
            <ProductGallery galleryType='mini-banner'/>
            <ProductGallery galleryType='store-feature' title="Nuevas Llegadas" />
            <ProductGallery galleryType='brand-list' title="Top Brands" /> */}
          </Grid>
        </Grid>
      </LayoutTemplate>
    )
  }
}

export default withStyles(styles, {withTheme: true})(ClassComponent);