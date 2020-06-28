import React, {forwardRef, useState} from 'react';
// import Link from 'next/link'
import T from 'prop-types';
import { 
  PermIdentityIcon,
  ShoppingCartIcon,
} from '@material-ui/icons';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { 
  AppBar,
  withStyles, 
  MenuList, 
  MenuItem,
  Typography,
  Toolbar,
  Paper,
  Link,
  Menu,
  Button,
  Grid,
  Hidden,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
  root: {
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
  }
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
    <div className={classes.root}>
      <AppBar position="static" className="AppBarBackColor">
        <Toolbar variant="regular">
          <IconButton onClick={handleMobileMenu} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <div className={classes.title}><Link href="/"><img src="/images/logo-white.png" alt="" /></Link></div>
          <Button href="#" color="inherit"><ShoppingCartOutlinedIcon style={{ fontSize: 40 }} /></Button>
          <Button href="#" color="inherit"><PermIdentityOutlinedIcon style={{ fontSize: 40 }} /></Button>
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