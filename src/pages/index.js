import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { 
  Grid,
  withStyles,
} from '@material-ui/core';

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import ProductGallery from '../components/product/Gallery';
import NewArrival from '../components/home/NewArrival';
import SweetBox from '../components/sweetbox';
import ProductScroller from '../components/product/Scroller';
import HomeCarrousel from '../components/home/Carrousel';
import ImageBox from '../components/home/ImageBox';

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
            <ImageBox type={2} />
            <ImageBox type={4} showTitle={true} />
            <SweetBox type={2} />
            <ImageBox type={3} showTitle={true} />
            <ProductScroller />
          </Grid>
        </Grid>
      </LayoutTemplate>
    )
  }
}

export default withStyles(styles, {withTheme: true})(ClassComponent);