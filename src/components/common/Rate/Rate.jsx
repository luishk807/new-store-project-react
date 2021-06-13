import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import Typography from '../Typography';

import { RateLabels } from '../../../../config';
import { useEffect, useState } from 'react';
import { config } from '../../../../config';

const styles = (theme) => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 0
  },
  ratingStyle: {
    verticalAlign: 'middle',
  },
  rateLabel: {
    display: 'inline-block',
    marginLeft: 5,
  },
});

const Rate = ({className, classes, data, onChange, onChangeActive, disabled = false, showTitle = false}) => {
  const [rate, setRate] = useState(0)

  useEffect(() => {
    if (data) {
      setRate(parseFloat(data));
    }
  }, [])

  const handleOnChange = (e, value) => {
    setRate(value)
    onChange(value)
  }

  if (config.system && config.system.enableRating) {
    return (
      <div className={classes.root}>
        <Rating
          name="user-feedback"
          value={rate}
          precision={0.5}
          className={className}
          disabled={disabled}
          onChange={handleOnChange}
          onChangeActive={onChangeActive}
        />
        {
          showTitle && (<Typography component="div" className={classes.rateLabel}>{RateLabels[rate]}</Typography>)
        }
      </div>
    );
  } else {
    return <></>
  }
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