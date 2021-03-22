import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  FormControl,
  TextField,
  Link,
  Button
} from '@material-ui/core';
import { useRouter } from 'next/router';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { searchProductItemByFilter } from '../../api/productItems';
import { searchProductsByFilter } from '../../api/products';
// import { isImageAval } from '../../utils';
import { getImageBaseOnly } from '../../utils';
import ProgressBar from '../common/ProgressBar';

const styles = (theme) => ({
  root: {
    padding: 10,
    margin: '10px 0px',
    position: 'relative'
  },
  inputColor: {
    '&:not(:first-child)':{
      borderTop: '1px solid rgba(0,0,0,.09)',
    },
  },
  resultPanel: {
    background: 'white',
    // color: 'white',
    padding: 5,
    margin: 1,
    borderRadius: 4,
    position: 'absolute',
    width: '100%',
    top: 61,
    zIndex: 10,
    maxHeight: 500,
    overflowY: 'auto',
    border: '1px solid rgba(0,0,0,0.1)',
  },
  itemContainer: {
    alignItems: 'center'
  },
  resultItems: {
    padding: 5,
  },
  prodItem: {
    display: 'flex',
    flexDirection: 'column',
  }
});

const SearchBarPlain = ({classes}) => {
  const router = useRouter()
  const [showData, setShowData] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [resultText, setResultText] = useState('');

  const searchProduct = async(value) => {
    setShowLoader(true);
    let getProd = [];
    Promise.all(
      [
        searchProductItemByFilter({
          search: value
        }),
        searchProductsByFilter({
          search: value
        }),
      ]
    ).then(async(value) => {
      for (const item of value) {
        getProd = getProd.concat(item)
      }

      if (getProd && getProd.length) {
        setProducts(getProd)
        setShowLoader(false);
        setShowResult(true)
      } else {
        setShowNoResult()
      }
    })
  }

  const setShowNoResult = () => {
    resetTab(false)
    setShowNotFound(true);
  }

  const onFormChange = (e) => {
    setResultText(e.target.value)
    if (e.target.value.length > 3) {
      searchProduct(e.target.value);
    } else {
      resetTab(false);
    }
  }

  const resetTab = (deleteValue = true) => {
    setShowResult(false);
    setShowNotFound(false)
    setProducts([]);
    setShowLoader(false);
    if (deleteValue) {
      setResultText('');
    }
  }
  
  const prepareProductInfo = (product) => {
    if (product.productItemProduct) {
      return (
        <Grid item  lg={11} xs={11} className={classes.prodItem}>
          <div>
            SKU: { product.sku }
          </div>
          <div>
            Model: { product.model }
          </div>
          <div>
            Color: {
             product.productItemColor && product.productItemColor.name 
            }
          </div>
          <div>
            Size: {
              product.productItemSize && product.productItemSize.name
            }
          </div>
        </Grid>
      )
    } else {
      return (
        <Grid item  lg={11} xs={11} className={classes.prodItem}>
          {
            <div>
              { product.name }
            </div>
          }
          <div>
            SKU: { product.sku }
          </div>
          <div>
            Model: { product.model }
          </div>
          <div>
            Category: {
             product.categories && product.categories.name 
            }
          </div>
        </Grid>
      )
    }
  }

  useEffect(() => {
    setShowResult(false)
    setShowData(true);
  }, []);


  return showData && (
    <ClickAwayListener onClickAway={resetTab}>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12}>
            <FormControl fullWidth variant="outlined">
              <TextField 
                  variant="outlined" 
                  className={classes.inputColor}
                  onChange={onFormChange}
                  value={resultText}
                  name="search-product"
                  label={`Search for product`} 
                />
                {
                  showResult && (
                    <Grid container className={classes.resultPanel}>
                    {
                      products.map((product, index) => {
                        const img = getImageBaseOnly(product);
                        return (
                          <Grid item key={index} className={classes.resultItems} lg={12} xs={12}>
                            <a href={product.productItemProduct ? `/admin/products/items/edit/${product.id}` : `/admin/products/${product.id}`}>
                              <Grid container className={classes.itemContainer}>
                                <Grid item lg={1} xs={1}>
                                  {
                                    img
                                  }
                                </Grid>
                                {
                                  prepareProductInfo(product)
                                }
                              </Grid>
                            </a>
                          </Grid>
                      )})
                    }
                    </Grid>   
                  )
                }
                {
                    showLoader && (
                      <Grid container className={classes.resultPanel}>
                        <Grid item className={classes.resultItems} lg={12} xs={12}>
                            <ProgressBar />
                        </Grid>
                      </Grid>
                    )
                }
                {
                    showNotFound && (
                      <Grid container className={classes.resultPanel}>
                        <Grid item className={classes.resultItems} lg={12} xs={12}>
                            Not result found
                        </Grid>
                      </Grid>
                    )
                }
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </ClickAwayListener>
  );
}

SearchBarPlain.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(SearchBarPlain);