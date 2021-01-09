import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button, 
  Modal,
  TextField,
} from '@material-ui/core';

import Icons from '../common/Icons';
import { getProductByCategory } from '../../api/products';

import { noImageUrl } from '../../../config';
import { getImageUrlByType } from '../../utils/form'
import ProgressBar from '../../components/common/ProgressBar';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
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
  }
});

const CategoryModalProducts = React.memo(({classes, category}) => {
  const [products, setProducts] = useState([]);
  const [showData, setShowData] = useState(false)

  const imageUrl = getImageUrlByType('product');

  const fetchProducts = async() => {
    const getProds = await getProductByCategory(category);
    setProducts(getProds)
    setShowData(true);
  }

  useEffect(() => {
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
                  const imgUrl = product.productImages && product.productImages.length ? 
                    (<img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} />) : 
                    (<img className={`img-fluid`} src={`${noImageUrl.img}`} alt={noImageUrl.alt}/>) 
                  return (
                    <Grid key={index} item xs={12} className={classes.item}>
                      <Button href={`/product/${product.id}`}>
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