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
import { useRouter } from 'next/router';

import { ProductGallerySample } from '../constants/samples/ProductCategoryIconsSample';
import { ADMIN_SECTIONS } from '../constants/admin';
import { getItems } from '../api';
import { getCategories } from '../api/categories';
import { searchProductsByCat } from '../api/products';
import Icons from './common/Icons';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
  },
  listItemCont: {
    display: 'inline-block',
    width: 'auto',
    textAlign: 'center',
  },
  listItemIcons: {
    borderBottom: '3px solid blue',
    paddingBottom: 7,
    minWidth: 40,
  },
  name: {
    '& span': {
      fontSize: '.8em',
    }
  },
  icon: {
    width: 70,
    height: 70,
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
  },
  listItemMainCont: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'start',
    },
  }
});

const ProductCategoryIcons = ({classes, data}) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const getCategories = async() => {
    const categories = await getItems(`${ADMIN_SECTIONS.category.url}`);
    setCategories(categories);
  }

  const goToSearch = (data) => {
    const url = encodeURI(`/searchResult?cat=${data.id}&catn=${data.name}`);
    router.push(url)
  }

  useEffect(() => {
    getCategories();
  }, [])

  return categories && (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <List component="nav" className={classes.listItemMainCont} aria-label="main mailbox folders">
            {
              categories && categories.map((data, index) => {
                return (
                  <ListItem onClick={()=>goToSearch(data)} key={index} button className={classes.listItemCont}>
                    <ListItemIcon className={classes.listItemIcons}>
                      <Icons name={data.icon} classes={{icon: classes.icon}} />
                    </ListItemIcon>
                    <ListItemText primary={data.name} className={classes.name}/>
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