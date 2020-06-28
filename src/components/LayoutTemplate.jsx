import React, { Component } from 'react';
import Head from 'next/head';

import Header from './common/Header';
import Footer from './common/Footer';

const LayoutTemplate = props => (
  <section>
    <Head>
      <title>My page titlse</title>
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
    </Head>
    <Header />
    {props.children}
    <Footer />
  </section>
);

export default LayoutTemplate;