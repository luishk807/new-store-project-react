import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { alpha } from '@material-ui/core/styles';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { 
  withStyles, 
  Link,
  Button,
  Grid,
} from '@material-ui/core';
import Icon from '@/common/Icons';
import { getCartTotalItems } from 'src/utils';
import Typography from '@/common/Typography';
import loadMain from '@/redux/reducers'
import { isLoggedIn } from '@/utils/auth';
import SearchBar from '@/src/components/common/SearchBar';
import { useRouter } from 'next/router'
import Locale from '@/common/Header/Locale';

const styles = (theme) => ({
  root: {
    color: 'white',
    boxShadow: '0px -2px 5px #000',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: '100',
  },
  mainLogo: {
    width: 180,
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      width: 145,
    }
  },
  menuButton: {
    '& svg': {
      fontSize: '1.5em'
    },
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  title: {
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  headerContainer: {
    color: 'white',
    padding: '6px 10px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      padding: 0,
    }
  },
  headerContainerLeft: {
    width: '15%'
  },
  headerContainerMiddle: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    verticaAlign: 'middle',
    padding: 5,
    display: 'inline',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  headerContainerMiddleSub: {
    justifyContent: 'center'
  },
  headerContainerRightin: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& div': {
      textAlign: 'center'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  cartBtn: {
    position: 'relative'
  },
  cartIcon: {
    width: 40,
    height: 40,
    fill: 'white',
    [theme.breakpoints.down('sm')]: {
      fill: 'black'
    }
  },
  cartTotal: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 15,
    top: 0,
    right: 5,
    border: '.2em solid white',
    minHeight: 9,
    minWidth: 25,
    textAlign: 'center',
  },
  cartTotalNumber: {
    fontFamily: 'Arial',
    fontSize: '0.8em',
    color: 'white',
    textAlign: 'center',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountIcon: {
    width: 40,
    height: 40,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
  localeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Header = ({classes, data, userInfo, loadMain, cart}) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const router = useRouter()

  useEffect(() => {
    if (Object.keys(cart).length) {
      setCartData(Object.values(cart));
      const total = getCartTotalItems(Object.values(cart));
      setCartTotal(total);
    }
  }, [cart]);

  useEffect(() => {
    if (isLoggedIn()) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }

    loadMain()
  }, []);
  
  return (
    <>
    <div className={classes.root}>
      <Grid container className={`${classes.headerContainer} AppBarBackColor`}>
          <Grid item lg={3} xs={2} className={`${classes.headerContainerLeft}`}>
            <Button href="/"  className={`${classes.menuButton}`}>
              <Icon name="logo" />
            </Button>
            <Link href="/" className={classes.mainLogo}>
              <img className={`img-fluid`} src="/images/logo-white.svg" alt="" />
            </Link>
          </Grid>
          <Grid item lg={7} xs={8} className={`${classes.headerContainerMiddle}`}>
            <Grid container className={classes.headerContainerMiddleSub}>
              <Grid item lg={12} xs={12}>
                <SearchBar/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} xs={2} align="right">
            <Grid container className={classes.headerContainerRightin}>
              <Grid item lg={4} md={2} xs={4}>
                <Button href="/cart" color="inherit" className={classes.cartBtn}>
                  <ShoppingCartIcon className={classes.cartIcon} />
                  {
                    Object.keys(cart).length > 0 && (
                      <div className={classes.cartTotal}>
                        <Typography className={classes.cartTotalNumber} variant="subtitle1">
                          {cartTotal}
                        </Typography>
                      </div>
                    )
                  }
                </Button>
              </Grid>
              <Grid item lg={5} md={8} xs={4}>
                <Button href="/account" color="inherit" className='d-none d-sm-block'>
                  <PermIdentityIcon className={classes.accountIcon} />
                  {
                    isUserLoggedIn && (
                      <Typography className={classes.userName} variant="subtitle2">{userInfo.first_name}</Typography>
                    )
                  }
                </Button>
              </Grid>
              <Grid item lg={3} md={2} xs={4} className={classes.localeItem}>
                <Locale className="d-none d-sm-block" />
              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </div>
    </>
  );
}

Header.protoTypes = {
  classes: T.object,
  data: T.object,
}
const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.user,
    cart: state.cart
  }
}
const mapDispatchToProps = {
  loadMain: loadMain,
} // add redux action to props
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));