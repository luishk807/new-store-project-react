import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';

import BigCarrousel from './BigCarrousel';
import CategorySelector from './CategorySelector';

const styles = (theme) => ({
  root: {
    position: 'relative',
  },
  categoryIconSection: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
});

const HomeCarrousel = ({classes}) => {
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={10} xs={12}>
          <BigCarrousel />
        </Grid>
        <Grid item lg={2} className={classes.categoryIconSection} >
          <CategorySelector />
        </Grid>
      </Grid>
    </div>
  );
}

HomeCarrousel.propTypes = {
  classes: T.object,
};

export default withStyles(styles)(HomeCarrousel);