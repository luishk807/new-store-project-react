import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  Button,
  Grid,
  withStyles,
} from '@material-ui/core';

import { getImage, getImageAsync, formatNumber} from 'src/utils';
import { addDiscountItem, isOutOfStock, getLiveStock } from 'src/utils/products';
import { getProductItemByIds } from '@/api/productItems';
import { getAdminProductByIds, getAdminProductById } from '@/api/products';
import { getProductBundlesByIds} from '@/api/productBundles';

import { useTranslation } from 'next-i18next'
import ProgressBar from '@/common/ProgressBar';
import SearchBarPlain from '@/src/components/common/SearchBar/PlainItems';
import QuantitySelectorB from '@/common/QuantitySelectorB';
import ColorSelector from '@/common/Product/ColorSelector';
import SizeSelector from '@/common/Product/SizeSelector';
import BundleSelector from '@/common/Product/BundleSelector';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  mainContainer: {
    width: '100%',
  },
  item: {
    width: '100%'
  },
  productItem: {
    width: '100%',
    borderTop: '1px solid rgba(0,0,0,.05)',
    padding: '10px 0px',
  },
  itemProductImage: {
    padding: 10,
  },
  itemProductDescription: {
    textAlign: 'left',
    padding: 10,
    '& p': {
      [theme.breakpoints.down('sm')]: {
        lineHeight: 'normal',
      }
    }
  },
  cartDropRoot: {
    padding: '10px 0px',
  },
  itemProductButton: {
    textAlign: 'right',
  },
  saveTotal: {
    color: 'green',
  },
  originalPrice: { 
    textDecoration: 'line-through',
  },
  itemName: {
    fontSize: '1em',
    fontWeight: 'bold',
  },
  itemProductTotal: {
    padding: '10px',
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  }
});

