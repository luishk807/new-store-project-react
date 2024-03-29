import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';

import Typography from '@/common/Typography';

const TextEllipsis = ({
  classes = null, 
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
        text && text.length > limit ? text.substring(0,limit).concat('...') : text
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