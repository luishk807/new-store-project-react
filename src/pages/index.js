import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { 
  Grid,
  withStyles,
} from '@material-ui/core';

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import ProductGallery from '../components/product/Gallery';
import SelectorPlain from '../components/category/SelectorPlain';
import NewArrival from '../components/home/NewArrival';
import SweetBox from '../components/sweetbox';
import ProductScroller from '../components/product/Scroller';
import HomeCarrousel from '../components/home/Carrousel';
import ImageBox from '../components/home/ImageBox';
import ProductCategory from '../components/home/ProductCategory';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  layoutClass: {
    marginTop: 80
  },
  listItemMainCont: {
    justifyContent: 'flex-start',
  },
  listIcon: {
    width: 60,
    height: 60,
    fill: '#f8be15',
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
  },
  listItemCont: {
    textAlign: 'center',
  //  background: '#f8be15 !important',
    margin: 5,
    borderRadius: 5,
    border: '2px solid #f8be15',
    padding: '10px 30px',
    '&:hover': {
      '& > div:first-child': {
        borderBottom: '2px solid white !important',
      },
      '& svg': {
        fill: 'white'
      },
      background: '#f8be15 !important',
    }
  },
  listItemIcons: {
    borderBottom: '2px solid #f8be15 !important',
  },
  name: {
    color: 'black'
  },
});

class ClassComponent extends Component {
  render () {
    const { classes } = this.props;
    
    return (
      <LayoutTemplate classes={{root: classes.layoutClass}}>
        <Grid container className="main-section">
          {/* <Grid item lg={12} xs={12}>
            <ProductCategory />
          </Grid> */}
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