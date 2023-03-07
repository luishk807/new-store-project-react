import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
} from '@material-ui/core';
import { getCategories } from '@/api/categories';
import CategoryIcons from './CategoryIcons';

const styles = () => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: 'black'
  },
  cubeItems: {},
  cubeMainTitle: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    padding: 5,
  },
  cubeTitleContainer: {
    width: '100%',
  },
  cubeCategoryContainer: {
    width: '100%',
    overflowY: 'auto',
  },
});

const CategorySelector = ({ classes, cubeSize, showTitle }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      let unmounted = true
      const categories = await getCategories();
      if (unmounted) {
        setCategories(categories);
      }
      return (() => unmounted = false)
    })()
  }, [])

  return (
    <div className={classes.root}>
      {
        showTitle && (
          <Grid container className={`${classes.cubeTitleContainer}`}>
            <Grid item lg={12} className={classes.cubeMainTitle}>Categories</Grid>
          </Grid>
        )
      }
      <Grid container className={`${classes.cubeCategoryContainer}`}>
        {
          categories && categories.map((category, index) => {
            return <CategoryIcons key={index} category={category} size={cubeSize} />
          })
        }
      </Grid>
    </div>
  );
}

CategorySelector.propTypes = {
  classes: T.object,
  cubeSize: T.string,
  showTitle: T.bool
};

export default withStyles(styles)(CategorySelector);