import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';

import LayoutTemplate from '../components/LayoutTemplate';
import BigCarrousel from '../components/BigCarrousel';
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
        <div className="container-fluid main-section">
          <div className="row">
            <div className="col">
              <BigCarrousel image={'main-banner.jpg'} />
              <ProductCategoryIcons />
              <div>
                <div>
                  {this.props.title}
                </div>
                <div>
                  <img src={this.props.imageUrl} />
                </div>
                <h1>The value of customKey is: {process.env.CUSTOM_KEY}</h1>
              </div>
            </div>
          </div>
        </div>
      </LayoutTemplate>
    )
  }
}