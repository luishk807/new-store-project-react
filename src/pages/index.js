import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { 
  Grid,
  withStyles,
} from '@material-ui/core';

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import ProductGallery from '../components/ProductGallery';
import NewArrival from '../components/NewArrival';
import SweetBox from '../components/SweetBox';
import ProductScroller from '../components/ProductScroller';
import HomeCarrousel from '../components/HomeCarrousel';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  layoutClass: {
    marginTop: 80
  },
});

class ClassComponent extends Component {
  render () {
    const { classes } = this.props;
    
    return (
      <LayoutTemplate classes={{root: classes.layoutClass}}>
        <Grid container className="main-section">
          <Grid item>
            <HomeCarrousel />
          </Grid>
          <Grid item lg={12} xs={12}>
            <SweetBox type={1} />
            <SweetBox type={2} />
            {/* <ProductGallery galleryType='store-list' title="Tiendas" />
            <ProductGallery galleryType='mini-banner'/>
            <ProductGallery galleryType='store-feature' title="Nuevas Llegadas" />
            <ProductGallery galleryType='brand-list' title="Top Brands" /> */}
            <ProductScroller />
          </Grid>
        </Grid>
      </LayoutTemplate>
    )
  }
}

export default withStyles(styles, {withTheme: true})(ClassComponent);