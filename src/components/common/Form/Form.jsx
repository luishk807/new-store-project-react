import React, { useState, useEffect, useMemo } from 'react';
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
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { 
  Autocomplete,
} from '@material-ui/lab';
import moment from 'moment'
import ColorPicker from 'material-ui-color-picker'

import { loadMainOptions } from '../../../utils/form';
import { FORM_SCHEMA, CATEGORY_ICONS } from '../../../../config';
import { ADMIN_SECTIONS } from '../../../constants/admin';
import { getImageUrlByType } from '../../../utils/form';
import { removeCharacter } from '../../../utils';
import Rate from '../../common/Rate/Rate';
import { defaultPanama } from '../../../../config';
import FileUploader from '../FileUploader';
import Typography from '../Typography';
import Snackbar from '../Snackbar';
import Icons from '../Icons';
import DialogModal from '../DialogModal';
import ProgressBar from '../ProgressBar';

const styles = (theme) => ({
  root: {
    '& input': {
      backgroundColor: 'white'
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'inherit',
  },
  typography: {
    textAlign: 'inherit',
    padding: 5,
  },
  margin: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  textfieldClass: {
    width: '100%',
  },
  formItems: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    margin: '20px auto 0px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'white',
    width: 60,
    height: 60,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  imageBoxAddMoreBtnItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: '10px 0px',
  },
  imageBoxItem: {
    position: 'relative',
    border: '1px solid rgba(0,0,0,.2)',
    padding: 12,
    display: 'flex',
    margin: '10px 0px',
  },
  whiteBackground: {
    background: 'white'
  },
  checkboxItem: {
    padding: 3
  },
  marginImageBox: {
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& input': {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  imageBoxTitle: {
    position: 'absolute',
    top: -18,
    fontSize: '.9em',
    background: 'white',
    padding: 5,
  },
  imageBoxRemove: {
    position: 'absolute',
    top: -20,
    background: 'white',
    padding: 5,
    right: '9px',
    '& button': {
      fontSize: '.7em !important',
    }
  },
  colorBoxSelection: {
    width: 40,
    height: 40,
  }
});

