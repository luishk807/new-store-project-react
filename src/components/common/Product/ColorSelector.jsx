import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  Grid,
  withStyles 
} from '@material-ui/core';

import { useTranslation } from 'next-i18next';
import { getColorName } from '@/utils/helpers/product';
import { capitalize } from 'src/utils';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  variantTitles: {
    margin: '10px 0px',
  },
  productColorLink: {
    margin: '3px',
    display: 'inline-block',
    lineHeight: '0px',
    outline: '1px solid rgba(0,0,0,.2)',
    '&:hover': {
      outline: '2px solid rgba(0,0,0)',
    },
  },
  productColorLinkSelected: {
    margin: '3px',
    display: 'inline-block',
    lineHeight: '0px',
    outline: '2px solid rgba(0,0,0)',
  },
  productColorBox: {
    width: 50,
    height: 28,
    border: '1px solid white',
    padding: 5,
    display: 'inline-block',
  },
});

const ColorSelector = React.memo(({ classes, data, onSelect, index }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [colors, setColors] = useState([]);
  const [showData, setShowData] = useState(false);

  const { t } = useTranslation(['common', 'order'])

  const loadColors = async() => {
    if (data.productProductItems &&  data.productProductItems.length) {
      const validColors = data.productProductItems.filter(item => Number(item.status) == 1).map(item => item.productColorId);
      const getTrueColors = data.productColors.filter(item => validColors.includes(item.id))
      setColors(getTrueColors);
    }
  }

  const handleColorChange = (e, color) => {
    if (e) {
      e.preventDefault();
    }
    setSelectedColor(color);
  }

  useEffect(() => {
    if (colors && colors.length) {
      const getSelectColor = data.selectedColor ? data.selectedColor : colors[0];
      handleColorChange(null, getSelectColor)
      setShowData(true)
    }
  }, [colors]);

  useEffect(() => {
    if (selectedColor) {
      onSelect(selectedColor, index)
    }
  }, [selectedColor])

  useEffect(() => {
    loadColors();
  }, []);

  return showData && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12} xs={12} className={classes.variantTitles}>{ t('colors') }: { selectedColor ? getColorName(selectedColor, t, 'colors') : '' }</Grid>
        <Grid item lg={12} xs={12}>
          {
            colors.map((item, index) => {
              return (
                <a title={`Select ${capitalize(item.name)}`} key={index} href="#" className={selectedColor.id === item.id ? classes.productColorLinkSelected : classes.productColorLink} onClick={(e) => handleColorChange(e, item)}><div className={classes.productColorBox} style={{backgroundColor: item.color}}></div></a>
              )
            })
          }
        </Grid>
      </Grid>
    </div>
  );
})

ColorSelector.propTypes = {
  classes: T.object,
  data: T.object,
  onSelect: T.func,
  index: T.number
}

export default withStyles(styles)(ColorSelector);