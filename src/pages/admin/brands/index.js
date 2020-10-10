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
import { ADMIN_SECTIONS } from '../../../constants/admin';
import Snackbar from '../../../components/common/Snackbar';

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
  const [brands, setBrands] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delBrand = async(id) => {
    deleteItem(ADMIN_SECTIONS.brand.url, id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: 'Brand Deleted',
      })
      loadBrands()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: 'ERROR: Brand cannot be delete',
      })
    })
  }

  const loadBrands = async() => {
    const getBrands = await Api.get("/brands");
    const brandHtml = getBrands.map((brand, index) => {
      return (
        <Grid item key={index} lg={12} className={classes.item}>
          <Grid container>
            <Grid item lg={1} xs={12}>
             {index + 1}
            </Grid>
            <Grid item lg={4} xs={12}>
              <img className={classes.mainImage} src={`${process.env.IMAGE_URL}/brands/${brand.img}`} />
            </Grid>
            <Grid item lg={2} xs={12}>
              <Link href="brands/[bid]" as={`brands/${brand.id}`}>
                {brand.name}
              </Link>
            </Grid>
            <Grid item lg={2} xs={12}>
              {brand.amount}
            </Grid>
            <Grid item lg={3} xs={12}>
              [
                <Button onClick={()=> { delBrand(brand.id) }}>
                  delete
                </Button>
              ]
            </Grid>
          </Grid>
        </Grid>
      )
    })
    setBrands(brandHtml);
  }
  
  useEffect(() => {
    loadBrands();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <Grid container className={classes.root}>
        <Grid item xs={12} lg={12}>
          <h1>Brands</h1>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
              <Grid item lg={12} xs={12}>
                  [
                    <Link href="brands/add">
                      Add Brands
                    </Link>
                  ]
              </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Grid container>
            <Grid item lg={1} xs={12}>

            </Grid>
            <Grid item lg={2} xs={12}>
              name
            </Grid>
            <Grid item lg={3} xs={12}>
              action
            </Grid>
          </Grid>
          <Grid container>
            {
              brands && brands
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