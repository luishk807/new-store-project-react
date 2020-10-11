import React, { useState} from 'react';
// import Link from 'next/link'
import * as T from 'prop-types';
import { fade } from '@material-ui/core/styles';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { 
  AppBar,
  withStyles, 
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

import Typography from '../Typography';
import Modal from '../Modal';

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
})

const Header = ({classes, data}) => {
  const [openMobile, setOpenMobile] = useState(false);

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
          {/* <ListItemIcon></ListItemIcon> */}
          <ListItemText primary={"testing"} />
        </ListItem>
        <ListItem>
          {/* <ListItemIcon></ListItemIcon> */}
          <ListItemText primary={"testx"} />
        </ListItem>
      </List>
      <Divider />
      </div>
    </SwipeableDrawer>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className="AppBarBackColor">
        <Toolbar variant="regular">
          <IconButton onClick={handleMobileMenu} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <div className={`${classes.title} d-none d-sm-block`}><Link href="/admin/home"><img src="/images/logo-white.png" alt="" /></Link></div>
          <div className={classes.grow} />
          <Button href="/login" color="inherit" className='d-none d-sm-block'><PermIdentityOutlinedIcon style={{ fontSize: 40 }} /></Button>
        </Toolbar>
      </AppBar>
      {renderSideMenu}
    </div>
  );
}

Header.protoTypes = {
  classes: T.object,
  data: T.object,
}
export default withStyles(styles)(Header);