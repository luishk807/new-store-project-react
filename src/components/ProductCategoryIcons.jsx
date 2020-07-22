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
import CAR_WHEEL from '../svg/car_wheel.svg';

const styles = (theme) => ({
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
  }
});

const ProductCategoryIcons = ({classes, data}) => {
  return (
    <Grid container>
      <Grid item>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button className={classes.listItemCont}>
            <ListItemIcon className={classes.listItemIcons}>
              <CAR_WHEEL width='70px' height="70px"/>
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button className={classes.listItemCont}>
            <ListItemIcon className={classes.listItemIcons}>
              <CAR_WHEEL width='70px' height="70px"/>
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

ProductCategoryIcons.propTypes = {
  classes: T.object.isRequired,
  data: T.object,
};

export default withStyles(styles)(ProductCategoryIcons);