import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Button,  
  TextField,
  FormControl,
  FormHelperText,
  TextareaAutosize,
} from '@material-ui/core';
import { 
  Autocomplete,
} from '@material-ui/lab';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { loadMainOptions } from '../../utils/form';
import FileUploader from './FileUploader';
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
  userImagesItem: {

  },
  gridList: {
    width: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    justifyContent: 'center',
  },
  icon: {
    color: 'white'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

const Form = ({
  type,
  classes, 
  title, 
  errors, 
  onChange: formOnChange, 
  fields,
  snack,
  fileOnSave,
  formSubmit: handleSubmit,
  formCancel: handleCancel,
  onCloseSnack,
  onImageDelete,
}) => {
  const [formOptions, setFormOptions] = useState({
    vendor: {},
    brand: {},
    category: {}
  })
  const [useFormOption, setUseFormOptions] = useState(false)
  const [formTitle, setFormTitle] = useState('');
  const [formBtnTitle, setFormBtnTitle] = useState('');
  const userImages = fields['image'].saved;
  
  const imageClickHandle = (e) => {
    const markDelete = userImages[e];
    userImages.splice(e,1);
    userImagesCont.splice(e,1);
    onImageDelete(markDelete)
  }

  const userImagesCont = userImages && userImages.length ? userImages.map((data, index) => {
    return (
      <GridListTile key={index} cols={1}>
        <img src={`${process.env.IMAGE_URL}/${data.img_url}`} alt />
        <GridListTileBar
          titlePosition="top"
          actionIcon={
            <IconButton className={classes.icon} onClick={()=>imageClickHandle(index)}>
              <DeleteOutlinedIcon />
            </IconButton>
          }
          actionPosition="right"
          className={classes.titleBar}
        />
      </GridListTile>
    )
  }) : [];

  const formFields = Object.keys(fields).map((field, index) => {
    switch(FORM_SCHEMA[field]) {
      case "textfield":
      case "number": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <TextField 
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                defaultValue={fields[field]}
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
                getOptionLabel={(option) => 'name' in option ? option.name : option.first_name + " " + option.last_name}
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
            {
              userImagesCont && (
                <Grid container justify="center">
                  <GridList cellHeight={160} className={classes.gridList} cols={2}>
                  {
                    userImagesCont
                  }
                  </GridList>
                </Grid>
              )
            }

            <FileUploader onSave={fileOnSave}/>
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
                defaultValue={fields[field]}
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
    const loadFormOption = async() => {
      const {category, vendor, brand} = await loadMainOptions();

      setFormOptions({
        'category': category,
        'vendor': vendor,
        'brand': brand
      })

      setUseFormOptions(true)
    }
    
   loadFormOption()
  }, [useFormOption])

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
            useFormOption && formFields
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
  onImageDelete: T.func,
  formCancel: T.func,
  snack: T.object,
  onCloseSnack: T.func,
}

export default withStyles(styles)(Form);