import React, { Component, lazy, Suspense} from 'react';
import { 
  Grid,
  withStyles,
} from '@material-ui/core';

import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
const SweetBox = lazy(() => import('@/components/sweetbox'));
const ProductScroller = lazy(() => import('@/components/product/Scroller'));
const ImageBox = lazy(() => import('@/components/home/ImageBox'));
const ProductCategory = lazy(() => import('@/components/home/ProductCategory'));

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

const LoadingComp = () => {
  return <h1>loading</h1>
}
class ClassComponent extends Component {
  render () {
    const { classes } = this.props;
    return (
      <LayoutTemplate classes={{root: classes.layoutClass}}>
        <Grid container className="main-section">
          <Grid item lg={12} xs={12}>
            <Suspense fallback={<LoadingComp />}>
              <ProductCategory />
            </Suspense>
          </Grid>
          <Grid item lg={12} xs={12}>
            <Suspense fallback={<LoadingComp />}>
              <SweetBox type={1} />
            </Suspense>
            <Suspense fallback={<LoadingComp />}>
              <ImageBox name="mini-slider" />
            </Suspense>
            <Suspense fallback={<LoadingComp />}>
              <ImageBox name="main-slider" showTitle={true} />
            </Suspense>
            <Suspense fallback={<LoadingComp />}>
              <SweetBox type={2} />
            </Suspense>
            <Suspense fallback={<LoadingComp />}>
              <ImageBox name="marcas" showTitle={true} />
            </Suspense>
            <Suspense fallback={<LoadingComp />}>
              <ProductScroller />
            </Suspense>
          </Grid>
        </Grid>
      </LayoutTemplate>
    )
  }
}

/** This section is mandatory for next-18next translation to work, only inside /pages */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['home', 'product', 'footer']),
  },
})

export default withStyles(styles, {withTheme: true})(ClassComponent);