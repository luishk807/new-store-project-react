import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    padding: 5,
    margin:5,
  },
});

const CheckBoxLabel = ({classes, name, onClick, defaultChecked}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = (e) => {
      setIsChecked(!isChecked)
      onClick(e)
    }

    useEffect(() => {
      if(defaultChecked) {
        setIsChecked(true)
      } else {
        setIsChecked(false)
      }
    }, [defaultChecked]);

    return (
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={isChecked} onChange={handleClick} />} label={name} />
      </FormGroup>
    )
}
CheckBoxLabel.protoTypes = {
  classes: T.object,
  name: T.string,
  defaultChecked: T.bool,
  onClick: T.func
} 
export default withStyles(styles)(CheckBoxLabel);