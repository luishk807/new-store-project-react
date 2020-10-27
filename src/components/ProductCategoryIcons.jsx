import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ProductGallerySample } from '../constants/samples/ProductCategoryIconsSample';
import Icons from './common/Icons';

import { ADMIN_SECTIONS } from '../constants/admin';
import { getItems } from '../api';

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
  },
  listItemMainCont: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

const ProductCategoryIcons = ({classes, data}) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async() => {
    const categories = await getItems(`${ADMIN_SECTIONS.category.url}`);
    setCategories(categories);
  }

  useEffect(() => {
    getCategories();
  }, [])

  return categories && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12}>
          <List component="nav" className={classes.listItemMainCont} aria-label="main mailbox folders">
            {
              categories && categories.map((data, index) => {
                return (
                  <ListItem key={index} button className={classes.listItemCont}>
                    <ListItemIcon className={classes.listItemIcons}>
                      <Icons name={data.icon} classes={{icon: classes.icon}} />
                    </ListItemIcon>
                    <ListItemText primary={data.name} />
                  </ListItem>
                );
              })
            }
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