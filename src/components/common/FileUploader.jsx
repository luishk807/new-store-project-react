import React, { useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button, 
  FormControl,
} from '@material-ui/core';

import { DropzoneDialog } from 'material-ui-dropzone'

const styles = (theme) => ({
  root: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  formItems: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    margin: '20px auto 0px auto',
  },
});

const FileUploader = ({classes={}, onSave, files}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  
  const handleSave = (files) => {
    onSave(files);
    setOpen(false);
  }

  return (
    <FormControl fullWidth className={classes.root}>
      <Button className={`secondButton`} onClick={handleOpen.bind(this)}>Upload Image</Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave.bind(this)}
        acceptedFiles={['image/jpeg', 'image/png']}
        showPreviews={true}
        maxFileSize={2000000}
        files={files}
        onClose={handleClose.bind(this)}
      />
    </FormControl>
  );
}
 
FileUploader.protoType = {
  classes: T.object,
  onSave: T.func,
  files: T.array,
}

export default withStyles(styles)(FileUploader);