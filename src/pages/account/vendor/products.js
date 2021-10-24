import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import Link from 'next/link'
import { connect } from 'react-redux';
import {
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import VendorLayoutTemplate from 'src/components/common/Layout/VendorLayoutTemplate';
import { noImageUrl } from 'config'; 
import { deleteItem, getItems, getItemByFkId } from 'src/api';
import ProgressBar from 'src/components/common/ProgressBar';
import { getThumbnail } from 'src/utils/helpers/image'

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  image: {
    padding: 8,
  },
  description: {
    padding: 8
  },
  action: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  mobileAction: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    }
  },
  itemTitle: {
    textTransform: 'capitalize',
  },
  itemDescription: {
    '& p': {
      lineHeight: 2,
    }
  },
  item: {
    borderTop: '1px solid rgba(0,0,0, .09)',
    padding: '20px 0px',
  },
  icon: {
    fill: '#000',
    width: 30,
    height: 30,
  },
  deleteIcon: {
    fill: '#000',
    width: 30,
    height: 30,
  },
  mainImage: {
    width: 150,
  },
  importBtn: {
    width: '15%',
    color: 'white',
    '& svg': {
      fill: 'white'
    },
    [theme.breakpoints.down('sm')]: {
      width: '45%',
    }
  },
  addBtn: {
    width: '15%',
    color: 'white',
    '& svg': {
      fill: 'white'
    },
    [theme.breakpoints.down('sm')]: {
      width: '45%',
    }
  },
  addIconBtn: {
    width: 37,
    height: 37,
    fill: '#000',
  },
  importIconBtn: {
    width: 37,
    height: 37,
    fill: '#000',
  },
  buttonItemSub: {
    display: 'flex',
    margin: '20px 0px',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly',
    }
  },
});

const Products = ({classes, userInfo, vendorInfo}) => {

  const [products, setProducts] = useState(null);
  const [section, setSection] = useState({});
  const [itemLink, setItemLink] = useState({})
  const [showData, setShowData] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const PRODUCTS_VENDOR = 'productsvendor';

  const delItem = async(id) => {
    deleteItem(section.url, id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `${section.name} Deleted`,
      })
      loadItems()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: ${section.name} cannot be delete`,
      })
    })
  }

  const loadVendorProducts = async() => {
    try {
      const getItemResult = await getItemByFkId('products', 'productsvendor', vendorInfo.id);
      setProducts(getItemResult);
      setShowData(true);
    } catch(err) {}
  }

  useEffect(() => {
   if (Object.keys(vendorInfo).length) {
    loadVendorProducts();
   }
  }, [vendorInfo])

  return (
    <VendorLayoutTemplate>
      <div className={classes.root}>
        <Grid container>
        {
          showData ? products.length ? products.map((product, index) => {
            let imageUrl = product.productImages && product.productImages.length ? (
              <img src={`${process.env.IMAGE_URL}/${getThumbnail(product.productImages[0])}`} className={`img-fluid`} alt={product.name} />
            ) : (
              <img src={`${noImageUrl.img}`} className={`img-fluid`} alt={noImageUrl.alt} />
            )
            return (
              <Grid key={index} item lg={12} xs={12} className={classes.item}>
                <Grid container>
                  <Grid item lg={2} xs={5} className={classes.image}>
                    { imageUrl }
                  </Grid>
                  <Grid item lg={8} xs={7} className={classes.description}>
                    <p className={classes.itemTitle}>
                      <Link href={`/account/vendor/${product.id}`}>
                        <a>{product.name}</a>
                      </Link>
                    </p>
                    <p className={classes.itemDescription}>{product.description}</p>
                    <Button onClick={()=> { delItem(product.id) }} className={`smallMainButton ${classes.mobileAction}`}>
                      Borrar
                    </Button>
                  </Grid>
                  <Grid item lg={2} xs={12} className={classes.action}>
                    <Button onClick={()=> { delItem(product.id) }} className={`smallMainButton`}>
                      Borrar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )
          }) : (
            <Grid item lg={12} xs={12}>
              No Product Found
            </Grid>
          ) : (
            <ProgressBar />
          )
        }
        </Grid>
      </div>
    </VendorLayoutTemplate>
  );
}
 
Products.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user,
  vendorInfo: state.vendor
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Products));