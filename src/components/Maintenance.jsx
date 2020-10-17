import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';

import Icons from '../components/common/Icons';
import Typography from './common/Typography';

const styles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainFont: {
    color: 'white',
    fontFamily: 'Verdana'
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '35%',
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  }
});

const Maintenance = ({classes, data, title}) => {
  return (
    <div className={`container-fluid AppBarBackColor ${classes.root}`}>
      <Grid container className={classes.container}>
        <Grid item className={classes.item}>
          <Icons name="logoWhite"/>
          <Typography className={classes.mainFont} align="center" variant="h3">Proximamente....</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

Maintenance.protoTypes = {
  classes: T.object,
  data: T.object,
  title: T.string,
}

export default withStyles(styles)(Maintenance);