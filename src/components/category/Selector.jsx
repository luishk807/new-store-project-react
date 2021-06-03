import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  Button,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import { getCategories } from '../../api/categories';
import Icons from '../common/Icons';
import { getCatSearch } from '../../utils';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
    height: '100%',
    position: 'relative',
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: 'black'
  },
  cubeMainTitle: {
    color: 'white',
    textAlign: 'center', 
    textTransform: 'uppercase',
    padding: 5,
  },
  cubeBtn: {
    borderRadius: 0,
    width: '100%',
    textAlign: 'center',
    '&:hover': {
      background: 'white',
      '& div': {
        color: 'inherit',
      },
      '& svg': {
        fill: 'rgb(248,190,12)',
      }
    },
    '& span': {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  cubeTitleContainer: {
    width: '100%',
  },
  cubeCategoryContainer: {
    width: '100%',
    overflowY: 'auto',
  },
  cubeItems: {
  },
  cubeIconHolder: {
    width: '100%',
  },
  cubeIcon: {
    width: 50,
    height: 50,
    fill: 'white',
  },
  cubeName: {
    width: '100%',
    color: 'white',
    fontSize: '.8em',
  },
  cardBlockHolders: {
    '& span': {
      flexDirection: 'column'
    }
  }
});

const CategorySelector = ({classes, cubeSize, showTitle}) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(true);

  const loadCategories = async() => {
    const categories = await getCategories();
    setCategories(categories);
  }

  const goToSearch = async(data) => {
    const url = await getCatSearch(data);
    router.push(url)
  }

  useEffect(() => {
    loadCategories();
  }, [])

  return categories && (
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
          categories && categories.map((data, index) => {
            return (
              <Grid item lg={cubeSize ? Number(cubeSize) : 12} key={index} className={classes.cubeItems}>
                <Button onClick={() => goToSearch(data)} className={`cardRoot2 ${classes.cardBlockHolders}`}>
                  <div className={classes.cubeIconHolder}>
                    <Icons name={data.icon} classes={{icon: classes.cubeIcon}} />
                  </div>
                  <div className={classes.cubeName}>
                    {
                      data.name
                    }
                  </div>
                </Button>
              </Grid>
            )
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