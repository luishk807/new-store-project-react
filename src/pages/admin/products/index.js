import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
} from '@material-ui/core';

import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import { deleteItem } from '../../../api';
import Api from '../../../services/api';
import Snackbar from '../../../components/common/Snackbar';
import { ADMIN_SECTIONS } from '../../../constants/admin';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  item: {
    padding: 5
  },
  mainImage: {
    width: 150,
  }
});

const Index = ({classes}) => {
  const [products, setProducts] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delProduct = async(id) => {
    deleteItem(ADMIN_SECTIONS.product.url, id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: 'Product Deleted',
      })
      loadProducts()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: 'ERROR: Product cannot be delete',
      })
    })
  }

  const loadProducts = async() => {
    const getProducts = await Api.get("/products");
    const productHtml = getProducts.map((product, index) => {
      const main_image = product.product_images.length > 0 ? product.product_images[0].img_url : null
      return (
        <Grid item key={index} lg={12} className={classes.item}>
          <Grid container>
            <Grid item lg={1} xs={12}>
             {index + 1}
            </Grid>
            <Grid item lg={4} xs={12}>
              <img className={classes.mainImage} src={`${process.env.IMAGE_URL}/${main_image}`} />
            </Grid>
            <Grid item lg={2} xs={12}>
              <Link href="products/[pid]" as={`products/${product.id}`}>
                {product.name}
              </Link>
            </Grid>
            <Grid item lg={2} xs={12}>
              {product.amount}
            </Grid>
            <Grid item lg={3} xs={12}>
              [
                <Button onClick={()=> { delProduct(product.id) }}>
                  delete
                </Button>
              ]
            </Grid>
          </Grid>
        </Grid>
      )
    })
    setProducts(productHtml);
  }
  
  useEffect(() => {
    loadProducts();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <Grid container className={classes.root}>
        <Grid item xs={12} lg={12}>
          <h1>Products</h1>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
              <Grid item lg={12} xs={12}>
                  [
                    <Link href="products/add">
                      Add Product
                    </Link>
                  ]
              </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Grid container>
            <Grid item lg={1} xs={12}>

            </Grid>
            <Grid item lg={4} xs={12}>
              image
            </Grid>
            <Grid item lg={2} xs={12}>
              name
            </Grid>
            <Grid item lg={2} xs={12}>
              amount
            </Grid>
            <Grid item lg={3} xs={12}>
              action
            </Grid>
          </Grid>
          <Grid container>
            {
              products && products
            }
          </Grid>
        </Grid>
      </Grid>
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);