import React, { useEffect, useState, useRef } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  CircularProgress
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    padding: 5,
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    margin: '10px auto',
  },
  progressBar: {
    textAlign: 'center'
  }
});

const ProgressBar = ({classes}) => {
  return (
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12} xs={12} className={classes.progressBar}>
            <CircularProgress />
          </Grid>
        </Grid>
      </div>
  );
}

ProgressBar.protoTypes = {
  classes: T.object,
};

export default withStyles(styles)(ProgressBar);