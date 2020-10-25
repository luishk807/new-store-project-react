import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
  Button
} from '@material-ui/core';
import Icons from './Icons';
import { saveWishlist } from '../../api/wishlist';
import Snackbar from './Snackbar';

const styles = (theme) => ({
  wishlistIcon: {
    width: 40,
    height: 40,
  },
  infoRowContent: {
    margin: '20px 0px',
    display: 'flex',
    alignItems: 'center',
  },
});

const WishListIcon = ({classes, product, onMouseOver, onClick}) => {
  const router = useRouter();
  const [wishlistIcon, setWishlistIcon] = useState('heart1');
  const pid = product;
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const onWishlistClick = async() => {
    const icon = wishlistIcon == "heart1" ? "heart2" : "heart1";
    saveWishlist({product: pid}).then((resp) => {
      let saveResult = null;
      const res = resp.data;
      if (res.data) {
        setSnack({
          severity: 'success',
          open: true,
          text: `Wishlist Added`,
        })
        setWishlistIcon(icon);
      } else {
        setSnack({
          severity: 'error',
          open: true,
          text: `Wishlist error! ${res.message}`,
        })
      }
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `Wishlist error! ${err.response.data.message}`,
      })
    })
  }

  return (
    <>
    <Button onClick={onWishlistClick} className={`iconBtnSimple`}>
        <Icons name={wishlistIcon}  classes={{icon: classes.wishlistIcon }} />
    </Button>
    <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
    </>
  )
}
WishListIcon.protoTypes = {
  classes: T.object,
  onClick: T.func,
  product: T.number,
  onMouseOver: T.func
} 
export default withStyles(styles)(WishListIcon);