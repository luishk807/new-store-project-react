import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import {
  withStyles,
  Button,
  requirePropFactory
} from '@material-ui/core';

import Icons from './Icons';
import Snackbar from './Snackbar';
import { saveWishlist, getWishlistByUserId, deleteWishlistByUserId } from '../../api/wishlist';
import { handleFormResponse } from '../../utils/form';
import { verifyCookie } from '../../utils/cookie';
import { WISHLIST_ICON  } from '../../constants/product';

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
  const [pid, setPid] = useState(null);
  const [wishlistIcon, setWishlistIcon] = useState(WISHLIST_ICON.not_saved);
  const [isSaved, setIsSaved] = useState(false);
  const [cookie, setCookie] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const returnIcon = () => {
    return wishlistIcon == WISHLIST_ICON.not_saved ? WISHLIST_ICON.saved : WISHLIST_ICON.not_saved;
  }
  const onWishlistClick = async() => {
    let snackRep = null;
    if (!cookie) {
      router.push("/login")
    }  else {
      const icon = returnIcon();
      let resp = null;
      if (wishlistIcon == WISHLIST_ICON.saved) {
        resp = await deleteWishlistByUserId({product: pid});
        if (resp.status) {
          setIsSaved(false)
          setWishlistIcon(icon)
        }
        snackRep = handleFormResponse(resp);
      } else {
        resp = await saveWishlist({product: pid});
        if (resp.data.status) {
          setIsSaved(true)
          setWishlistIcon(icon)
        }
        snackRep = handleFormResponse(resp.data);
      }
      setSnack(snackRep);
    }
  }

  const checkWishlist = async() => {
    if (cookie) {
      const resp = await getWishlistByUserId({ product: product})
      if (resp) {
        setIsSaved(true);
        const icon = returnIcon();
        setWishlistIcon(WISHLIST_ICON.saved)
      }
    }
  }

  useEffect(() => {
    let getCookie = verifyCookie();
    setCookie(getCookie);
    setPid(product)
    checkWishlist()
  }, [wishlistIcon])

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