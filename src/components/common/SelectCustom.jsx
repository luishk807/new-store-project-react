import React, {useState, useEffect} from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    minWidth: 120,
    marginRight: 5,
  },
});

const SelectCustom = ({ classes, data, label, onSelect, defaultValue}) => {
  const [selectedValue, setSelectedValue] = React.useState('');
  const [selectedLabel, setSelectedLabel] = React.useState('');

  const handleChange = (event) => {
    const val = event.target.value;

    const findValue = data.filter(item => item.value == val)[0];

    if (findValue) {
      setSelectedLabel(findValue.name);
    }
    setSelectedValue(event.target.value);
    onSelect(event.target.value);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue.value)
      setSelectedLabel(defaultValue.name);
      onSelect(defaultValue.value);
    }
  }, [defaultValue])

  return (
    <FormControl variant="outlined" className={classes.root}>
        <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedValue}
          onChange={handleChange}
          label={label}
          title={selectedLabel}
        >
          {
            data.map((item, index) => {
              return (
                <MenuItem title={item.name} key={index} value={item.value}>{item.name}</MenuItem>
              )
            })
          }
        </Select>
    </FormControl>
  );
}

SelectCustom.protoTypes = {
  classes: T.object,
  label: T.string,
  onSelect: T.func,
  defaultValue: T.object,
  data: T.object.isRequired
}

export default withStyles(styles)(SelectCustom);