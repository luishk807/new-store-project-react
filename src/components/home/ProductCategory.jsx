import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  List,
  ListItem,
  Button,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel'

import SweetBox from '../sweetbox';
import { getAllCategories } from '../../api/categories';
import ProgressBar from '../common/ProgressBar';
import Icons from '../common/Icons';
import SelectorPlan from '../category/SelectorPlain';

const styles = (theme) => ({
  root: {
    position: 'relative',
  },
  categoryIconSection: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
  catRoot: {
    display: 'flex',
    alignItems: 'center'
  },
  catContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  icon: {
    width: 60,
    height: 60,
    fill: 'white',
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
  },
  name: {
    color: 'black'
  },
  catBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
    borderRadius: 5,
    padding: '15px 20px',
    backgroundColor: '#f8be15',
    '&:hover': {
      '& div': {
        color: 'inherit',
      },
      '& svg': {
        fill: '#f8be15',
      }
    },
    '& span': {
      display: 'flex',
      flexDirection: 'row'
    }
  },
  catItem: {
    margin: 5,
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'center',
    '&:hover': {
      '& > div:first-child': {
        borderBottom: '2px solid white !important',
      },
      '& svg': {
        fill: 'white'
      },
      background: '#f8be15 !important',
    }
  }
});

const ProductCategory = ({classes}) => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const loadCategories = async() => {
    const gCat = await getAllCategories();
    if (gCat) {
      setCategories(gCat)
    }
  }

  useEffect(() => {
    setShowCategories(true);
  }, [categories])

  useEffect(() => {
    loadCategories();
  }, [])

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item lg={6} xs={12}>
          <SelectorPlan type="button" classes={{
            cubeContainer: classes.catContainer, 
            root: classes.catRoot,
            cubeItems: classes.catItem, 
            icon: classes.icon, 
            cubeBtn: classes.catBtn
          }}/>
         
        </Grid>
        <Grid item lg={6} xs={12} className={classes.categoryIconSection} >
          <SweetBox type={4} plain={false}/>
        </Grid>
      </Grid>
    </div>
  );
}

ProductCategory.propTypes = {
  classes: T.object,
};

export default withStyles(styles)(ProductCategory);