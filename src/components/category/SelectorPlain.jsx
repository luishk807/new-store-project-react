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
import { useRouter } from 'next/router';

import Modal from '../common/Modal';
import { ProductGallerySample } from '../../constants/samples/ProductCategoryIconsSample';
import { ADMIN_SECTIONS } from '../../constants/admin';
import { getItems } from '../../api';
import { getCategories } from '../../api/categories';
import { searchProductsByCat } from '../../api/products';
import Icons from '../common/Icons';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflowX: 'auto',
    height: '100%',
    position: 'relative',
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
  },

  cubeMainTitle: {
    color: 'white',
    textAlign: 'center', 
    textTransform: 'uppercase',
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
  cubeContainer: {
    width: '100%',
    backgroundColor: 'black'
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
});

const CategorySelectorPlain = ({classes, data, type}) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(true);

  const getCategories = async() => {
    const categories = await getItems(`${ADMIN_SECTIONS.category.url}`);
    setCategories(categories);
  }

  const goToSearch = (data) => {
    const url = encodeURI(`/searchResult?cat=${data.id}&catn=${data.name}`);
    router.push(url)
  }

  const content = () => {
    switch(type) {
      case "cube": {
        return (
          <Grid container className={`${classes.cubeContainer}`}>
            <Grid item lg={12} className={classes.cubeMainTitle}>Categories</Grid>
            {
              categories && categories.map((data, index) => {
                return (
                  <Grid item lg={6} key={index} className={classes.cubeItems}>
                    <Button onClick={() => goToSearch(data)} className={`cardRoot2`}>
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
        )
        break;
      }
      default: {
        return (
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
        )
      }
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  return categories && (
    <div className={classes.root}>
      {
        content()
      }
    </div>
  );
}

CategorySelectorPlain.propTypes = {
  classes: T.object.isRequired,
  type: T.string,
  data: T.object,
};

export default withStyles(styles)(CategorySelectorPlain);