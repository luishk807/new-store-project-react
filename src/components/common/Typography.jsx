import React from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Typography as MuiTypography,
} from '@material-ui/core';

const styles = (theme) => ({

});

const Typography = ({className={}, children, color= "inherit", variant = null, component = "p", align = "left"}) => {
  return (
    <MuiTypography
      className={className}
      variant={variant}
      color={color}
      component={component}
      align={align}
    >
      {children}
    </MuiTypography>
  );
}

Typography.protoTypes = {
  className: T.object,
  color: T.object,
  children: T.node,
  variant: T.string,
  component: T.string,
  align: T.string,
}
 
export default withStyles(styles)(Typography);