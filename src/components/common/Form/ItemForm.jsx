import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
} from '@material-ui/core';

import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import { deleteItem, getItems } from '../../../api';

import { ADMIN_SECTIONS } from '../../../constants/admin';
import Snackbar from '../../../components/common/Snackbar';

const styles = (theme) => ({
  root: {
    padding: 10,
  },
  item: {
    padding: 5
  },
  mainImage: {
    width: 150,
  }
});

const Index = ({classes}) => {
  const selectedSection = ADMIN_SECTIONS.brand;
  const [items, setItems] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delItem = async(id) => {
    deleteItem(selectedSection.url, id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `${selectedSection.name} Deleted`,
      })
      loadItems()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: ${selectedSection.name} cannot be delete`,
      })
    })
  }

  const loadItems = async() => {
    const getItemResult = await getItems(selectedSection.url);
    const itemHtml = getItemResult.map((item, index) => {
      return (
        <Grid item key={index} lg={12} className={classes.item}>
          <Grid container>
            <Grid item lg={1} xs={12}>
             {index + 1}
            </Grid>
            <Grid item lg={4} xs={12}>
              <img className={classes.mainImage} src={`${process.env.IMAGE_URL}/${selectedSection.url}/${item.img}`} />
            </Grid>
            <Grid item lg={2} xs={12}>
              <Link href={`${selectedSection.url}/[bid]`} as={`${selectedSection.url}/${item.id}`}>
                {item.name}
              </Link>
            </Grid>
            <Grid item lg={2} xs={12}>
              {item.amount}
            </Grid>
            <Grid item lg={3} xs={12}>
              [
                <Button onClick={()=> { delItem(item.id) }}>
                  delete
                </Button>
              ]
            </Grid>
          </Grid>
        </Grid>
      )
    })
    setItems(itemHtml);
  }
  
  useEffect(() => {
    loadItems();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <Grid container className={classes.root}>
        <Grid item xs={12} lg={12}>
          <h1>{selectedSection.names}</h1>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
              <Grid item lg={12} xs={12}>
                  [
                    <Link href={`${selectedSection.url}/add`}>
                      Add {selectedSection.names}
                    </Link>
                  ]
              </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Grid container>
            <Grid item lg={1} xs={12}>

            </Grid>
            <Grid item lg={2} xs={12}>
              name
            </Grid>
            <Grid item lg={3} xs={12}>
              action
            </Grid>
          </Grid>
          <Grid container>
            {
              items && items
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