import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

import Typography from './Typography';

const TextEllipsis = ({
  classes = {}, 
  variant="body1", 
  type="p", 
  limit, 
  text
}) => {
  return (
    <Typography
      variant={variant} 
      component={type}
      className={classes}
    >
      { 
        text.substring(0,80).concat('...')
      }
    </Typography>
  );
}

TextEllipsis.protoTypes = {
  classes: T.object,
  type: T.string,
  variant: T.string,
  limit: T.number.isRequired,
  text: T.string.isRequired,
}
 
export default TextEllipsis;