import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  Grid,
  FormControl,
  FormHelperText,
  TextField,
  withStyles,
} from '@material-ui/core';
import ColorPick from 'material-ui-color-picker';
import { 
  Autocomplete,
} from '@material-ui/lab';

import { removeCharacter } from '../../utils';
import { FORM_SCHEMA } from '../../../config';
import { getColors } from '../../api/colors';
import ColorBlock from '../../components/common/ColorBlock';

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: '0px !important',
    margin: '10px 0px',
  },
  colorCustom: {
    margin: '20px 0px',
  },
  colorInput: {
    marginTop: 18,
    [theme.breakpoints.down('sm')]: {
      marginTop: 'auto',
    },
  },
  whiteBackground: {
    background: 'white'
  },
});

const ColorPicker = React.memo(({ 
  classes, 
  name, 
  onChange
}) => {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showData, setShowData] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [productColor, setProductColor] = useState({
    colorId: '',
    color: '',
    name: '',
    useCustom: false,
  });

  const loadColors = async() => {
    const gColor = await getColors()
    gColor.push({
      name: "Add Custom",
      color: 'white',
      id: -1
    })
    setSelectedColor(gColor[0]);
    setProductColor({
      ...productColor,
      colorId: gColor[0].id
    });
    setColors(gColor);
    setShowData(true);
  }

  const handleFormChange = (e, {color}) => {
    if (e) {
      setProductColor({
        ...productColor,
        name: e.target.value
      });
    } else {
      if (color) {
        setProductColor({
          ...productColor,
          color: color,
          name: color
        });
      }
    }
  };
  
  const handleDropColorChange = (color) => {
    if (!color) {
      setProductColor({
        ...productColor,
        colorId: '',
        color: '',
        name: '',
        useCustom: false,
      })
      setIsCustom(false)
      return;
    } 
    if (color.id < 0) {
      setProductColor({
        ...productColor,
        colorId: '',
        useCustom: true,
      })
      setIsCustom(true)
    } else {
      setProductColor({
        ...productColor,
        name: color.name,
        color: color.color,
        useCustom: false,
        colorId: color.id
      })
      setIsCustom(false)
    }
    setSelectedColor(color)
  };
  
  useEffect(() => {
    loadColors();
  }, []);

  useEffect(() => {
    if (!productColor.color && productColor.useCustom) {
      productColor.color = colors[0].color;
    }
    onChange(productColor)
  }, [productColor])

  return showData && (
    <>
    <Grid item lg={12} xs={12} className={classes.root}>
      <FormControl fullWidth variant="outlined">
        <Autocomplete
          className={classes.whiteBackground}
          name={name}
          options={colors}
          onChange={(e, value) => {
            handleDropColorChange(value)
          }}
          getOptionLabel={(option) => option.name}
          value={selectedColor}
          renderOption={(option) => (
            <React.Fragment>
              <Grid container>
                <Grid item lg={9} xs={9}>
                  {option.name}
                </Grid>
                <Grid item lg={3} xs={3}>
                <ColorBlock classes={{colorBlock: classes.colorBlock}} color={option.color}/>
                </Grid>
              </Grid>
            </React.Fragment>
          )}
          renderInput={(params) => <TextField {...params} label={FORM_SCHEMA[name].label} variant="outlined" inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}/>}
        />
      </FormControl>
    </Grid>
    {
      isCustom && (
        <Grid className={classes.colorCustom} container>
          <Grid item lg={12} xs={12} className={classes.root}>
            <FormControl fullWidth variant="outlined">
              <ColorPick
                  name='color'
                  defaultValue={colors[0].color}
                  onChange={(color) => handleFormChange(null, {color: color})}
                  className={classes.colorInput}
                />
              <FormHelperText id={name}>Choose {name}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={12} xs={12} className={classes.formItem}>
            <FormControl fullWidth variant="outlined">
              <TextField 
                variant="outlined" 
                name="name"
                value={productColor ? productColor.name : ''}
                onChange={(e) => handleFormChange(e, {color: ''})}
                label={removeCharacter(FORM_SCHEMA['name'].label)} 
              />
            </FormControl>
          </Grid>
        </Grid>
      )
    }
    </>
  );
})

ColorPicker.propTypes = {
  classes: T.object,
  name: T.string.isRequired,
  onChange: T.func,
}

export default withStyles(styles)(ColorPicker);