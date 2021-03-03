import React, {useState, useEffect} from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  InputLabel,
  FormControl,
  NativeSelect,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
  TextField
} from '@material-ui/core';

import Typography from './Typography';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  productSelectDrop: {
    minWidth: 120,
    padding: '2px 0px',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
      width: '100%',
    }
  },
  productSelectLabel: {
    // fontSize: '1em',
  },
});

const QuanitySelector = ({classes, data, title, id, onChange}) => {
  const items = [];
  const [total, setTotal] = useState(0);
  const length = 10;
  for(var i = 0; i < length; i++){
    const value = i + 1;
    items.push(<option key={i} value={value}>{value}</option>)
  }
  const onHandleDropDown = (event) => {
    setTotal(event.target.value);
    onChange({
      id: id,
      value:event.target.value 
    })
  }

  useEffect(()=> {
    setTotal(data)
  }, [])
  return ( 
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.productSelectDrop}>
        {/* <InputLabel htmlFor="dropdown-label" className={classes.productSelectLabel}>{title}</InputLabel>
        <Select
          native
          value={total}
          label={title}
          onChange={onHandleDropDown}
          inputProps={{
            name: id, 
            id: 'dropdown-label'
          }}
        >
          { items && items }
        </Select> */}
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button>-</Button>
          <TextField 
            type="number"
            name={id} 
            onChange={onHandleDropDown}
          />
          <Button>+</Button>
        </ButtonGroup>

      </FormControl>
    </div>
  );
}

QuanitySelector.protoTypes = {
  classes: T.object,
  data: T.object,
  title: T.string,
  id: T.string,
  onChange: T.func,
};

export default withStyles(styles)(QuanitySelector);