const SimpleBoxEdit = React.memo(({ classes, data, onUpdateProduct }) => {
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false);
  const { t } = useTranslation(['common', 'order', 'product'])

  const handleSearchEnterKey = async(newEntry) => {
    let currProds = [...products];

    const getProd = await getAdminProductById(newEntry.productItemProduct.id);

    const data = {
      ...getProd,
      'productDiscount': null,
      'quantity': 1,
      'savePercentage': null,
      'savePercentageShow': null,
      'savePrice': null,
      'total': null,
      'unit_total': (1 * newEntry.retailPrice),
      'selectedColor': newEntry.productItemColor,
      'selectedSize': newEntry.productItemSize,
      'selectedBundle': null,
      'selectedItem': newEntry
    }

    let foundIndex = null;
    let found = false;
    for(let i = 0; i < currProds.length; i++) {
      if (currProds[i].selectedItem.id === newEntry.id) {
        foundIndex = i;
        found = true;
        break;
      }
    }
    if (found) {
      const quantity = Number(currProds[foundIndex].quantity) + 1;
      await addDiscountItem(currProds[foundIndex], quantity);
    } else {
      currProds.push(data)
    }

    setProducts(currProds);
    setShowData(false);
  }

  const removeProduct = (item, indx) => {
    const currList = products.length;
    const currProd = [...products];
    const newlist = currProd.filter((item, index) => index != indx)
    
    if(newlist && newlist.length !== currList.length) {
      setProducts(newlist);
      setShowData(false)
    }

  }
  
  const handleSelectChange = async(resp) => {
    const index = resp.id.split("-")[1]
    if (!index) {
      return;
    }
    
    let getProduct =  [...products];
    getProduct[index].productDiscount = null;
    
    if (resp.value > 0) {
      await addDiscountItem(getProduct[index], resp.value);
    } else {
      getProduct.splice(index,1);
    }
    setProducts(getProduct);
  }

  const handleColorSelect = async(e, target) => {
    let currData = products;
    currData[target].selectedColor = e;

    setProducts(currData);
  }

  const handleSizeSelect = async(e, target) => {
    let currData = products;
    currData[target].selectedSize = e;
    
    setProducts(currData);
  }

  const setBundleItems = (item, bundle) => {
    delete item.selectedItem.originalPrice;
    item.productDiscount = null;
    item.selectedItem.save_percentag_show = null;
    item.selectedItem.save_percentage = null;
    item.selectedItem.save_price = null;
    item.selectedItem.retailPrice = Number(bundle.retailPrice);
    item.selectedItem.unitPrice = Number(bundle.retailPrice);
    item.unit_total = Number(bundle.retailPrice);
  }

  const handleBundleSelect = async(e, target) => {
    let currData = [...products];
    currData[target].bundle = e;
    setBundleItems(currData[target], e);
    setProducts(currData);
  }

  const loadProducts = async() => {
    const prodIds = data.map((item) => item.product);
    const prodItemIds = data.map((item) => item.productItemId);
    const prodItemBundlesIds = data.map((item) => item.productBundleId).filter(item => item != null);

    const [getProduct, getProductItem] = await Promise.all([
      getAdminProductByIds(prodIds),
      getProductItemByIds(prodItemIds)
    ])
    
    let getProductBundles = null;
    if (prodItemBundlesIds && prodItemBundlesIds.length) {
      getProductBundles = await getProductBundlesByIds(prodItemBundlesIds)
    }

    const newProducts = data;

    const refactorData = newProducts.map(item => {
      const getProd = getProduct.filter(prod => {
        return prod.id == item.product
      });

      const getProdItem = getProductItem.filter(prod => {
        return prod.id == item.productItemId
      });

      let getProdBundle = null;

      if (getProductBundles) {
        getProdBundle = getProductBundles.filter(prod => {
          return prod.productItemId == item.productItemId
        })[0];
      }

      let quantity = Number(item.quantity);

      if (item.originalPrice && !getProdItem[0].originalPrice) {
        getProdItem[0]['originalPrice'] = item.originalPrice;
        getProdItem[0]['retailPrice'] = item.unit_total;
      }


      const data = {
        ...getProd[0],
        'productDiscount': item.productDiscount,
        'quantity': quantity,
        'savePercentage': item.savePercentage,
        'savePercentageShow': item.savePercentageShow,
        'savePrice': item.savePrice,
        'total': item.total,
        'unit_total': item.unit_total,
        'selectedColor': getProdItem[0].productItemColor,
        'selectedSize': getProdItem[0].productItemSize,
        'selectedBundle': getProdItem[0].productBundle,
        'selectedItem': getProdItem[0]
      }

      if (getProdBundle) {
        data['bundle'] = getProdBundle;
        data.productDiscount = null;
        const bundleQty = Number(getProdBundle.quantity);
        const newQty = quantity/bundleQty;
        data.quantity = newQty;
        setBundleItems(data, getProdBundle)
      }

      return data
    })

    for(const item of refactorData) {
      const foundImg = item.productImages;
      if (!foundImg || (foundImg && !foundImg.length)) {
        const fImage = await getImageAsync(item);
        if (fImage) {
          await item.productImages.push(fImage);
        }
      } 
    }

    setShowData(false);
    setProducts(refactorData);
  }

  useEffect(() => {
    if (products && products.length) {
      setShowData(true);
    } else {
      setShowData(false);
    }
    onUpdateProduct(products);
  }, [products]);


  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container className={classes.mainContainer}>
        <Grid item lg={12} xs={12} item className={classes.item}>
          <SearchBarPlain returnObj={true} onEnterKeyPress={handleSearchEnterKey}/>
        </Grid>
        <Grid item lg={12} xs={12} item className={classes.item}>
        {
          showData ? (
            <Grid container>
            {
              products.map((item, indx) => {
                const img = getImage(item);
                const totalSaved = Number(item.savePrice);
                const showSaved = totalSaved && totalSaved > 0 ? true : false;
                return (
                  <Grid key={indx} item className={classes.productItem}>
                    <Grid container>
                      <Grid item lg={1} xs={3} className={classes.itemProductImage}>
                        {
                          img
                        }
                      </Grid>
                      <Grid item lg={6} xs={9} className={classes.itemProductDescription}>
                        <p className={classes.itemName}><a href={`/product/${item.slug}`}>{item.name}</a></p>
                        <p>Sku: <b>{item.sku}</b></p>
                        {
                          item.selectedColor ? (
                            <p>Color: {`${item.selectedColor.name}`}</p>
                          ) : (
                            <ColorSelector data={item} index={indx} onSelect={handleColorSelect}/>
                          )
                        }
                        {
                          item.selectedSize ? (
                            <p>Size: {`${item.selectedSize.name}`}</p>
                          ) : (
                            <SizeSelector data={item} index={indx} onSelect={handleSizeSelect} selected={item.selectedColor} />
                          )
                        }
                        {
                          item.bundle ? (
                            <p>Bundle: {`${item.bundle.name}`}</p>
                          ) : (
                            <BundleSelector data={item} index={indx} onSelect={handleBundleSelect} selected={item.bundle} />
                          )
                        }

                        {
                          item.savePrice ? (
                            <p>{ t('order:unit_total') }: <b><span className={classes.originalPrice}>{item.originalPrice}</span>&nbsp; ${formatNumber(item.unit_total)}</b></p>
                          ) : (
                            <p>{ t('order:unit_total') }: <b>${formatNumber(item.unit_total)}</b></p>
                          )
                        }
                        {
                          item.productDiscount && (
                            <p className={classes.itemTotal}>{ t('common:discount') }: <b>{item.productDiscount}</b></p>
                          )
                        }
                        <Grid container>
                          <Grid item lg={2} xs={5}>
                            <Button onClick={(e) => removeProduct(item, indx) } className={`secondButtonSmall`}>Delete</Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item lg={4} xs={8} className={classes.itemProductButton}>
                        <QuantitySelectorB
                          jump={item.bundle ? item.bundle.quantity : 0}  
                          stock={item.stock} 
                          cart={products}
                          product={item}
                          data={item.quantity} 
                          classes={{ root: classes.cartDropRoot}} 
                          onChange={handleSelectChange} 
                          id={`select-${indx}`} 
                        />
                      </Grid>
                      <Grid item lg={1} xs={4} className={classes.itemProductTotal}>
                          ${formatNumber(item.selectedItem.retailPrice * item.quantity)}
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })
            }  
            </Grid>
          ) : !products || (products && !products.length) ? 
            <Grid container className={classes.mainContainer}>
                  <Grid item lg={12} xs={12} item className={classes.item}>
                      {
                        t('product:no_product_found')
                      }
                  </Grid>
            </Grid>
          : (
            <ProgressBar />
          )
        }
        </Grid>
      </Grid>
    </div>
  )
})

SimpleBoxEdit.propTypes = {
  classes: T.object,
  data: T.array.isRequired,
  onUpdateProduct: T.func
}

export default withStyles(styles)(SimpleBoxEdit);