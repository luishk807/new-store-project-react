import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  IconButton,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { logout } from '@/api/auth';

const styles = (theme) => ({})

const DotMenu = ({classes, options}) => {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (val) => {
    setAnchorEl(null);
    if (options[val.currentTarget.id]) {
      let option = options[val.currentTarget.id];
      if (option.url === "logout") {
        logout();
        window.location.href = "/";
      } else {
        window.location.href = option.url;
      }
    }
  };

  return options && (
    <>
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
        {options.map((option, index) => (
          <MenuItem key={index} id={index} selected={index === 0} onClick={handleClose}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
   );
}
 
DotMenu.protoTypes = {
  classes: T.object,
  options: T.array.isRequired,
}

export default withStyles(styles)(DotMenu);