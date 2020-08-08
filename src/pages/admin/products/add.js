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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
  // margin: {
  //   margin: theme.spacing(1),
  //   [theme.breakpoints.down('sm')]: {
  //     margin: 0,
  //   },
  // },
  formItems: {
    width: '100%',
    // [theme.breakpoints.down('sm')]: {
    //   width: '100%',
    // },
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
    name: null,
    stock: null,
    category: categories[0].id,
    amount: null,
    email: '',
    brand: brands[0],
    model: null,
    code: null,
    description: null,
    vendor: vendors[0],
    image: {
      values: [],
      open: false,
    }
  })
  
  const formOnChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value === '' ? null : value,
    });
    console.log(form)
  }
  const handleSubmit = (e) => {
    console.log(form)
    setOpenSnack(true)
  }
  const handleClose = () => {
    setForm({
      ...form,
      image: {
        ...form.image,
        open: false,
      }
    })
  }

  const handleSave = (files) => {
    setForm({
      ...form,
      image: {
        ...form.image,
        files: files,
      }
    })
    console.log(form)
  }

  const handleOpen = () => {
    setForm({
      ...form,
      image: {
        ...form.image,
        open: true,
      }
    })
  }


  return (
    <AdminLayoutTemplate>
      <div className={classes.root}>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={errors => console.log(errors)}
        >
          <Grid container spacing={2} className={classes.formItems}>
            <Grid item lg={12} xs={12}>
              <Typography align="center" variant="h4" component="h4">Add Product</Typography>
            </Grid>
            <Grid item lg={12} xs={12}>
              <TextValidator
                  label="Name"
                  onChange={formOnChange}
                  name="name"
                  className={classes.formItems}
                  value={form.name}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
            </Grid>
            <Grid item lg={12} xs={12}>
                <TextValidator
                  label="Email"
                  onChange={formOnChange}
                  className={classes.formItems}
                  name="email"
                  value={form.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                />
            </Grid>
            <Grid item lg={12} xs={12}>
                <TextValidator
                  label="Stock"
                  onChange={formOnChange}
                  className={classes.formItems}
                  name="stock"
                  value={form.stock}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <TextValidator
                  label="Amount"
                  onChange={formOnChange}
                  className={classes.formItems}
                  name="amount"
                  value={form.amount}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
                <TextValidator
                  label="Amount"
                  onChange={formOnChange}
                  className={classes.formItems}
                  name="amount"
                  select
                  value={form.amount}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
            </Grid>
           {/*  <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Autocomplete
                  name="brand"
                  options={brands}
                  onChange={(e, value) => {
                    form.brand.value = value
                    console.log("hey",form)
                  }}
                  getOptionLabel={(option) => option.name}
                  defaultValue={form.brand}
                  renderInput={(params) => <TextField {...params} label="Brand" variant="outlined" />}
                />
                <FormHelperText name="brand">Select your brand</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField helperText="Type the product model" variant="outlined" name="model" label="Model"  />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField helperText="Type product sku code" variant="outlined" name="code" label="Sku Code"  />
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <Autocomplete
                  name="vendor"
                  options={vendors}
                  onChange={formOnChange}
                  getOptionLabel={(option) => option.name}
                  defaultValue={form.vendor}
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
            </Grid> */}
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <Button className={`mainButton`}>Cancel</Button>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <Button type="submit" className={`mainButton`}>Add Product</Button>
              </FormControl>
            </Grid>
          </Grid>
        </ValidatorForm>
        <Snackbar open={openSnack} onClose={() => setOpenSnack(false)} content="Product Added" />
      </div>
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);