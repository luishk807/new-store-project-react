import React, {useState} from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  InputLabel,
  FormControl,
  NativeSelect, 
} from '@material-ui/core';

import Typography from './Typography';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  productSelectDrop: {
    minWidth: '100%',
    fontSize: '1.5em',
    padding: '2px 0px',
  },
  productSelectLabel: {
    fontSize: '1em',
  },
});

const Select = ({classes, data, title, id, onChange}) => {
  const items = [];
  const length = 10; 

  for(var i = 0; i < length; i++){
    items.push(<option key={i} value={i}>{i + 1}</option>)
  }

  return ( 
    <div className={classes.root}>
      <FormControl className={classes.productSelectDrop}>
        <InputLabel htmlFor={id} className={classes.productSelectLabel}>Cantidad</InputLabel>
        <NativeSelect
          value={ data && data - 1 }
          inputProps={{
            name: title,
            id: id
          }}
          onChange={onChange}
        >
          <option aria-label="None" value="" />
          { items && items }
        </NativeSelect>
      </FormControl>
    </div>
  );
}

Select.protoTypes = {
  classes: T.object,
  data: T.object,
  title: T.string,
  id: T.string,
  onChange: T.func,
};

export default withStyles(styles)(Select);