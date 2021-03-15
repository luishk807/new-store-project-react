import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  FormControl,
  TextField
} from '@material-ui/core';
import { 
  Autocomplete,
} from '@material-ui/lab';
import { useRouter } from 'next/router';

import { getAllProductItems } from '../../api/productItems';
import { getAllProducts } from '../../api/products';

const styles = (theme) => ({
  root: {
    padding: 10,
    margin: '10px 0px',
  },
  inputColor: {
    '&:not(:first-child)':{
      borderTop: '1px solid rgba(0,0,0,.09)',
    },
    padding: 10
  }
});

const SearchBarPlain = ({classes}) => {
  const router = useRouter()
  const [showData, setShowData] = useState(false);
  const [products, setProducts] = useState([]);

  const loadProducts = async(evt) => {
    const gProducts = await getAllProductItems();
    const gProduct = await getAllProducts();
    const allProducts = gProducts.concat(gProduct);
    setProducts(allProducts);
    setShowData(true);
  }

  const selectedProduct = (e, val) => {
    if (val.productItemProduct) {
      router.push(`/admin/products/items/edit/${val.id}`)
    } else {
      router.push(`/admin/products/${val.id}`)
    }
  }

  useEffect(() => {
    loadProducts()
  }, []);


  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <FormControl fullWidth variant="outlined">
            <Autocomplete
              className={classes.whiteBackground}
              name="search-product"
              options={products}
              onChange={(e, value) => {
                selectedProduct(e, value)
              }}
              classes={{
                option: classes.inputColor
              }}
              getOptionLabel={(option) => {
                let item = null;
                if (option.productItemProduct) {
                  item = option.productItemProduct.name;
                  if (option.sku) {
                    item += ` * SKU: ${option.sku}`
                  }
                  item += `  * Color: ${option.productItemColor.name} * Size: ${option.productItemSize.name}`
                } else {
                  item = option.name;
                  if (option.sku) {
                    item += ` * SKU: ${option.sku}`
                  }
                }
                return item;
              }}
              renderInput={(params) => <TextField 
                {...params} 
                label='Find Product' variant="outlined" 
              />}
            />
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

SearchBarPlain.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(SearchBarPlain);