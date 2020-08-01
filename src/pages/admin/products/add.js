import React, { useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  FormControl,
  InputLabel, 
  Input, 
  FormHelperText,
  Button,  
  OutlinedInput, 
  InputAdornment,
  TextareaAutosize
} from '@material-ui/core';
import {DropzoneDialog} from 'material-ui-dropzone'

import Typography from '../../../components/common/Typography';
import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
  formItems: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    margin: '20px auto 0px auto',
  },
});

const Add = ({classes}) => {
  const [file, setFiles] = useState({
    open: false,
    files: []
  });

  const handleClose = () => {
    setFiles({
      ...file,
      open: false
    });
  }

  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    setFiles({
      files: files,
      open: false
    });
    console.log(file)
  }

  const handleOpen = () => {
    setFiles({
      ...file,
      open: true,
    });
  }

  return (
    <AdminLayoutTemplate>
      <div className={classes.root}>
        <form  noValidate autoComplete="off">
          <Grid container spacing={2} className={classes.formItems}>
            <Grid item lg={12} xs={12}>
              <Typography align="center" variant="h4" component="h4">Add Product</Typography>
            </Grid>
            <Grid item lg={12} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="name">Product Name</InputLabel>
                <Input id="name" aria-describedby="name-label"  />
                <FormHelperText id="name-label">Type the product name</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="stock">Stock</InputLabel>
                <Input id="stock"  />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <Input
                  id="amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="email">Category</InputLabel>
                <Input id="email" aria-describedby="email-label" />
                <FormHelperText id="email-label">Type your email</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="email">Color</InputLabel>
                <Input id="email" aria-describedby="email-label" />
                <FormHelperText id="email-label">Type your email</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="email">Size</InputLabel>
                <Input id="email" aria-describedby="email-label" />
                <FormHelperText id="email-label">Type your email</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="email">Brand</InputLabel>
                <Input id="email" aria-describedby="email-label" />
                <FormHelperText id="email-label">Type your email</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="email">Category</InputLabel>
                <Input id="email" aria-describedby="email-label" />
                <FormHelperText id="email-label">Type your email</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="model">Model</InputLabel>
                <Input id="model" aria-describedby="model-label" />
                <FormHelperText id="model-label">Type the product model</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="code">Code</InputLabel>
                <Input id="code" aria-describedby="code-label" />
                <FormHelperText id="code-label">Type product sku code</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="email">Vendor</InputLabel>
                <Input id="email" aria-describedby="email-label" />
                <FormHelperText id="email-label">Type your email</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <TextareaAutosize id="description" aria-describedby="email-label"  rowsMin={3} placeholder="Description" />
                <FormHelperText id="email-label">Description</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} item>
              <Button className={`secondButton`} onClick={handleOpen.bind(this)}>Upload Image</Button>
              <DropzoneDialog
                open={file.open}
                onSave={handleSave.bind(this)}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleClose.bind(this)}
              />
            </Grid>
            <Grid item lg={6} xs={12} item>
              <Button className={`mainButton`}>Cancel</Button>
            </Grid>
            <Grid item lg={6} xs={12} item>
              <Button className={`mainButton`}>Add Product</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);