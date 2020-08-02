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
import { 
  MuiAlert,
  Autocomplete,
} from '@material-ui/lab';
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
  const categories = CategorySample;
  const brands = BrandsSample;
  const vendors = VendorSample;
  const [openSnack, setOpenSnack] = useState(false);
  const [form, setForm] = useState({
    name: {
      value: '',
      error:false,
    },
    stock: {
      value: '',
      error: false,
    },
    category: {
      value: categories[0].id,
      error: false,
    },
    amount: {
      value: '',
      error: false,
    },
    brand: {
      value: brands[0],
      error: false,
    },
    model: {
      value: '',
      error: false,
    },
    code: {
      value: '',
      error: false,
    },
    description: {
      value: '',
      error: false,
    },
    vendor: {
      value: vendors[0],
      error: false,
    },
    image: {
      values: [],
      open: false,
    }
  })
  
  const formOnChange = (e) => {
    if(form[e.target.name]){
      form[e.target.name].value = e.target.value;
      console.log(form)
    }
  }
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
                <TextField onChange={formOnChange} error={form.name.error} helperText="Product Name" variant="outlined" name="name" label="Product Name"  />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <TextField error={form.stock.error} onChange={formOnChange} helperText="Stock" variant="outlined" name="stock" label="Stock"  />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <OutlinedInput
                  name="amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  labelWidth={60}
                  onChange={formOnChange}
                  error={form.amount.error}
                />
                <FormHelperText name="amount">Amount</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined" >
                <InputLabel name="category">Category</InputLabel>
                <Select
                  labelname="category"
                  name="category"
                  value={form.category.value}
                  label="category"
                  error={form.category.error}
                  onChange={formOnChange}
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
                <FormHelperText name="category">Select Category</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Autocomplete
                  name="brand"
                  options={brands}
                  onChange={(e, value) => {
                    form.brand.value = value
                    console.log("hey",form)
                  }}
                  getOptionLabel={(option) => option.name}
                  defaultValue={form.brand.value}
                  renderInput={(params) => <TextField {...params} label="Brand" variant="outlined" />}
                />
                <FormHelperText name="brand">Select your brand</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField error={form.model.error} helperText="Type the product model" variant="outlined" name="model" label="Model"  />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField error={form.code.error} helperText="Type product sku code" variant="outlined" name="code" label="Sku Code"  />
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <Autocomplete
                  name="vendor"
                  options={vendors}
                  onChange={formOnChange}
                  getOptionLabel={(option) => option.name}
                  defaultValue={form.vendor.value}
                  renderInput={(params) => <TextField {...params} label="Vendor" variant="outlined" />}
                />
                <FormHelperText name="vendor">Select your vendor</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <TextareaAutosize name="description" rowsMin={3} placeholder="Description" />
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <Button className={`secondButton`} onClick={handleOpen.bind(this)}>Upload Image</Button>
                <DropzoneDialog
                  open={form.image.open}
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