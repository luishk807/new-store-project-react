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
  Link,
  FormControl,
  FormHelperText,
  TextareaAutosize,
} from '@material-ui/core';
import { 
  Autocomplete,
} from '@material-ui/lab';
import moment from 'moment'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { loadMainOptions } from '../../../utils/form';
import FileUploader from '../FileUploader';
import { FORM_SCHEMA, CATEGORY_ICONS } from '../../../../config';
import Typography from '../Typography';
import Snackbar from '../Snackbar';
import Rate from '../../common/Rate/Rate';
import { ADMIN_SECTIONS } from '../../../constants/admin';
import { getImageUrlByType } from '../../../utils/form';
import { removeCharacter } from '../../../utils';

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
    width: '100%',
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
  id,
  children,
  fileOnSave,
  fileAcceptedMimeTypes=['image/jpeg', 'image/png'],
  fileBtnText='Upload Image',
  formSubmit: handleSubmit,
  formCancel: handleCancel,
  onCloseSnack,
  onImageDelete,
  showTitle = true,
  hideEntry,
  fileLimit,
}) => {
  const [formOptions, setFormOptions] = useState({
    vendors: {},
    brands: {},
    categorys: {}
  })
  console.log("form", fields)
  const [useFormOption, setUseFormOptions] = useState(false)
  const [formTitle, setFormTitle] = useState('');
  const [formBtnTitle, setFormBtnTitle] = useState('');
  const userImages = fields['image'] && 'saved' in fields['image'] ? fields['image'].saved : null;
  
  const imageClickHandle = (e) => {
    const markDelete = userImages[e];
    userImages.splice(e,1);
    userImagesCont.splice(e,1);
    onImageDelete(markDelete)
  }

  const handleRateOnChange = (value) => {
    formOnChange({target:{name: 'rate', value: value}})
  }
  
  const imgMainUrl = getImageUrlByType(title);
  const userImagesCont = userImages && typeof userImages == "object" ? userImages.map((data, index) => {
    const imageSrc = typeof data === "object" && data ? data.img_url : data;
    return imageSrc ? (
      <GridListTile key={index} cols={1}>
        <img src={`${imgMainUrl}/${imageSrc}`} />
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
    ) : null
  }) : [];

  const formFields = Object.keys(fields).map((field, index) => {
    if (hideEntry && hideEntry.indexOf(field) !== -1) {
      return;
    }
    
    switch(FORM_SCHEMA[field]) {
      case "textfield":
      case "email": {
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
                label={removeCharacter(field)} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "number": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <TextField 
                type="number"
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                defaultValue={fields[field]}
                onChange={formOnChange}
                label={removeCharacter(field)} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "rate": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin}>
              <Rate name={field}  onChange={handleRateOnChange} data={0} />
            </FormControl>
          </Grid>
        )
        break
      }
      case "password": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <TextField 
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                type="password"
                defaultValue={fields[field]}
                onChange={formOnChange}
                label={removeCharacter(field)} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "date": {
        const initialDate =fields[field] ? fields[field] : moment(new Date()).format('YYYY-MM-DD');
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <TextField 
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                type="date"
                defaultValue={initialDate}
                onChange={formOnChange}
                label={removeCharacter(field)} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "dropdown": {
        console.log("filed", field, 'options', formOptions)
        return (
          <Grid item key={index} lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <Autocomplete
                name={field}
                options={formOptions[field]}
                onChange={(e, value) => {
                  formOnChange(null, { name: field, value: value})
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
      case "linkitem": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <Button href={`${field}/${id}`} className={`mainButton`}>Edit {field}</Button>
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

            <FileUploader fileLimit={fileLimit} onSave={fileOnSave}/>
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
      const section = ADMIN_SECTIONS
      const options = await loadMainOptions();
      
      setFormOptions(options)
      setUseFormOptions(true)
    }
    
   loadFormOption()
  }, [useFormOption])

  useEffect(() => {
    let newTitle = title;
    if (fields.first_name) {
      newTitle = `${fields.first_name} ${fields.last_name}`;
    } else if (fields.name) {
      newTitle = `${fields.name}`;
    }

    switch(type) {
      case "submit": {
        setFormTitle(`Add ${newTitle}`);
        setFormBtnTitle(`Add ${newTitle}`);
        break
      }
      case "edit": {
        const buttonName = showTitle ? ` ${newTitle}`:'';
        setFormTitle(`Edit${buttonName}`);
        setFormBtnTitle(`Update${buttonName}`);
        break;
      }
      case "delete": {
        setFormTitle(`Delete ${newTitle}`);
        setFormBtnTitle(`Delete ${newTitle}`);
        break;
      }
    }
  }, [])

  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={2} className={classes.formItems}>
          {
            showTitle && (
              <Grid item lg={12} xs={12}>
                <Typography className={classes.typography} align="center" variant="h4" component="h4">{formTitle}</Typography>
              </Grid>
            )
          }
          {
            children && (
              <Grid item lg={12} xs={12}>
                {children}
              </Grid>
            )
          }
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
  showTitle: T.bool,
  fields: T.object,
  onChange: T.func,
  id: T.number,
  fileOnSave: T.func,
  fileLimit: T.bool,
  formSubmit: T.func,
  onImageDelete: T.func,
  formCancel: T.func,
  children: T.node,
  hideEntry: T.object,
  snack: T.object,
  onCloseSnack: T.func,
}

export default withStyles(styles)(Form);