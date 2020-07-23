import React from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import Icons from './common/Icons';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    color: 'red',
    borderTop: '2px solid red',
  },
  listItemCont: {
    display: 'inline-block',
    width: 'auto',
    textAlign: 'center',
  },
  listItemIcons: {
    borderBottom: '3px solid blue',
    paddingBottom: 7,
  },
  icon: {
    width: 70,
    height: 70,
  }
});

const ProductCategoryIcons = ({classes, data}) => {
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button className={classes.listItemCont}>
              <ListItemIcon className={classes.listItemIcons}>
                <Icons name='carwheel' classes={{icon: classes.icon}} />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button className={classes.listItemCont}>
              <ListItemIcon className={classes.listItemIcons}>
                <Icons name='carwheel' classes={{icon: classes.icon}} />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

ProductCategoryIcons.propTypes = {
  classes: T.object.isRequired,
  data: T.object,
};

export default withStyles(styles)(ProductCategoryIcons);