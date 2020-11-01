import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { 
  withStyles,
  Grid,
  Button,
  Link,
} from '@material-ui/core';

import { decodeCookie } from '../../utils/cookie';
import UserLayoutTemplate from '../../components/common/Layout/UserLayoutTemplate';
import { getImageUrlByType } from '../../utils/form';
import { getWishlistByUserId } from '../../api/wishlist';
import CardIcon from '../../components/common/CardIcon';
import Icons from '../../components/common/Icons';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  closeButton: {
    padding: 0,
    // textAlign: 'right',
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
        <Grid container>
          <Grid item lg={8} align="center">
            {
              showData && wishlists.map((wishlist, index) => {
                return (
                <Grid container key={index}>
                  <Grid item lg={4}  className={classes.itemContainer}>
                    <Grid container>
                      <Grid item lg={12} align="right">
                        <Link  href="/" className={classes.closeButton}>
                          <Icons name="close" classes={{icon: classes.closeIcon}} />
                        </Link>
                      </Grid>
                      <Grid item lg={12} className={classes.itemContentContainer}>
                        <Grid container>
                          <Grid item lg={12}>
                            <img src={`${prodImage}/54682906-4470-4e37-b15c-0706b3605ebb.jpg`}  className={`img-fluid`} />
                          </Grid>
                          <Grid item lg={12}>
                            {
                              wishlist.wishlistProduct.name
                            }
                          </Grid>
                          <Grid item lg={12}>
                            <Button className={`mainButton`}>Add Cart</Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>   
              )})
            }
          </Grid>
        </Grid>
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