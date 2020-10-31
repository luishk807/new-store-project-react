import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import { decodeCookie } from '../../utils/cookie';
import UserLayoutTemplate from '../../components/common/Layout/UserLayoutTemplate';
import { getImageUrlByType } from '../../utils/form';
import { getWishlistByUserId } from '../../api/wishlist';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
});

const Wishlists = ({classes, userInfo}) => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [showData, setShowData] = useState(false);
  const [wishlists, setWishlists] = useState({});
  const id = router.query.id;
  const prodImage = getImageUrlByType();

  const loadWishlist = async() => {
    const getWishlist = await getWishlistByUserId();
    console.log("wishlist ", getWishlist)
    setWishlists(getWishlist);
    setShowData(true);
  }

  useEffect(()=>{
    loadWishlist()
  }, [])

  return (
    <UserLayoutTemplate>
      <div className={classes.root}>
      {
        showData && wishlists.map((wishlist, index) => {
          return (
          <Grid container key={index}>
            <Grid item>
              <Grid container>
                <Grid item>
                  {/* <img src={`${prodImage}/${}`}  className={`img-fluid`} /> */}
                </Grid>
                <Grid item>
                  {
                    wishlist.wishlistProduct.name
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>   
        )})
      }
      </div>
    </UserLayoutTemplate>
  );
}

Wishlists.protoTypes = {
  classes: T.object
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Wishlists));