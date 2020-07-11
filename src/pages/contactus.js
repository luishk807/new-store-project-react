import React, { useMemo } from 'react';
import T from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { fade, makeStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  MenuList, 
  MenuItem,
  Typography,
  Toolbar,
  Hidden,
  Paper,
  Link,
  Menu,
  Button,
  Grid,
  SwipeableDrawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase
} from '@material-ui/core';

const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}))

const ContactUs = ({classes}) => {
  return (
    <>
    <Hidden smUp>
    <h1>only sm</h1>
    </Hidden>
    <h1>only lg</h1>
    </>
  );
}

ContactUs.protoTypes = {
  classes: T.object,
}

export default withWidth()(withStyles(styles)(ContactUs));