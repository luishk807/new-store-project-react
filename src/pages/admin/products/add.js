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
  TextField,
  TextareaAutosize
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {DropzoneDialog} from 'material-ui-dropzone'
import ColorPicker from 'material-ui-color-picker'

import Snackbar from '../../../components/common/Snackbar';
import { CategorySample } from '../../../constants/admin/categories/CategorySample';
import { BrandsSample } from '../../../constants/admin/brands/BrandsSample';
import { VendorSample } from '../../../constants/admin/vendors/VendorSample';
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
  colorInput: {
    marginTop: 18,
    [theme.breakpoints.down('sm')]: {
      marginTop: 'auto',
    },
  },
});

const Add = ({classes}) => {
  const [category, setCategory] = useState(CategorySample[0].id);
  const [brand, setBrand] = useState(BrandsSample[0].id);
  const [vendor, setVendor] = useState(VendorSample[0].id);
  const [formErrors, setFormErrors] = useState({
    name: false,
    stock: false,
    category: false,
    amount: false,
    brand: false,
    model: false,
    code: false,
    description: false,
  })
  const [openSnack, setOpenSnack] = useState(false);
  const categories = CategorySample; 
  const brands = BrandsSample;
  const vendors = VendorSample;

  const [file, setFiles] = useState({
    open: false,
    files: []
  });
  
  const handleSubmit = (e) => {
    console.log(e)
    setOpenSnack(true)
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


  return (
    <AdminLayoutTemplate>
      <div className={classes.root}>
        <form  noValidate autoComplete="off">
          <Grid container spacing={2} className={classes.formItems}>
            <Grid item lg={12} xs={12}>
              <Typography align="center" variant="h4" component="h4">Add Product</Typography>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <TextField error={formErrors.name} helperText="Product Name" variant="outlined" id="name" label="Product Name"  />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <TextField error={formErrors.stock} helperText="Stock" variant="outlined" id="stock" label="Stock"  />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <OutlinedInput
                  id="amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  labelWidth={60}
                  error={formErrors.amount}
                />
                <FormHelperText id="amount">Amount</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined" >
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  value={category}
                  label="category"
                  error={formErrors.category}
                  onChange={(event) => setCategory(event.target.value)}
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
                <FormHelperText id="category">Select Category</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel id="brand">Brands</InputLabel>
                <Select
                  labelId="brand"
                  id="brand"
                  value={brand}
                  label="brands"
                  error={formErrors.brand}
                  onChange={(event) => setBrand(event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    brands.map((item, index) => {
                      return(<MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
                    })
                  }
                </Select>
                <FormHelperText id="brand">Select your brand</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField error={formErrors.model} helperText="Type the product model" variant="outlined" id="model" label="Model"  />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField error={formErrors.code} helperText="Type product sku code" variant="outlined" id="code" label="Sku Code"  />
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                  <InputLabel id="vendor">Vendors</InputLabel>
                  <Select
                    labelId="vendor"
                    id="vendor"
                    value={vendor}
                    label="vendors"
                    error={formErrors.vendor}
                    onChange={(event) => setVendor(event.target.value)}
                  >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    vendors.map((item, index) => {
                      return(<MenuItem key={index} value={item.id}>{item.name}</MenuItem>)
                    })
                  }
                </Select>
                <FormHelperText id="vendor">Select your vendor</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <TextareaAutosize id="description" rowsMin={3} placeholder="Description" />
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <Button className={`secondButton`} onClick={handleOpen.bind(this)}>Upload Image</Button>
                <DropzoneDialog
                  open={file.open}
                  onSave={handleSave.bind(this)}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={handleClose.bind(this)}
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <Button className={`mainButton`}>Cancel</Button>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <Button className={`mainButton`} onClick={handleSubmit}>Add Product</Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={openSnack} onClose={() => setOpenSnack(false)} content="Product Added" />
      </div>
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);