import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const ITEM_HEIGHT = 48;

const MobileMenu = ({classes, options, onChange}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    onChange(e)
  };

  return ( 
    <div className={classes.root}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.name} onClick={(e) => handleClose(option.value)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
   );
}
 
MobileMenu.protoTypes = {
  classes: T.object,
  options: T.array,
  onChange: T.func
}

export default withStyles(styles)(MobileMenu);