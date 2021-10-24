import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';
import {isMobile} from 'react-device-detect';
import Slider from "react-slick";

import { getAllCategories } from '@/api/categories';
import { getProductByIds } from '@/api/products';
import SweetBoxProducts from '@/components/sweetbox/Products';
import ImageBox from './ImageBox';

import {
  getSweetBoxesByType
 } from '@/api/sweetbox';
 import CategorySelector from '@/components/category/Selector';

const styles = (theme) => ({
  root: {
    position: 'relative',
    background: 'rgba(0,0,0,.04)',
    paddingBottom: 17,
    [theme.breakpoints.down('sm')]: {
      background: 'white',
      paddingBottom: 5,
    }
  },
  mainContainer: {
    width: '100%',
    margin: '0px auto'
  },
  categoryIconSection: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
  catRoot: {
    display: 'flex',
    alignItems: 'center'
  },
  catContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  icon: {
    width: 60,
    height: 60,
    fill: 'white',
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
  },
  name: {
    color: 'black'
  },
  catBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
    borderRadius: 5,
    padding: '15px 20px',
    backgroundColor: '#f8be15',
    '&:hover': {
      '& div': {
        color: 'inherit',
      },
      '& svg': {
        fill: '#f8be15',
      }
    },
    '& span': {
      display: 'flex',
      flexDirection: 'row'
    }
  },
  sliderMainItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '32px 0px',
  },
  catItem: {
    margin: 5,
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
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
  sweetContainer: {
    background: 'white',
    [theme.breakpoints.down('sm')]: {
      padding: '0px !important',
    }
  },
  sweetbox: {
    width: '100%'
  },
  sliderName: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    padding: 15,
  },
  categoryIconSection: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
  categorySelectorItems: {
    backgroundColor: 'black',
    width: '100%'
  },
  categoryCubeCategoryContainer: {
    backgroundColor: 'black',
    height: '100%',
  },
  categorySelectorRoot: {
    backgroundColor: 'transparent',
    padding: '32px 0px 35px',
  },
  imageItem: {
    padding: '5px 10px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      padding: '6px 15px',
    }
  },
  sweetBoxesItems: {
    display: 'flex',
  }
});

const ProductCategory = ({classes}) => {
  const [categories, setCategories] = useState([]);
  const [sweetBoxes, setSweetBoxes] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showSweetBox, setShowSweetBox] = useState(false);

  const loadAll = async() => {
    const [gCat, gSweeBox] = await Promise.all([
      getAllCategories(),
      getSweetBoxesByType(4)
    ]);

    if (gCat) {
      setCategories(gCat)
    }

    if (gSweeBox) {
      setSweetBoxes([])
      gSweeBox.forEach(async(sweetbox) => {
        let item = Object.assign({}, sweetbox);
        const ids = sweetbox.sweetBoxSweetboxProduct.map(item => item.product);
        if (ids && ids.length) {
          const getProd = await getProductByIds(ids)
          item.sweetBoxSweetboxProduct = getProd;
          setSweetBoxes(prev => [
            ...prev,
            item
          ])
        }
      });   

    }
  }

  useEffect(() => {
    if (sweetBoxes && sweetBoxes.length) {
      setShowSweetBox(true);
    }
  }, [sweetBoxes])

  useEffect(() => {
    setShowCategories(true);
  }, [categories])

  useEffect(() => {
    loadAll();
  }, [])

  const categorySelectorClasses = {
    cubeItems: classes.categorySelectorItems,
    root: classes.categorySelectorRoot,
    cubeCategoryContainer: classes.categoryCubeCategoryContainer
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.mainContainer}>
        <Grid item lg={2} md={2} className={classes.categoryIconSection} >
          <CategorySelector showTitle={false} classes={{...categorySelectorClasses}} cubeSize="6"/>
        </Grid>
        <Grid item lg={6} xs={12} className={classes.imageItem}>
          <ImageBox name="home-rect" isSlider={true} />
        </Grid>
        <Grid item lg={4} xs={12} className={classes.sweetBoxesItems}>
          <Grid container>
            <Grid item lg={12} xs={12} className={classes.sliderMainItem}>
            {
                showSweetBox && sweetBoxes.map((items, mIndex) => {
                  const isSingle = items.sweetBoxSweetboxProduct.length === 1;
                  return (
                    <Grid container key={mIndex} className={classes.sweetContainer}>
                      <Grid item lg={12} xs={12} className={classes.sliderName}>
                        {
                          items.name
                        }
                      </Grid>
                      <Grid item lg={12} md={5} xs={12}  className={!isSingle ? `home-banner-slider`: null}>
                        {
                          isSingle ? (
                            <Grid item lg={12} xs={12} className={`home-banner-single`}>
                              <SweetBoxProducts classes={{cardBtn: classes.sweetbox}} isPlain={true} type="single" data={items.sweetBoxSweetboxProduct[0]} />
                            </Grid>
                          ) : (
                            <Slider 
                              dots={false}
                              infinite={true}
                              accessibility={true}
                              speed={500}
                              slidesToShow={isMobile ? 1 : 2}
                              slidesToScroll={1} 
                              adaptiveHeight={true}
                            >
                              {
                                items.sweetBoxSweetboxProduct.map((product, index) => {
                                  return (
                                    <Grid key={index} item lg={12} xs={12}>
                                      <SweetBoxProducts classes={{cardBtn: classes.sweetbox}} key={index} type="plain" data={product} />
                                    </Grid>
                                  )
                                })
                              }
                            </Slider>
                          )
                        }

                      </Grid>
                    </Grid>
                  )
                })
            }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

ProductCategory.propTypes = {
  classes: T.object,
};

export default withStyles(styles)(ProductCategory);