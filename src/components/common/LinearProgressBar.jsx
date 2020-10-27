import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { 
  withStyles, 
  LinearProgress,
  Typography,
  Box
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
})

const LinearProgressBar = (props) => {

  return (
    <div className={props.classes.root}>
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    </div>
  );
}
 
LinearProgressBar.protoTypes = {
  classes: T.object,
  value: T.number.isRequired,
}

export default withStyles(styles)(LinearProgressBar);