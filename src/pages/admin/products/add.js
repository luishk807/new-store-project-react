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
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const [form, setForm] = useState({
    name: null,
    stock: null,
    category: categories[0],
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

  const [errors, setErrors] = useState({
    name: {
      error: false,
      text: '',
    },
    stock: {
      error: false,
      text: '',
    },
    category: {
      error: false,
      text: '',
    },
    amount: {
      error: false,
      text: '',
    },
    email: {
      error: false,
      text: '',
    },
    brand: {
      error: false,
      text: '',
    },
    model: {
      error: false,
      text: '',
    },
    code: {
      error: false,
      text: '',
    },
    description: {
      error: false,
      text: '',
    },
    vendor: {
      error: false,
      text: '',
    },
    image: {
      error: false,
      text: '',
    },
  })
  
  const formOnChange = (e, edrop = null) => {
    const { name, value } = edrop ? edrop : e.target;
    if(name in form && validateForm(name, value)){
      setForm({
        ...form,
        [name]: value,
      });
    }
    console.log(form)
  }

  const handleSubmit = (e) => {
    for(var i in form){
      const error = validateForm(i, form[i]);
      if(!error){
        setSnack({
          severity: 'error',
          open: true,
          text: errors[i].text,
        })
        return;
      }
    }
    setSnack({
      severity: 'success',
      open: true,
      text: 'Product Added',
    })
  }
  const saveErrors = (key, err = false, str = '') => {
    console.log(key, err, ' and ',str)
    setErrors({
      ...errors,
      [key]: {
        error: err,
        text: str,
      }
    });
    console.log(errors)
  }
  const validateForm = (name = null, value = null) => {
    if(name){
      saveErrors(name)
      switch(name){
        case "name":
        case "stock":
        case "model":
        case "amount":
        case "email":
        case "description":
        case "code": {
          if(value && value.length > 0){
            return true
          }else{
            console.log(name, 'anem')
            saveErrors(name, true, `${name} is required`)
            return false;
          }
          break;
        }
        case "category": 
        case "brand": 
        case "vendor": {
          if(value && value.id){
            return true
          }
          return false;
          break;
        }
        default: {
          return false;
        }
      }
    }else{
      console.log("check form ");
    }
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
        <form
          // onSubmit={handleSubmit}
        >
          <Grid container spacing={2} className={classes.formItems}>
            <Grid item lg={12} xs={12}>
              <Typography align="center" variant="h4" component="h4">Add Product</Typography>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField 
                  error={errors.name.error}
                  helperText={errors.name.text} 
                  variant="outlined" 
                  name="name" 
                  onChange={formOnChange}
                  label="Name" 
                />
              </FormControl>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField 
                  error={errors.email.error}
                  helperText={errors.email.text} 
                  variant="outlined" 
                  name="email" 
                  onChange={formOnChange} 
                  label="Email" 
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField 
                  error={errors.stock.error}
                  helperText={errors.stock.text} 
                  variant="outlined" 
                  name="stock" 
                  onChange={formOnChange}
                  label="Stock" 
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <TextField 
                  error={errors.amount.error}
                  helperText={errors.amount.text} 
                  variant="outlined" 
                  name="amount" 
                  onChange={formOnChange}
                  label="Amount" 
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Autocomplete
                  name="category"
                  options={categories}
                  onChange={(e, value) => {
                    formOnChange(null, { name: 'category', value: value})
                  }}
                  getOptionLabel={(option) => option.name}
                  defaultValue={form.category}
                  renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                />
                <FormHelperText name="category">Select your category</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin} variant="outlined">
                <Autocomplete
                  name="brand"
                  options={brands}
                  onChange={(e, value) => {
                    formOnChange(null, { name: 'brand', value: value})
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
                  onChange={(e, value) => {
                    formOnChange(null, { name: 'vendor', value: value})
                  }}
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
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                <Button className={`mainButton`}>Cancel</Button>
              </FormControl>
            </Grid>
            <Grid item lg={6} xs={12} className={classes.formItem}>
              <FormControl fullWidth className={classes.margin}>
                {/* <Button type="submit" className={`mainButton`}>Add Product</Button> */}
                <Button onClick={handleSubmit} className={`mainButton`}>Add Product</Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false})} content={snack.text} />
      </div>
    </AdminLayoutTemplate>
  );
}

Add.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Add);