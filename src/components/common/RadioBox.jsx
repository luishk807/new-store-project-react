import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Radio,
  Button,
} from '@material-ui/core';
import Icons from './Icons';
import { formatNumber } from '../../utils';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  mainTitle: {
    fontSize: '1.1em',
  },
  radioRadio: {
    textAlign: 'left',
  },
  radioItemRadio: {
    display: 'table-cell',
    '& span': {
      paddingLeft: 0,
    }
  },
  radioItemContent: {
    display: 'table-cell',
  },
  radioDescription: {
    fontSize: '.8em',
  },
  radioTitle: {
    fontWeight: 'bold',
    marginBottom: '.2em',
  },
  radioTotal: {
    paddingTop: 6,
    textAlign: 'right',
  },
});

const RadioBox = ({
  options, 
  classes,
  title,
  selected,
  onSelected,
  name,
  type
}) => {
  const [itemSelected, setItemSelected] = useState(null);

  const handleSelect = async(evt) => {
    const opt = options.filter(item => item.id === evt.target.value);
    setItemSelected(evt.target.value);
    onSelected(opt)
  }

  useEffect(() => {
    let data = selected;
    if (type === "address") {
      let getFav = options.filter(item => item.selected === true);
      data = getFav ? getFav[0].id : options[0].id;
    } else {
      if (!selected) {
        data = options[0].id;
      }
    }

    setItemSelected(data)
  }, [options]);

  const loadContent = () => {
    switch(type) {
      case 'address': {
        return (
          options && options.map((option, index) => {
            return (
              <Grid container key={index}>
                <Grid item lg={10} xs={9} className={classes.radioRadio}>
                  <div className={classes.radioItemRadio}>
                    <Radio
                      checked={itemSelected === option.id}
                      onChange={handleSelect}
                      value={option.id}
                      name={name}
                    />
                  </div>
                  <div className={classes.radioItemContent}>
                    <p className={classes.radioTitle}>{option.name} {option.selected && '[Default]'}</p>
                    <p className={classes.radioDescription}>{option.address}</p>
                    <p className={classes.radioDescription}>{option.addressDistrict.name} {option.addressCorregimiento.name}</p>
                    <p className={classes.radioDescription}>{option.addressProvince.name}</p>
                    <p className={classes.radioDescription}>{option.addressCountry.nicename}</p>
                  </div>
                </Grid>
                <Grid item lg={2} xs={3} className={classes.radioTotal}>
                  <Button href={`/account/addresses/${option.id}`}  className={`secondButton`}>Edit</Button>
                </Grid>
              </Grid>
            )
          })
        )
        break;
      }
      default: {
        return (
          options && options.map((option, index) => {
            return (
              <Grid container key={index}>
                <Grid item lg={10} xs={9} className={classes.radioRadio}>
                  <div className={classes.radioItemRadio}>
                    <Radio
                      checked={itemSelected === option.id}
                      onChange={handleSelect}
                      value={option.id}
                      name={name}
                    />
                  </div>
                  <div className={classes.radioItemContent}>
                    <p className={classes.radioTitle}>{option.name}</p>
                    <p className={classes.radioDescription}>{option.description}</p>
                  </div>
                </Grid>
                <Grid item lg={2} xs={3} className={classes.radioTotal}>
                  {option.total > 0 ? `$${formatNumber(option.total)}` : `FREE`}
                </Grid>
              </Grid>
            )
          })
        )
      }
    }
  }

  return (
    <div className={classes.root}>
      {
        title && (<h4 className={classes.mainTitle}>{title}</h4>)
      }
      { loadContent() }
    </div>
  );
}

RadioBox.protoTypes = {
  classes: T.object,
  options: T.object.isRequired,
  title: T.string,
  onSelected: T.func,
  selected: T.number,
  name: T.name,
  type: T.string
}

export default withStyles(styles)(RadioBox);