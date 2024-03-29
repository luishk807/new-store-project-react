import React, { useState, useEffect, useRef } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  FormControl,
  TextField,
  debounce
} from '@material-ui/core';
import { useRouter } from 'next/router';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { searchProductItemByFilter } from '@/api/productItems';
import { searchProductsByFilter } from '@/api/products';
import { getImageBaseThumbnail } from 'src/utils';
import ProgressBar from '@/common/ProgressBar';
import { useTranslation } from 'next-i18next'
import { getColorName } from '@/utils/helpers/product'

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

const SearchBarPlain = ({
  classes, 
  onEnterKeyPress, 
  returnObj = false, 
  isAdmin = false,
  searchItemsOnly = false
}) => {
  const router = useRouter()
  const [showData, setShowData] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const inputRef = useRef();
  const { t } = useTranslation('colors');

  const handleLinkClick = async(e, val) => {
    e.preventDefault();
    onEnterKeyPress(val)
    resetTab()
  }
  const searchProduct = async(value) => {
    setShowLoader(true);
    let getProd = [];
    Promise.all(
      [
        searchProductItemByFilter({
          search: value,
          fullDetail: isAdmin ? true : false
        }),
        searchProductsByFilter({
          search: value,
          fullDetail: isAdmin ? true : false
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
    
    // const [getProdItem, getProdx] = await Promise.all(
    //   [
    //     searchProductItemByFilter({
    //       search: value,
    //       fullDetail: isAdmin ? true : false
    //     }),
    //     searchProductsByFilter({
    //       search: value,
    //       fullDetail: isAdmin ? true : false
    //     }),
    //   ]
    // )

    // if(getProdItem) {
    //   console.log("hey", getProdItem)
    // }
    // if(getProdx) {
    //   console.log("heyxxx", getProdx)
    // }
    // .then(async(value) => {
    //   for (const item of value) {
    //     getProd = getProd.concat(item)
    //   }

    //   if (getProd && getProd.length) {
    //     setProducts(getProd)
    //     setShowLoader(false);
    //     setShowResult(true)
    //   } else {
    //     setShowNoResult()
    //   }
    // })
  }
  
  const onKeyUp = (e) => {
    if (e.keyCode === 13 && inputRef.current.value) {
      onEnterKeyPress(inputRef.current.value)
    }
  }

  const setShowNoResult = () => {
    resetTab(false)
    setShowNotFound(true);
  }

  const onFormChange = debounce(() => {
    const searchStr = inputRef.current.value;
    if (searchStr.length > 3) {
      searchProduct(searchStr);
    } else {
      resetTab(false);
    }
  }, 1000)

  const resetTab = (deleteValue = true) => {
    setShowResult(false);
    setShowNotFound(false)
    setProducts([]);
    setShowLoader(false);
    if (deleteValue) {
      inputRef.current.value = '';
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
            Color: { getColorName(product.productItemColor, t, 'colors') }
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
                  onKeyUp={onKeyUp}
                  inputRef={inputRef}
                  name="search-product"
                  label={`Search for product`} 
                />
                {
                  showResult && (
                    <Grid container className={classes.resultPanel}>
                    {
                      products.map((product, index) => {
                        const img = getImageBaseThumbnail(product);
                        return (
                          <Grid item key={index} className={classes.resultItems} lg={12} xs={12}>
                            {
                              returnObj ? (
                                <a href="#" onClick={(e) => handleLinkClick(e, product.id)}>
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
                              ) : (
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
                              )
                            }
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
  classes: T.object,
  onEnterKeyPress: T.func,
  isAdmin: T.bool,
  returnObj: T.bool,
  searchItemsOnly: T.bool
}

export default withStyles(styles)(SearchBarPlain);