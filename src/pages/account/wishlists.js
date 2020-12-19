import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { 
  withStyles,
  Grid,
} from '@material-ui/core';

import UserLayoutTemplate from '../../components/common/Layout/UserLayoutTemplate';
import { deleteWishlistByUserId } from '../../api/wishlist';
import { updateCart,addCart } from '../../redux/actions/main';
import { getWishlistByUserId } from '../../api/wishlist';
import { handleFormResponse } from '../../utils/form';
import Snackbar from '../../components/common/Snackbar';
import WishlistBox from '../../components/WishlistBox';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  wishlistContainer: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  wishCard: {
    width: '25%',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  }
});

const Wishlists = ({classes, userInfo, cart, addCart}) => {
  const [showData, setShowData] = useState(false);
  const [wishlists, setWishlists] = useState({});
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const deleteWishlist = async(pid) => {
    const resp = await deleteWishlistByUserId({product: pid});
    if (resp.status) {
      const updateProduct = wishlists.filter(item => item.productId != pid)
      setWishlists(updateProduct);
      let snackRep = handleFormResponse(resp);
      setSnack(snackRep)
    }
  }
  
  const onAddCart = async(product) => {
    const foundIndex = Object.keys(cart).filter(item => cart[item].id == product.id)
    let currQuant = cart[foundIndex] ? cart[foundIndex].quantity + 1 : 1;
    const addProd = {
      ...product,
      'quantity': currQuant
    }
    await addCart(addProd)
    setSnack({
      severity: 'success',
      open: true,
      text: 'Item added to cart',
    })
  }
  
  const loadWishlist = async() => {
    const getWishlist = await getWishlistByUserId();
    setWishlists(getWishlist)
    setShowData(true);
  }

  useEffect(()=>{
    loadWishlist()
  }, [])

  return (
    <UserLayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12} className={classes.wishlistContainer} align="center">
            {
              showData && wishlists.map((wishlist, index) => {
                return (
                  <WishlistBox 
                    key={index}
                    classes={{root: classes.wishCard}}
                    onAddCart={onAddCart} 
                    id={wishlist.wishlistProduct.id} 
                    onDeleteItem={deleteWishlist} 
                  />
                )
              })
            }
          </Grid>
        </Grid>
        <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
      </div>
    </UserLayoutTemplate>
  );
}

Wishlists.protoTypes = {
  classes: T.object
}

const mapStateToProps = state => ({
  userInfo: state.user,
  cart: state.cart
}) // add reducer access to props
const mapDispatchToProps = {
  updateCart: updateCart,
  addCart: addCart
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Wishlists));