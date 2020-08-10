import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Link,
  Grid,
  Button,  
  TextField,
  FormControl,
  makeStyles,
  FormHelperText,
  TextareaAutosize,
} from '@material-ui/core';
import { 
  MuiAlert,
  Autocomplete,
} from '@material-ui/lab';

import FileUploader from './FileUploader';
import { CategorySample } from '../../constants/admin/categories/CategorySample';
import { BrandsSample } from '../../constants/admin/brands/BrandsSample';
import { VendorSample } from '../../constants/admin/vendors/VendorSample';
import { FORM_SCHEMA } from '../../config';
import Typography from './Typography';
import Snackbar from './Snackbar';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
  typography: {

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

const Form = ({
  type,
  classes, 
  title, 
  errors, 
  onChange: 
  formOnChange, 
  fields,
  snack,
  fileOnSave,
  formSubmit: handleSubmit,
  formCancel: handleCancel,
  onCloseSnack,
}) => {
  const formOptions = {
    vendor: VendorSample,
    brand: BrandsSample,
    category: CategorySample
  }
  const [formTitle, setFormTitle] = useState('');
  const [formBtnTitle, setFormBtnTitle] = useState('');
  
  const formFields = Object.keys(fields).map((field, index) => {
    switch(FORM_SCHEMA[field]) {
      case "textfield": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <TextField 
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                onChange={formOnChange}
                label={field} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "dropdown": {
        return (
          <Grid item key={index} lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <Autocomplete
                name={field}
                options={formOptions[field]}
                onChange={(e, value) => {
                  formOnChange(null, { name: {field}, value: value})
                }}
                getOptionLabel={(option) => option.name}
                defaultValue={fields[field]}
                renderInput={(params) => <TextField {...params} label={field} variant="outlined" />}
              />
              <FormHelperText name={field}>{`Select your ${field}`}</FormHelperText>
            </FormControl>
          </Grid>
        )
        break;
      }
      case "file": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FileUploader onSave={fileOnSave} />
          </Grid>
        )
        break;
      }
      case "textarea": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin}>
              <TextareaAutosize 
                name={field} 
                rowsMin={3} 
                onChange={formOnChange} 
                placeholder={field} 
              />
            </FormControl>
          </Grid>
        )
        break;
      }
    }
  });
  
  
  useEffect(() => {
    switch(type) {
      case "submit": {
        setFormTitle(`Add ${title}`);
        setFormBtnTitle(`Add ${title}`);
        break
      }
      case "edit": {
        setFormTitle(`Edit ${title}`);
        setFormBtnTitle(`Update ${title}`);
        break;
      }
      case "delete": {
        setFormTitle(`Delete ${title}`);
        setFormBtnTitle(`Delete ${title}`);
        break;
      }
    }
  }, [])

  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={2} className={classes.formItems}>
          <Grid item lg={12} xs={12}>
            <Typography className={classes.typography} align="center" variant="h4" component="h4">{formTitle}</Typography>
          </Grid>
          {
            formFields && formFields
          }
          <Grid item lg={6} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin}>
              <Button onClick={handleCancel} className={`mainButton`}>Cancel</Button>
            </FormControl>
          </Grid>
          {
            formBtnTitle && (
              <Grid item lg={6} xs={12} className={classes.formItem}>
                <FormControl fullWidth className={classes.margin}>
                  <Button onClick={handleSubmit} className={`mainButton`}> {formBtnTitle}</Button>
                </FormControl>
              </Grid>
            )
          }
        </Grid>
      </form>
      <Snackbar open={snack.open} severity={snack.severity} onClose={onCloseSnack} content={snack.text} />
    </div>
  );
}

Form.protoTypes = {
  type: T.string,
  classes: T.object,
  title: T.string,
  errors: T.object,
  fields: T.object,
  onChange: T.func,
  fileOnSave: T.func,
  formSubmit: T.func,
  formCancel: T.func,
  snack: T.object,
  onCloseSnack: T.func,
}

export default withStyles(styles)(Form);