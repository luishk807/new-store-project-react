import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import * as T from 'prop-types';
import { withStyles } from '@material-ui/core';
import { 
  Grid,
  Button,
} from '@material-ui/core';

import AdminLayoutTemplate from '../../../../components/common/Layout/AdminLayoutTemplate';
import { deleteItem } from '../../../../api/admin';
import Api from '../../../../services/api';
import { ADMIN_SECTIONS } from '../../../../constants/admin';
import Snackbar from '../../../../components/common/Snackbar';

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
  const [userAddress, setUserAddress] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delAddress = async(id) => {
    deleteItem(ADMIN_SECTIONS.userAddress.url,id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: `${ADMIN_SECTIONS.userAddress.name} Deleted`,
      })
      loadUserAddresses()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: `ERROR: ${ADMIN_SECTIONS.userAddress.name} cannot be delete`,
      })
    })
  }

  const loadUserAddresses = async() => {
    const getUserAddress = await Api.get(`/${ADMIN_SECTIONS.userAddress.url}`);
    const userAddressHtml = getUserAddress.map((address, index) => {
      return (
        <Grid item key={index} lg={12} className={classes.item}>
          <Grid container>
            <Grid item lg={1} xs={12}>
             {index + 1}
            </Grid>
            <Grid item lg={2} xs={12}>
              <Link href={`${ADMIN_SECTIONS.userAddress.url}/[vid]`} as={`${ADMIN_SECTIONS.userAddress.url}/${address.id}`}>
                {address.name}
              </Link>
            </Grid>
            <Grid item lg={4} xs={12}>
                {address.address}
            </Grid>
            <Grid item lg={2} xs={12}>
              {address.phone}
            </Grid>
            <Grid item lg={3} xs={12}>
              [
                <Button onClick={()=> { delAddress(address.id) }}>
                  delete
                </Button>
              ]
            </Grid>
          </Grid>
        </Grid>
      )
    })
    setUserAddress(userAddressHtml);
  }
  
  useEffect(() => {
    loadUserAddresses();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <Grid container className={classes.root}>
        <Grid item xs={12} lg={12}>
          <h1>User Addresses</h1>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
              <Grid item lg={12} xs={12}>
                  [
                    <Link href={`${ADMIN_SECTIONS.userAddress.url}/add`}>
                      Add Address
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
              userAddress && userAddress
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