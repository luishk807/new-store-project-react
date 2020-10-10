import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
} from '@material-ui/core';

import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import { deleteItem } from '../../../api';
import Api from '../../../services/api';
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
  const [stores, setStores] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delStore = async(id) => {
    deleteItem(ADMIN_SECTIONS.store.url,id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `${ADMIN_SECTIONS.store.name} Deleted`,
      })
      loadStores()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: ${ADMIN_SECTIONS.store.name} cannot be delete`,
      })
    })
  }

  const loadStores = async() => {
    const getStores = await Api.get(`/${ADMIN_SECTIONS.store.url}`);
    const storeHtml = getStores.map((store, index) => {
      return (
        <Grid item key={index} lg={12} className={classes.item}>
          <Grid container>
            <Grid item lg={1} xs={12}>
             {index + 1}
            </Grid>
            <Grid item lg={2} xs={12}>
              <Link href={`${ADMIN_SECTIONS.store.url}/[vid]`} as={`${ADMIN_SECTIONS.store.url}/${store.id}`}>
                {store.name}
              </Link>
            </Grid>
            <Grid item lg={4} xs={12}>
                {store.address}
            </Grid>
            <Grid item lg={2} xs={12}>
              {store.phone}
            </Grid>
            <Grid item lg={3} xs={12}>
              [
                <Button onClick={()=> { delStore(store.id) }}>
                  delete
                </Button>
              ]
            </Grid>
          </Grid>
        </Grid>
      )
    })
    setStores(storeHtml);
  }
  
  useEffect(() => {
    loadStores();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <Grid container className={classes.root}>
        <Grid item xs={12} lg={12}>
          <h1>Stores</h1>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
              <Grid item lg={12} xs={12}>
                  [
                    <Link href={`${ADMIN_SECTIONS.store.url}/add`}>
                      Add Store
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
            <Grid item lg={4} xs={12}>
              address
            </Grid>
            <Grid item lg={2} xs={12}>
              phone
            </Grid>
            <Grid item lg={3} xs={12}>
              action
            </Grid>
          </Grid>
          <Grid container>
            {
              stores && stores
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