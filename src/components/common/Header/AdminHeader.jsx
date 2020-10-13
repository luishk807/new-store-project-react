import React, { useState} from 'react';
// import Link from 'next/link'
import * as T from 'prop-types';
import { fade } from '@material-ui/core/styles';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { 
  withStyles, 
  Link,
  Button,
  Grid,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Icon from '../../../components/common/Icons';
import Modal from '../Modal';
import { verifyCookie } from '../../../utils/cookie';


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
      padding: '6px 0px',
    }
  },
  headerContainerLeft: {
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
})

const Header = ({classes, data}) => {
  const [openMobile, setOpenMobile] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const handleMobileMenu = () => {
    setOpenMobile(!openMobile);
  }

  const logout = () => {
    cookieCutter.set('authorization', '', { expires: new Date(0) })

    console.log("cookie", cookieCutter.get('authorization'))
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
        <ListItem>
          <ListItemIcon><ShoppingCartOutlinedIcon/></ListItemIcon>
          <ListItemText primary={"testing"} />
        </ListItem>
        <ListItem>
          <ListItemIcon><ShoppingCartOutlinedIcon/></ListItemIcon>
          <ListItemText primary={"testx"} />
        </ListItem>
      </List>
      <Divider />
      </div>
    </SwipeableDrawer>
  );

  return (
    <>
    <div className={classes.root}>
      <Grid container className={`${classes.headerContainer} AppBarBackColor`}>
          <Grid item lg={6} xs={10} className={`${classes.headerContainerLeft}`}>
            <Grid container>
              <Grid item lg={2} xs={2}  className={`${classes.menuButton}`}>
              <IconButton onClick={handleMobileMenu} className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              </Grid>
              <Grid item lg={2} xs={6}>
                <Link href="/admin/home">
                  <img className={classes.logo} src="/images/logo-white.svg" alt="" />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6} xs={2}>
            <Grid container className={`${classes.headerContainerRight}`}>
              <Grid item>
                <Button onClick={logout} color="inherit">
                  <PermIdentityOutlinedIcon style={{ fontSize: 40 }} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
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
export default withStyles(styles)(Header);