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
    // margin: theme.spacing(1),
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

const FileUploader = ({classes={}, onSave, files, fileLimit, buttonText='Upload Image', acceptedMimeTypes=['image/jpeg', 'image/png']}) => {
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
      <Button className={`secondButton`} onClick={handleOpen.bind(this)}>{buttonText}</Button>
      { 
        fileLimit ? (
          <DropzoneDialog
            open={open}
            onSave={handleSave.bind(this)}
            acceptedFiles={acceptedMimeTypes}
            showPreviews={true}
            filesLimit={1}
            maxFileSize={2000000}
            files={files}
            onClose={handleClose.bind(this)}
          />
        ) : (
          <DropzoneDialog
            open={open}
            onSave={handleSave.bind(this)}
            acceptedFiles={acceptedMimeTypes}
            showPreviews={true}
            maxFileSize={2000000}
            files={files}
            onClose={handleClose.bind(this)}
          />
        )
      }
    </FormControl>
  );
}
 
FileUploader.protoType = {
  classes: T.object,
  fileLimit: T.bool,
  onSave: T.func,
  files: T.array,
  fileBtnText: T.string,
  fileAcceptedMimeTypes: T.array
}

export default withStyles(styles)(FileUploader);