import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
} from '@material-ui/core';

import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import { deleteCategory } from '../../../api/admin/categories';
import Api from '../../../services/api';
import Snackbar from '../../../components/common/Snackbar';
import Icons from '../../../components/common/Icons';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  categoryIcon: {
    width: 80,
    height: 80,
    fill: '#000',
  },
  item: {
    padding: 5
  },
  mainImage: {
    width: 150,
  }
});

const Index = ({classes}) => {
  const [categories, setCategories] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delCategory = async(id) => {
    deleteCategory(id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: 'Category Deleted',
      })
      loadCategories()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: 'ERROR: Category cannot be delete',
      })
    })
  }

  const loadCategories = async() => {
    const getCategories = await Api.get("/categories");
    const categoryHtml = getCategories.map((category, index) => {
      return (
        <Grid item key={index} lg={12} className={classes.item}>
          <Grid container>
            <Grid item lg={1} xs={12}>
             {index + 1}
            </Grid>
            <Grid item lg={3} xs={12}>
               <Icons name={category.icon} classes={{icon: classes.categoryIcon}}/>
            </Grid>
            <Grid item lg={3} xs={12}>
              <Link href="categories/[cid]" as={`categories/${category.id}`}>
                {category.name}
              </Link>
            </Grid>
            <Grid item lg={5} xs={12}>
              [
                <Button onClick={()=> { delCategory(category.id) }}>
                  delete
                </Button>
              ]
            </Grid>
          </Grid>
        </Grid>
      )
    })
    setCategories(categoryHtml);
  }
  
  useEffect(() => {
    loadCategories();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <Grid container className={classes.root}>
        <Grid item xs={12} lg={12}>
          <h1>Categories</h1>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
              <Grid item lg={12} xs={12}>
                  [
                    <Link href="categories/add">
                      Add Categories
                    </Link>
                  ]
              </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Grid container>
            <Grid item lg={1} xs={12}>

            </Grid>
            <Grid item lg={3} xs={12}>
              icon
            </Grid>
            <Grid item lg={3} xs={12}>
              name
            </Grid>
            <Grid item lg={5} xs={12}>
              action
            </Grid>
          </Grid>
          <Grid container>
            {
              categories && categories
            }
          </Grid>
        </Grid>
      </Grid>
    </AdminLayoutTemplate>
  );
}

Index.protoTypes = {
  classes: T.object
}

export default withStyles(styles)(Index);