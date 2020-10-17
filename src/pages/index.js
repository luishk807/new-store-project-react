import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import { 
  Grid,
} from '@material-ui/core';

import LayoutTemplate from '../components/common/Layout/LayoutTemplate';
import BigCarrousel from '../components/BigCarrousel';
import ProductGallery from '../components/ProductGallery';
import ProductCategoryIcons from '../components/ProductCategoryIcons'
import NewArrival from '../components/NewArrival';
import Maitenance from '../components/Maintenance';
export default class extends Component {
  render () {
    return (
      <Maitenance/>
      // <LayoutTemplate>
      //   <Grid container className="main-section">
      //     <Grid item>
      //       <BigCarrousel image={'main-banner.jpg'} />
      //       <ProductCategoryIcons />
      //       <NewArrival title="Nuevas Llegadas" />
      //       <ProductGallery galleryType='store-list' title="Tiendas" />
      //       <ProductGallery galleryType='mini-banner'/>
      //       <ProductGallery galleryType='store-feature' title="Nuevas Llegadas" />
      //       <ProductGallery galleryType='brand-list' title="Top Brands" />
      //     </Grid>
      //   </Grid>
      // </LayoutTemplate>
    )
  }
}