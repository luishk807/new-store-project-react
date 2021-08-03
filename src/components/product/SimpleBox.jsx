import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  Button,
  Grid,
  withStyles 
} from '@material-ui/core';

import { formatNumber } from 'src/utils';
import { getImage, getImageAsync, getImageBaseOnly} from 'src/utils';
import { noImageUrl } from 'config';
import { getProductDiscountsByProductIds } from 'src/api/productDiscounts';
import { getProductItemByIds } from 'src/api/productItems';
import { useTranslation } from 'next-i18next'

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
});

const SimpleBox = React.memo(({ classes, data }) => {
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false);
  const { t } = useTranslation(['common', 'order'])
  const loadProducts = async() => {
    const itemIds = data.map((item) => item.productItemId);
    const getProduct = await getProductItemByIds(itemIds);
    
    const newProducts = data;

    const refactorData = newProducts.map(item => {
      const getProd = getProduct.filter(prod => {
        return prod.id === item.productItemId
      })

      const data = {
        ...item,
        'productImages': getProd[0].productImages,
        'slug': getProd[0].productItemProduct.slug,
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

    setProducts(refactorData);
  }

  useEffect(() => {
    if (products && products.length) {
      setShowData(true);
    }
  }, [products]);


  useEffect(() => {
    loadProducts();
  }, []);

  return showData && (
    <div className={classes.root}>
      <Grid container className={classes.mainContainer}>
      {
        products.map((item, indx) => {
          const img = getImage(item);
          const totalSaved = Number(item.savePrice);
          const showSaved = totalSaved && totalSaved > 0 ? true : false;
          return (
            <Grid key={indx} item className={classes.item}>
              <Grid container>
                <Grid item lg={3} xs={6} className={classes.itemProductImage}>
                  {
                    img
                  }
                </Grid>
                <Grid item lg={9} xs={6} className={classes.itemProductDescription}>
                  <p className={classes.itemName}><a href={`/product/${item.slug}`}>{item.name}</a></p>
                  <p>Sku: <b>{item.sku}</b></p>
                  <p>{ t('common:size') }: <b>{item.size}</b></p>
                  <p>{ t('common:color') }: <b>{item.color}</b></p>
                  <p>{ t('common:quantity') }: <b>{item.quantity}</b></p>
                  {
                    item.savePrice ? (
                      <p>{ t('order:unit_total') }: <b><span className={classes.originalPrice}>{item.originalPrice}</span>&nbsp; ${formatNumber(item.unit_total)}</b></p>
                    ) : (
                      <p>{ t('order:unit_total') }: <b>${formatNumber(item.unit_total)}</b></p>
                    )
                  }

                  <p>{ t('common:total') }: <b>${formatNumber(item.total)}</b></p>
                  {
                    showSaved && (
                      <p className={classes.saveTotal}>{ t('order:you_saved') }: <b>${formatNumber(item.savePrice)}</b></p>
                    )
                  }
                  {
                    item.productDiscount && (
                      <p className={classes.itemTotal}>{ t('common:discount') }: <b>{item.productDiscount}</b></p>
                    )
                  }
                </Grid>
              </Grid>
            </Grid>
          )
        })
      }
      </Grid>
    </div>
  );
})

SimpleBox.propTypes = {
  classes: T.object,
  data: T.array.isRequired
}

export default withStyles(styles)(SimpleBox);