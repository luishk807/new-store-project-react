import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  Grid,
  Button,
  Link,
} from '@material-ui/core';

import { updateCart,addCart } from '../redux/actions/main';
import { getProductById } from '../api/products';
import Icons from './common/Icons';
import { getImageUrlByType } from '../utils/form';

const styles = (theme) => ({
  root: {
    width: '100%'
  },
  closeButton: {
    padding: 0,
    '& span': {
      display: 'inline-block'
    }
  },
  closeIcon: {
    width: 25,
    height: 25,
    fill: '#ccc',
  },
  itemContainer: {
    border: '1px solid #ccc',
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  itemContentContainer: {
    padding: 20,
  }
});

const WishlistBox = ({classes, id, userInfo, onDeleteItem, onAddCart}) => {
  const [showData, setShowData] = useState(false);
  const [product, setProduct] = useState([]);

  const prodImage = getImageUrlByType();

  const loadProduct = async(id) => {
    const getProduct = await getProductById(id);
    setProduct(getProduct)
    setShowData(true);
  }

  useEffect(()=>{
    loadProduct(id)
  }, [showData])

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12} key={product.id} className={classes.itemContainer}>
          <Grid container>
            <Grid item lg={12} align="right">
              <Link  href="#" onClick={()=>onDeleteItem(product.id)}  className={classes.closeButton}>
                <Icons name="close" classes={{icon: classes.closeIcon}} />
              </Link>
            </Grid>
            <Grid item lg={12} className={classes.itemContentContainer}>
              <Grid container>
                <Grid item lg={12}>
                  <img src={`${prodImage}/${product.productImages[0].img_url}`}  className={`img-fluid`} />
                </Grid>
                <Grid item lg={12}>
                  {
                    product.name
                  }
                </Grid>
                <Grid item lg={12}>
                  <Button onClick={()=>onAddCart(product)} className={`mainButton`}>Add Cart</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

WishlistBox.protoTypes = {
  classes: T.object,
  id: T.object,
  onAddCart: T.func,
  onDeleteItem: T.func,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

const mapDispatchToProps = {
  updateCart: updateCart,
  addCart: addCart
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(WishlistBox));