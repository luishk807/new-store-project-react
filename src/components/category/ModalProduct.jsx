import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  Modal,
  TextField,
} from '@material-ui/core';

import Icons from '@/components/common/Icons';
import { getProductByCategory } from '@/api/products';

import { noImageUrl } from 'config';
import { getImageUrlByType } from '@/utils/form'
import ProgressBar from '@/components/common/ProgressBar';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  item: {
    borderTop: '1px solid rgba(0,0,0,.08)',
  },
  itemContainer: {
    alignItems: 'center'
  },
  info: {
    padding: 8,
  }, 
  img: {
    padding: 8,
  },
  discountPrice: {
    background: 'red',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '.69em',
    padding: '4px 8px',
    borderRadius: '5px',
    margin: '5px 0px',
    textAlign: 'center',
  }
});

const CategoryModalProducts = React.memo(({classes, category}) => {
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false)

  const { t } = useTranslation('product')

  const imageUrl = getImageUrlByType('product');

  const fetchProducts = async() => {
    const getProds = await getProductByCategory(category);
    setProducts(getProds)
    setShowData(true);
  }

  useEffect(() => {
    if (products && products.length) {
      setShowData(true);
    }
  },[products]);

  useEffect(() => {
    setShowData(false);
    if (category) {
      fetchProducts(); 
    }
  }, [category])

  return (
    <div className={classes.root}>
      {
        showData ? products.length ? (
            <Grid container>
              {
                products.map((product, index) => {
                  let foundDiscount = null;
                  foundDiscount = product.productProductItems.filter(item => item.prevRetailPrice)[0];

                  const imgUrl = product.productImages && product.productImages.length ? 
                    (<img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} />) : 
                    (<img className={`img-fluid`} src={`${noImageUrl.img}`} alt={noImageUrl.alt}/>) 
                  return (
                    <Grid key={index} item xs={12} className={classes.item}>
                      <Button href={`/product/${product.slug}`}>
                        <Grid container className={classes.itemContainer}>
                          <Grid item xs={5} className={classes.img}>
                            {
                              imgUrl
                            }
                          </Grid>
                          <Grid item xs={7} className={classes.info}>
                            {
                              product.name
                            }
                            {
                              foundDiscount && (<p className={classes.discountPrice}>{ t('product:on_sale') }</p>)
                            }
                          </Grid>
                          
                        </Grid>
                      </Button>
                    </Grid>
                  )
                })
              }
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={12} align="center">
                no data
              </Grid>
            </Grid>
          )
        : (
          <Grid container>
            <Grid item xs={12} align="center">
              <ProgressBar />
            </Grid>
          </Grid>
        )
      }
    </div>
  );
})

CategoryModalProducts.protoTypes = {
  classes: T.object,
  category: T.number,
}

export default withStyles(styles)(CategoryModalProducts);