import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Typography as MuiTypography,
} from '@material-ui/core';

const styles = (theme) => ({

});

const Typography = ({classes, children, variant, component, align}) => {
  return (
    <MuiTypography
      classes={classes}
      variant={variant}
      component={component}
      align={align}
    >
      {children}
    </MuiTypography>
  );
}

Typography.protoTypes = {
  classes: T.object,
  children: T.node,
  variant: T.string,
  component: T.string,
  align: T.string,
}
 
export default withStyles(styles)(Typography);