import React, { Component } from 'react';
<<<<<<< HEAD
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
=======
import Maitenance from '../components/Maintenance';
export default class extends Component {
>>>>>>> e3972330d80ed9bad63ada48b0cdb975a562a37f
  render () {
    const { classes } = this.props;
    return (
<<<<<<< HEAD
      <LayoutTemplate classes={{root: classes.layoutClass}}>
        <Grid container className="main-section">
          <Grid item lg={12} xs={12}>
            <ProductCategory />
          </Grid>
          <Grid item lg={12} xs={12}>
            <SweetBox type={1} />
            <ImageBox name="mini-slider" />
            <ImageBox name="main-slider" showTitle={true} />
            <SweetBox type={2} />
            <ImageBox name="marcas" showTitle={true} />
            <ProductScroller />
          </Grid>
        </Grid>
      </LayoutTemplate>
=======
      <Maitenance/>
>>>>>>> e3972330d80ed9bad63ada48b0cdb975a562a37f
    )
  }
}

/** This section is mandatory for next-18next translation to work, only inside /pages */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['home', 'footer']),
  },
})

export default withStyles(styles, {withTheme: true})(ClassComponent);