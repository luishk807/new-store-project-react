import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
  Button
} from '@material-ui/core';

import Icons from './Icons';
import Snackbar from './Snackbar';
import { saveWishlist } from '../../api/wishlist';
import { handleFormResponse } from '../../utils/form';
import { verifyCookie } from '../../utils/cookie';

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
  const cookie = verifyCookie();
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const onWishlistClick = async() => {
    const cookie = verifyCookie();
    if (!cookie) {
      router.push("/login")
    }  else {
      const icon = wishlistIcon == "heart1" ? "heart2" : "heart1";
      const resp = await saveWishlist({product: pid});
      handleFormResponse(resp.data)
    }
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