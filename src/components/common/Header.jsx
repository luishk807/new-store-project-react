import React, { useState} from 'react';
// import Link from 'next/link'
import T from 'prop-types';
import { fade } from '@material-ui/core/styles';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { 
  AppBar,
  withStyles, 
  Typography,
  Toolbar,
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

import SearchBar from './SearchBar';
import Modal from './Modal';

const styles = (theme) => ({
  root: {
    color: 'red',
  },
  grow: {
    flexGrow: 1,
  },
  horizMenu:{
    '& div': {
      display: 'inline-block',
    }
  },
  title: {
    flexGrow: 1,
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
      <AppBar position="static" className="AppBarBackColor">
        <Toolbar variant="regular">
          <IconButton onClick={handleMobileMenu} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <div className={`${classes.title} d-none d-sm-block`}><Link href="/"><img src="/images/logo-white.png" alt="" /></Link></div>
          <Button onClick={() => setOpenCategory(true)} href="#" color="inherit" className='d-none d-sm-block'>
            <Typography className={classes.title} variant="h6" noWrap>
              category
            </Typography>
          </Button>
          <SearchBar/>
          <div className={classes.grow} />
          <Button href="#" color="inherit"><ShoppingCartOutlinedIcon style={{ fontSize: 40 }} /></Button>
          <Button href="#" color="inherit" className='d-none d-sm-block'><PermIdentityOutlinedIcon style={{ fontSize: 40 }} /></Button>
        </Toolbar>
      </AppBar>
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