const Form = ({
  type,
  classes, 
  title, 
  errors, 
  onChange: formOnChange, 
  fields,
  snack,
  isAdmin,
  allowDelete = true,
  id,
  submitCustomName,
  children,
  basicParams,
  fileOnSave,
  imageBoxOnSave,
  imageBoxAddMore,
  fileAcceptedMimeTypes=['image/jpeg', 'image/png'],
  fileBtnText='Upload Image',
  formSubmit: handleSubmit,
  formCancel: handleCancel,
  formDelete,
  onCloseSnack,
  resetPanamaSection,
  onImageDelete,
  onImageBoxDelete,
  disableFields,
  cancelCustonName,
  showTitle = true,
  hideEntry,
  fileLimit = false,
  showCancelBtn = true
}) => {
  const [formOptions, setFormOptions] = useState({
    vendors: {},
    brands: {},
    categorys: {}
  })

  const [useFormOption, setUseFormOptions] = useState(false)
  const [formTitle, setFormTitle] = useState('');
  const [cancelFormBtnTitle, setCancelFormBtnTitle] = useState('Cancel');
  const [formBtnTitle, setFormBtnTitle] = useState('');
  const [forceRefreshPanama, setForceRefreshPanama] = useState(false)
  const [imageBoxImageItems, setImageBoxImageItems] = useState([{}]);
  const [panamaAddress, setPanamaAddress] = useState({})
  const userImages = fields['image'] && 'saved' in fields['image'] ? fields['image'].saved : null;
  const imageBoxImages = fields['imageBox'] && 'saved' in fields['imageBox'] ? fields['imageBox'].saved : null;
  const panamaFlag = ['province', 'district', 'corregimiento', 'zone'];
  const [dialogContent, setDialogContent] = useState({
    open: false,
    value: null,
    title: "Deleting Item",
    content: "Are you sure, you want to delete this item?",
    actionLabels: {
      true: "Yes",
      false: "No"
    }
  })
  const imageClickHandle = (e) => {
    const markDelete = userImages[e];
    userImages.splice(e,1);
    userImagesCont.splice(e,1);
    onImageDelete(markDelete)
  }

  const imageBoxClickHandle = (e) => {
    const markDelete = imageBoxImages[e];
    imageBoxImages.splice(e,1);
    imageBoxImagesCont.splice(e,1);
    onImageBoxDelete(markDelete)
  }

  const handleDelete = (e) => {
    setDialogContent({
      ...dialogContent,
      open: true,
      title: `Deleting ${title}`,
      value: id
    })
  }

  const handleDialogClick = (e) => {
    setDialogContent({
      ...dialogContent,
      open: false
    })
    if (e) {
      formDelete(dialogContent.value)
    }
  }

  const handleRateOnChange = (value) => {
    formOnChange({target:{name: 'rate', value: value}})
  }

  const handleImageBoxChange = (evt, index) => {
    imageBoxOnSave(evt, index)
  }
  
  const addMoreImageBox = async() => {
    setImageBoxImageItems(prevItems => [
      ...prevItems, 
      {}
    ]);
    imageBoxAddMore(true);
  }

  const onChangeColor = async(field, val) => {
    if (val) {
      formOnChange({target:{name: field, value: val}})
    }
  }

  const resetPanamaDrop = (section) => {
    if (section === 'province') {
      fields['district'] = null;
      fields['corregimiento'] = null;
      fields['zone'] = null;
      setPanamaAddress({
        ...panamaAddress,
        'sel_district': null,
        'sel_corregimiento': null,
        'sel_zone': null
      })
    } else if (section === 'district') {
      fields['corregimiento'] = null;
      fields['zone'] = null;
      setPanamaAddress({
        ...panamaAddress,
        'sel_corregimiento': null,
        'sel_zone': null
      })
    } else if (section === 'corregimiento') {
      fields['zone'] = null;
      setPanamaAddress({
        ...panamaAddress,
        'sel_zone': null
      })
    }
  }

  const onDropDownChange = async(val) => {
    const options = formOptions;
    const panama = panamaAddress;
    let sel_name = '';
    if (val && val.value) {
      if (val.name === "province") {
        const lists = panama.districts.filter((item) => item.province == val.value.id);
        options['district'] = lists;
        sel_name = 'sel_province';
        resetPanamaDrop('province');
      } else if (val.name === "district") {
        const lists = panama.corregimientos.filter((item) => item.district == val.value.id);
        options['corregimiento'] = lists;
        sel_name = 'sel_district';
        resetPanamaDrop('district');
      } else if (val.name === "corregimiento") {
        const lists = panama.zones.filter((item) => item.corregimientoId == val.value.id);
        options['zone'] = lists;
        sel_name = 'sel_corregimiento';
        resetPanamaDrop('corregimiento');
      } else if (val.name === "zone") {
        sel_name = 'sel_zone';
      } 
      setPanamaAddress({
        ...panamaAddress,
        [sel_name]: val.value.id
      })
      await setFormOptions(options); 
    } else if (val && !val.value) {
      resetPanamaDrop(val.name)
    }
  }

  const deleteImageBox = async(index) => {
    let imageBox = imageBoxImageItems;
    imageBox.splice(index,1);
    setImageBoxImageItems(imageBox);
    imageBoxAddMore(false, index);
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
              <Icons name="delete" />
            </IconButton>
          }
          actionPosition="right"
          className={classes.titleBar}
        />
      </GridListTile>
    ) : null
  }) : [];

  const imageBoxImagesCont = imageBoxImages && typeof imageBoxImages == "object" ? imageBoxImages.map((data, index) => {
    const imageSrc = typeof data === "object" && data ? data.img_url : data;
    return imageSrc ? (
      <GridListTile key={index} cols={1}>
        <img src={`${imgMainUrl}/${imageSrc}`} />
        <GridListTileBar
          title={data.url}
          titlePosition="top"
          actionIcon={
            <IconButton className={classes.icon} onClick={()=>imageBoxClickHandle(index)}>
              <Icons name="delete" />
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
    
    switch(FORM_SCHEMA[field].type) {
      case "textfield":
      case "email": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth variant="outlined">
              <TextField 
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                defaultValue={fields[field]}
                onChange={formOnChange}
                label={removeCharacter(FORM_SCHEMA[field].label)} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "color": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth variant="outlined">
              <ColorPicker
                name={field}
                defaultValue={fields[field]}
                onChange={(color) => onChangeColor(field, color)}
                className={classes.colorInput}
              />
              <FormHelperText id={field}>Choose {field}</FormHelperText> 
            </FormControl>
          </Grid>
        )
        break
      }
      case "checkbox": {
        return (
          <Grid key={index} item lg={12} xs={12} align="left" className={classes.formItem}>
            <FormControlLabel
              className={classes.checkboxItem}
              control={
                <Checkbox
                  defaultChecked
                  onChange={formOnChange}
                  name={field}
                />
              }
              label={FORM_SCHEMA[field].label}
            />
          </Grid>
        )
        break
      }
      case "boolean": {
        return (
          <Grid key={index} item lg={12} xs={12} align="left" className={classes.formItem}>
            <FormControlLabel
              className={classes.checkboxItem}
              control={
                <Checkbox
                  checked={fields[field] ? fields[field] : false}
                  onChange={(e) => formOnChange(null, {name: field, value: e.target.checked})}
                  name={field}
                /> 
              }
              label={FORM_SCHEMA[field].label}
            />
          </Grid>
        )
        break
      }
      case "number": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth variant="outlined">
              <TextField 
                type="number"
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                defaultValue={fields[field]}
                onChange={formOnChange}
                label={removeCharacter(FORM_SCHEMA[field].label)} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "rate": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth>
              <Rate name={field}  onChange={handleRateOnChange} data={0} />
            </FormControl>
          </Grid>
        )
        break
      }
      case "password": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth variant="outlined">
              <TextField 
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                type="password"
                defaultValue={fields[field]}
                onChange={formOnChange}
                label={removeCharacter(FORM_SCHEMA[field].label)} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "date": {
        const initialDate =fields[field] ? moment(fields[field]).format('YYYY-MM-DTHH:mm:ss') : moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth variant="outlined">
              <TextField 
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                type="date"
                defaultValue={initialDate}
                onChange={formOnChange}
                InputLabelProps={{
                  shrink: true,
                }}
                label={removeCharacter(FORM_SCHEMA[field].label)} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "datefull": {
        const initialDate =fields[field] ? moment(fields[field]).format('YYYY-MM-DTHH:mm:ss') : moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth variant="outlined">
              <TextField 
                error={errors[field].error}
                helperText={errors[field].text} 
                variant="outlined" 
                name={field} 
                type="datetime-local"
                defaultValue={initialDate}
                onChange={formOnChange}
                InputLabelProps={{
                  shrink: true,
                }}
                label={removeCharacter(FORM_SCHEMA[field].label)} 
              />
            </FormControl>
          </Grid>
        )
        break
      }
      case "dropdown": {
        if (field === "productColor") {
          return (
            <Grid item key={index} lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  className={classes.whiteBackground}
                  name={field}
                  options={formOptions[field]}
                  getOptionLabel={(option) => option.name}
                  value={fields[field]}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <div className={classes.colorBoxSelection} style={{backgroundColor: option.color}}></div>
                      &nbsp;
                      {
                        option.name
                      }
                    </React.Fragment>
                  )}
                  renderInput={(params) => <TextField {...params} label={FORM_SCHEMA[field].label} variant="outlined" />}
                />
                <FormHelperText name={field}>{`Select your ${FORM_SCHEMA[field].label}`}</FormHelperText>
              </FormControl>
            </Grid>
          )
        } else {
          return (
            <Grid item key={index} lg={12} xs={12} className={classes.formItem}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  className={classes.whiteBackground}
                  name={field}
                  disabled={ disableFields && disableFields.includes(field) ? true : false}
                  options={formOptions[field]}
                  onChange={(e, value) => {
                    if (panamaFlag.includes(field)) {
                      onDropDownChange({ name: field, value: value})
                    }
                    formOnChange(null, { name: field, value: value})
                  }}
                  getOptionLabel={(option) => 'name' in option ? option.name : option.first_name + " " + option.last_name}
                  value={fields[field]}
                  renderInput={(params) => <TextField {...params} label={FORM_SCHEMA[field].label} variant="outlined" />}
                />
                <FormHelperText name={field}>{`Select your ${FORM_SCHEMA[field].label}`}</FormHelperText>
              </FormControl>
            </Grid>
          ) 
        }
        break;
      }
      case "linkitem": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth variant="outlined">
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
      case "imgurl": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            {
              imageBoxImagesCont && (
                <Grid container justify="center">
                  <GridList cellHeight={160} className={classes.gridList} cols={2}>
                  {
                    imageBoxImagesCont
                  }
                  </GridList>
                </Grid>
              )
            }
            <Grid container>
              <Grid item lg={12} xs={12} className={classes.imageBoxAddMoreBtnItem}>
                <Button onClick={addMoreImageBox} className={`smallMainButton`}>Add More</Button>
              </Grid>
              {
                imageBoxImageItems && imageBoxImageItems.map((imageBoxItem, index) => {
                  const idx = index ? index : 0;
                  return (
                    <Grid item key={index} lg={12} xs={12} className={classes.imageBoxItem}>
                      <div className={classes.imageBoxTitle}>Image {idx + 1}</div>
                      {
                          index > 0 && ( 
                            <div className={classes.imageBoxRemove}>
                              <Button onClick={ () => deleteImageBox(index)}>Remove</Button>
                            </div>
                          )
                      }
                      <FormControl fullWidth className={classes.marginImageBox} variant="outlined">
                        <TextField 
                          className={classes.textfieldClass}
                          error={errors[field].error}
                          helperText={errors[field].text} 
                          variant="outlined" 
                          name={field[idx].url} 
                          onChange={(evt) => handleImageBoxChange(evt, idx)}
                          label="Image Box Url" 
                        />
                        <FileUploader fileLimit={fileLimit} onSave={(evt)=> handleImageBoxChange(evt, idx)}/>
                      </FormControl>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
        )
        break;
      }
      case "textarea": {
        return (
          <Grid key={index} item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth>
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
  const loadFormOption = async() => {
    const section = ADMIN_SECTIONS;
    const options = await loadMainOptions(isAdmin, basicParams);
    const panama = {
      provinces: [],
      districts: [],
      corregimientos: [],
      zones: [],
      sel_province: null,
      sel_district: null,
      sel_corregimiento: null,
      sel_zone: null
    };
    if (options.province) {
      panama.provinces = options.province
    };
    if (options.district) {
      panama.districts = options.district
    };
    if (options.corregimiento) {
      panama.corregimientos = options.corregimiento
    };
    if (options.zone) {
      panama.zones = options.zone
    };
    setPanamaAddress(panama);
    setFormOptions(options);
    setUseFormOptions(true);
  }

  useEffect(() => {
   loadFormOption();
  }, [useFormOption]);

  useEffect(() => {
    if (forceRefreshPanama != resetPanamaSection) {
      const options = formOptions;
      const panama = panamaAddress;

      if(panama && Object.keys(panama).length) {
        const district = panama.districts.filter((item) => item.province == defaultPanama.province.id);
        options['district'] = district;

        const corregi = panama.corregimientos.filter((item) => item.district == defaultPanama.district.id);
        options['corregimiento'] = corregi;

        setPanamaAddress({
          ...panamaAddress,
          'sel_province':  defaultPanama.province.id,
          'sel_district':  defaultPanama.district.id
        })
        setFormOptions(options); 
      }
      setForceRefreshPanama(resetPanamaSection);
    }
  }, [resetPanamaSection])

  useEffect(() => {
    let newTitle = title;
    if (fields.first_name) {
      newTitle = `${fields.first_name} ${fields.last_name}`;
    } else if (fields.name) {
      newTitle = `${fields.name}`;
    }
    if (cancelCustonName) {
      setCancelFormBtnTitle(cancelCustonName);
    }

    switch(type) {
      case "submit": {
        setFormTitle(`Add ${newTitle}`);
        setFormBtnTitle(`${submitCustomName ? submitCustomName : `Add ${newTitle}`}`);
        break
      }
      case "edit": {
        const buttonName = showTitle ? ` ${newTitle}`:'';
        setFormTitle(`Edit${buttonName}`);
        setFormBtnTitle(`${submitCustomName ? submitCustomName : `Update`}`);
        break;
      }
      case "delete": {
        setFormTitle(`Delete ${newTitle}`);
        setFormBtnTitle(`${submitCustomName ? submitCustomName : `Delete ${newTitle}`}`);
        break;
      }
      case "email": {
        setFormTitle(`${newTitle}`);
        setFormBtnTitle(`${submitCustomName ? submitCustomName : `Send Email`}`);
        break;
      }
      case "action": {
        setFormTitle(`${newTitle}`);
        setFormBtnTitle(`${submitCustomName ? submitCustomName : `Save`}`);
        break;
      }
      case "static": {
        setFormTitle(`${newTitle}`);
        break;
      }
      case "dynamic": {
        setFormTitle(`${newTitle}`);
        if (submitCustomName) {
          setFormBtnTitle(submitCustomName);
        } else {
          setFormBtnTitle(null);
        }
        break;
      }
      default: {
        setFormTitle(`${newTitle}`);
        setFormBtnTitle(`${submitCustomName ? submitCustomName : newTitle}`);
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
                <Typography className={classes.typography} variant="h4" component="h4">{formTitle}</Typography>
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
            useFormOption ? formFields : 
            (
              <Grid item lg={12} xs={12}>
                <ProgressBar />
              </Grid>
            )
          }
          {
            showCancelBtn && (
              <Grid item lg={ type === "edit"  && allowDelete ? 4 : 6} xs={12} className={classes.formItem}>
                <FormControl fullWidth>
                  <Button onClick={handleCancel} className={`mainButton`}>{cancelFormBtnTitle}</Button>
                </FormControl>
              </Grid>
            )
          }
           {
            type === "edit" && allowDelete && (
              <Grid item lg={ showCancelBtn ? 4 : 6 } xs={12} className={classes.formItem}>
                <FormControl fullWidth>
                  <Button onClick={handleDelete} className={`mainButton`}>Delete</Button>
                </FormControl>
              </Grid>
            )
          }
          {
            formBtnTitle && (
              <Grid item lg={ showCancelBtn ? type === "edit"  && allowDelete ? 4 : 6 : 6 } xs={12} className={classes.formItem}>
                <FormControl fullWidth>
                  <Button onClick={handleSubmit} className={`mainButton`}> {formBtnTitle}</Button>
                </FormControl>
              </Grid>
            )
          }
        </Grid>
      </form>
      <Snackbar open={snack.open} severity={snack.severity} onClose={onCloseSnack} content={snack.text} />
      <DialogModal open={dialogContent.open} onClick={handleDialogClick} title={dialogContent.title} content={dialogContent.content} actionLabels={dialogContent.actionLabels} />
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
  basicParams: T.object,
  imageBoxOnSave: T.func,
  imageBoxAddMore: T.func,
  id: T.number,
  allowDelete: T.bool,
  isAdmin: T.bool,
  resetPanamaSection: T.bool,
  showCancelBtn: T.bool,
  fileOnSave: T.func,
  fileLimit: T.bool,
  formSubmit: T.func,
  onImageDelete: T.func,
  onImageBoxDelete: T.func,
  formCancel: T.func,
  formDelete: T.func,
  children: T.node,
  hideEntry: T.object,
  cancelCustonName: T.string,
  snack: T.object,
  submitCustomName: T.string,
  onCloseSnack: T.func,
  disableFields: T.array
}

export default withStyles(styles)(Form);