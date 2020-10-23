import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import Typography from './Typography';

import { RateLabels } from '../../../config.js';
import { useEffect, useState } from 'react';

const styles = (theme) => ({
  ratingStyle: {
    verticalAlign: 'middle',
  },
  rateLabel: {
    display: 'inline-block',
    marginLeft: 5,
  },
});

const Rate = ({className, classes, data, onChange, onChangeActive, disabled = false, showTitle = true}) => {
  console.log("Class", className)
  const [rate, setRate] = useState(0)

  useEffect(() => {
    if (data) {
      setRate(parseFloat(data));
    }
  }, [])
  return (
    <div>
      <Rating
        name="user-feedback"
        value={rate}
        precision={0.5}
        className={className}
        disabled={disabled}
        onChange={onChange}
        onChangeActive={onChangeActive}
      />
      {
        showTitle && (<Typography component="div" className={classes.rateLabel}>{RateLabels[rate]}</Typography>)
      }
    </div>
  );
}

Rate.protoTypes = {
  className: T.object,
  data: T.float,
  onChange: T.func,
  onChangeActive: T.func,
  disabled: T.bool,
  showTitle: T.bool,
}
export default withStyles(styles)(Rate);