import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const DialogModal = ({classes, content, actionLabels, open,  onClick, title}) => {
  //const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //  // setOpen(true);
  // };

  const handleClose = (e) => {
   // setOpen(false);
   onClick(e)
  };
  return ( 
    <div className={classes.root}>
      <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { content }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            {actionLabels.false}
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            {actionLabels.true}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
   );
}
 
DialogModal.protoTypes = {
  classes: T.object,
  content: T.string,
  actionLabels: T.object,
  onClick: T.func.isRequired,
  open: T.bool,
  title: T.string
}

export default withStyles(styles)(DialogModal);