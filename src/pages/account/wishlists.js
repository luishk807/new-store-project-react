import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import UserLayoutTemplate from 'src/components/common/Layout/UserLayoutTemplate';
import { deleteWishlistByUserId } from 'src/api/wishlist';
import { updateCart,addCart } from 'src/redux/actions/main';
import { getWishlistByUserId } from 'src/api/wishlist';
import { handleFormResponse } from 'src/utils/form';
import Icons from 'src/components/common/Icons';
import Snackbar from 'src/components/common/Snackbar';
import WishlistBox from 'src/components/WishlistBox';
import ProgressBar from 'src/components/common/ProgressBar';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  icon: {
    width: 30,
    height: 30
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
  },
  backBtnContainer: {
    margin: 10
  },
  empty: {
    margin: '15px auto'
  },
  emptyTitle: {
    fontSize: '1.5em',
  },
  linkP: {
    margin: '10px auto'
  },
  emptyLink: {
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

const Wishlists = ({classes, userInfo, cart, addCart}) => {
  const [showData, setShowData] = useState(false);
  const [wishlists, setWishlists] = useState({});
  const [showEmpty, setShowEmpty] = useState(false);
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
  }

  useEffect(() => {
    setShowData(true);
  }, [wishlists]);

  useEffect(()=>{
    loadWishlist()
  }, []);

  return (
    <UserLayoutTemplate>
      <div className={classes.root}>
        <Grid container>
          <Grid item className={classes.backBtnContainer}>
            <Button href="/account">
              <Icons name="backArrow" classes={{icon: classes.icon}} />&nbsp;Return
            </Button>
          </Grid>
          <Grid item lg={12} xs={12} className={classes.wishlistContainer} align="center">
            {
              showData ? !wishlists.length ? (
                <div className={classes.empty}>
                  <span className={classes.emptyTitle}>Tu lista de deseos esta vacio</span>
                  <p className={classes.linkP}><a href='/account' className={classes.emptyLink}>Regresar a pagina anterior</a></p>
                </div>
              ) : wishlists.map((wishlist, index) => {
                return (
                  <WishlistBox 
                    key={index}
                    classes={{root: classes.wishCard}}
                    onAddCart={onAddCart} 
                    id={wishlist.wishlistProduct.id} 
                    onDeleteItem={deleteWishlist} 
                  />
                )
              }) : (
                <ProgressBar />
              )
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