import React, { useState, useEffect } from 'react';
// import Link from 'next/link'
import * as T from 'prop-types';
import { useRouter } from 'next/router'
import { fade } from '@material-ui/core/styles';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { 
  withStyles, 
  Link,
  Button,
  Grid,
  SwipeableDrawer,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { ADMIN_URL, ADMIN_SECTIONS, SECTIONS } from '@/constants/admin';
import loadMain from '@/redux/reducers'
import { logout } from '@/api/auth';
import Icons from '@/common/Icons';
import Modal from '@/common/Modal';


const styles = (theme) => ({
  root: {
    color: 'white',
    boxShadow: '0px -2px 5px #000',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: '100',
  },
  menuButton: {
    '& svg': {
      fontSize: '1.5em'
    },
  },
  adminTitle: {
    color: 'white',
    fontWeight: 'bold'
  },
  title: {
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  headerContainerInner: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },
  hideMobileOnly: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  },
  headerContainer: {
    color: 'white',
    padding: '6px 10px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      padding: '6px 0px',
    }
  },
  headerItem: {
    width: '15%'
  },
  headerContainerMiddle: {
    display: 'flex',
    alignItems: 'center',
  },
  headerContainerMiddleSub: {
    justifyContent: 'center'
  },
  headerContainerRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  sideMenuRoot: {
    width: 250,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  menuIcon: {
    width: '25px',
  },
  logoSvg: {
    width: '70%',
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
  linkItem: {
    display: 'flex',
    flexDirection: 'row',
  }
})

const Header = ({classes, data, loadMain, userInfo}) => {
  const [openMobile, setOpenMobile] = useState(false);
  const [menuItems, setMenuItems] = useState(null);
  // const [showData, setShowData] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const router = useRouter();
  const handleMobileMenu = () => {
    setOpenMobile(!openMobile);
  }

  useEffect(() => {
     loadMain()
  }, [])
  
  useEffect(() => {
    if (userInfo && userInfo.userRole) {
     // setShowData(true)
      setMenuItems(SECTIONS[userInfo.userRole])
    }
 }, [userInfo])

  const logoutAdmin = () => {
    const resp = logout();
    if (resp) {
      router.push(`/${ADMIN_URL.index}`)
    }
  }

  const renderSideMenu = (
    <SwipeableDrawer
      anchor={'left'}
      open={openMobile}
      onClose={handleMobileMenu}
      onOpen={handleMobileMenu}
    >
      <div className={classes.sideMenuRoot}>
        <List>
          <ListItem className={`${classes.hideMobileOnly}`}>
            <ListItemIcon><Icons name="logout" classes={{icon: classes.menuIcon}} /></ListItemIcon>
            <ListItemText primary={userInfo.first_name} />
          </ListItem>
          <Divider  className={`${classes.hideMobileOnly}`}/>
          {
            menuItems && menuItems.map((section, index) => {
              return (
                <ListItem key={index}>
                  <Link href={`/admin/${ADMIN_SECTIONS[section].url}`} className={classes.linkItem}>
                    <ListItemIcon><Icons name={ADMIN_SECTIONS[section].key} classes={{icon: classes.menuIcon}}/></ListItemIcon>
                    {ADMIN_SECTIONS[section].names}
                  </Link>
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </SwipeableDrawer>
  );

  return (
    <>
    <div className={classes.root}>
      <Grid container className={`${classes.headerContainer} AppBarBackColor`}>
          <Grid item lg={6} xs={12} className={`${classes.headerItem}`}>
            <Grid container className={classes.headerContainerInner}>
              <Grid item lg={1} xs={2}  className={`${classes.menuButton}`}>
                <IconButton onClick={handleMobileMenu} className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item lg={3} xs={10}>
                <a href={`/${ADMIN_URL.index}/${ADMIN_URL.home}`}>
                  <Icons name="logoNameWhite" classes={{icon: classes.logoSvg}} />
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Hidden xsDown>
            <Grid item lg={6} xs={2}>
              <Grid container className={`${classes.headerContainerRight}`}>
                <Grid item>
                  <Button onClick={logoutAdmin} color="inherit">
                    <ExitToAppIcon style={{ fontSize: 40 }} />
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => router.push(`/${ADMIN_URL.index}/${ADMIN_URL.account}`)} color="inherit">
                    <PermIdentityOutlinedIcon style={{ fontSize: 40 }} />
                    <Typography variant="body2" className={classes.adminTitle} color="textSecondary" component="span">{userInfo.first_name}</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
      </Grid>
      {renderSideMenu}
    </div>
    <Modal
      onOpen={openCategory}
      onClose={() => setOpenCategory(false)}
    >
        <Grid container>
         <Grid item>
              Test
         </Grid>
      </Grid>
    </Modal>
    </>
  );
}

Header.protoTypes = {
  classes: T.object,
  data: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props
const mapDispatchToProps = {
  loadMain: loadMain,
} // add redux action to props
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));