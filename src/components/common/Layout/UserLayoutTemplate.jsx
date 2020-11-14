import React from 'react';
import * as T from 'prop-types';

import {
  withStyles
} from '@material-ui/core';

import PrivatePage from '../UserPrivatePage';
import LayoutTemplate from './LayoutTemplate';

const styles = (theme) => ({
  root: {},
});

const UserLayoutTemplate = ({classes, children}) => (
  <PrivatePage>
    <LayoutTemplate classes={{root: classes.root}}>
      {
        children
      }
    </LayoutTemplate>
  </PrivatePage>
);

UserLayoutTemplate.protoTypes = {
  classes: T.object,
  children: T.node
}

export default withStyles(styles)(UserLayoutTemplate);