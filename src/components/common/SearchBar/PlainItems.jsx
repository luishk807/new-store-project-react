import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  FormControl,
  TextField,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { searchProductItemByFilter, getProductItemByIds } from '@/api/productItems';
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
}) => {
  const router = useRouter()
  const [showData, setShowData] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [resultText, setResultText] = useState('');
  const { t } = useTranslation('colors');

  const handleLinkClick = async(e, val) => {
    e.preventDefault();
    onEnterKeyPress(val)
    resetTab()
  }

  const searchProduct = async(value) => {
    setShowLoader(true);
    let getProd = [];
    const [getItms, getPrd] = await Promise.all(
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
    );

    if (getItms && getItms.length) {
      for (const item of getItms) {
        getProd.push(item);
      }
    }
    if (getPrd && getPrd.length) {
      let itemId = [];
      for (const prod of getPrd) {
        if (prod.productProductItems) {
          for (const item of prod.productProductItems) {
            itemId.push(item.id);
          }
        }
      }
      if (itemId && itemId.length) {
        const getFullItem = await getProductItemByIds(itemId);
        if (getFullItem && getFullItem.length) {
          for (const item of getFullItem) {
            getProd.push(item);
          }
        }
      }
    }

    if (getProd && getProd.length) {
      setProducts(getProd)
      setShowLoader(false);
      setShowResult(true)
    } else {
      setShowNoResult()
    }
  }
  
  const onKeyUp = (e) => {
     e.preventDefault();
    if (e.keyCode === 13 && resultText) {
      onEnterKeyPress(resultText)
    }
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
                  onKeyPress={(e) => { if (e.key === 'Enter') e.preventDefault(); } }
                  onKeyUp={onKeyUp}
                  value={resultText}
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
                                <a href="#" onClick={(e) => handleLinkClick(e, product)}>
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
}

export default withStyles(styles)(SearchBarPlain);