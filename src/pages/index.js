import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';

import { 
  Grid,
} from '@material-ui/core';


import LayoutTemplate from '../components/LayoutTemplate';
import BigCarrousel from '../components/BigCarrousel';
import ProductGallery from '../components/ProductGallery';
import ProductGalleryMiniBanner from '../components/ProductGalleryMiniBanner';
import ProductCategoryIcons from '../components/ProductCategoryIcons'

export default class extends Component {
  static async getInitialProps() {
    const res = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    const data = await res.json()

    return {
      title: data.title,
      imageUrl: data.url
    }
  }

  render () {
    return (
      <LayoutTemplate>
        <Grid container className="main-section">
          <Grid item>
            <BigCarrousel image={'main-banner.jpg'} />
            <ProductCategoryIcons />
            <ProductGallery title="Nuevas Llegadas" />
            <ProductGalleryMiniBanner />
          </Grid>
        </Grid>
      </LayoutTemplate>
    )
  }
}