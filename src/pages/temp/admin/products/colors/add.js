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
  Select, 
  InputAdornment,
  MenuItem,
  TextareaAutosize
} from '@material-ui/core';
import {DropzoneDialog} from 'material-ui-dropzone'
import ColorPicker from 'material-ui-color-picker'

import { ProductGallerySample } from '../../../../constants/samples/ProductCategoryIconsSample';
import Typography from '../../../../components/common/Typography';
import AdminLayoutTemplate from '../../../../components/common/Layout/AdminLayoutTemplate';

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
  colorInput: {
    marginTop: 18,
    [theme.breakpoints.down('sm')]: {
      marginTop: 'auto',
    },
  },
});

const Add = ({classes}) => {
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('#FFF');
  const categories = ProductGallerySample; 

  const [file, setFiles] = useState({
    open: false,
    files: []
  });

  const onChangeColor = (color) => {
    console.log(color);
    if (color) {
      setColor(color)
    }
  }
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
  }

  const handleOpen = () => {
    setFiles({
      ...file,
      open: true,
    });
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

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
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category-helper"
                  value={category}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    categories.map((item, index) => {
                      return(<MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
                    })
                  }
                </Select>
                <FormHelperText>Select Category</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={3} xs={12} item>
              <FormControl fullWidth className={classes.margin}>
                <ColorPicker
                    style={{backgroundColor: color, border: '1px solid #ccc'}}
                    name='color'
                    defaultValue={color}
                    // value={color}
                    onChange={onChangeColor}
                    className={classes.colorInput}
                  />
                  <FormHelperText id="color-label">Choose color</FormHelperText> 
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} item>
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