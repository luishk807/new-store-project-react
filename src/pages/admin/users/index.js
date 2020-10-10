import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
} from '@material-ui/core';

import AdminLayoutTemplate from '../../../components/common/Layout/AdminLayoutTemplate';
import { deleteItem } from '../../../api/admin';
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
  const [users, setUsers] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delUser = async(id) => {
    deleteItem(ADMIN_SECTIONS.user.url,id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `${ADMIN_SECTIONS.user.name} Deleted`,
      })
      loadUsers()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: ${ADMIN_SECTIONS.user.name} cannot be delete`,
      })
    })
  }

  const loadUsers = async() => {
    const getStores = await Api.get(`/${ADMIN_SECTIONS.user.url}`);
    const userHtml = getStores.map((store, index) => {
      return (
        <Grid item key={index} lg={12} className={classes.item}>
          <Grid container>
            <Grid item lg={1} xs={12}>
             {index + 1}
            </Grid>
            <Grid item lg={2} xs={12}>
              <Link href={`${ADMIN_SECTIONS.user.url}/[vid]`} as={`${ADMIN_SECTIONS.user.url}/${store.id}`}>
                {store.name}
              </Link>
            </Grid>
            <Grid item lg={4} xs={12}>
                {store.email}
            </Grid>
            <Grid item lg={2} xs={12}>
              {store.phone}
            </Grid>
            <Grid item lg={3} xs={12}>
              [
                <Button onClick={()=> { delUser(store.id) }}>
                  delete
                </Button>
              ]
            </Grid>
          </Grid>
        </Grid>
      )
    })
    setUsers(userHtml);
  }
  
  useEffect(() => {
    loadUsers();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <Grid container className={classes.root}>
        <Grid item xs={12} lg={12}>
          <h1>Users</h1>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
              <Grid item lg={12} xs={12}>
                  [
                    <Link href={`${ADMIN_SECTIONS.user.url}/add`}>
                      Add User
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
              email
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
              users && users
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