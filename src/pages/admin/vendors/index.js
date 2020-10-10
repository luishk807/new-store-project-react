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
  const [vendors, setVendors] = useState(null);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const delVendor = async(id) => {
    deleteItem(ADMIN_SECTIONS.vendor.url,id).then((data) => {
      setSnack({
        severity: 'success',
        open: true,
        text: 'Vendor Deleted',
      })
      loadVendors()
    }).catch((err) => {
      setSnack({
        severity: 'error',
        open: true,
        text: 'ERROR: Vendor cannot be delete',
      })
    })
  }

  const loadVendors = async() => {
    const getVendors = await Api.get("/vendors");
    const vendorHtml = getVendors.map((vendor, index) => {
      const main_image = vendor.img ? vendor.img : null
      return (
        <Grid item key={index} lg={12} className={classes.item}>
          <Grid container>
            <Grid item lg={1} xs={12}>
             {index + 1}
            </Grid>
            <Grid item lg={4} xs={12}>
              <img className={classes.mainImage} src={`${process.env.IMAGE_URL}/vendors/${main_image}`} />
            </Grid>
            <Grid item lg={2} xs={12}>
              <Link href="vendors/[vid]" as={`vendors/${vendor.id}`}>
                {`${vendor.first_name} ${vendor.last_name}`}
              </Link>
            </Grid>
            <Grid item lg={2} xs={12}>
              {vendor.position}
            </Grid>
            <Grid item lg={3} xs={12}>
              [
                <Button onClick={()=> { delVendor(vendor.id) }}>
                  delete
                </Button>
              ]
            </Grid>
          </Grid>
        </Grid>
      )
    })
    setVendors(vendorHtml);
  }
  
  useEffect(() => {
    loadVendors();
  }, [])

  return (
    <AdminLayoutTemplate>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false })} content={snack.text} />
      <Grid container className={classes.root}>
        <Grid item xs={12} lg={12}>
          <h1>Vendors</h1>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
              <Grid item lg={12} xs={12}>
                  [
                    <Link href="vendors/add">
                      Add Vendor
                    </Link>
                  ]
              </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Grid container>
            <Grid item lg={1} xs={12}>

            </Grid>
            <Grid item lg={4} xs={12}>
              image
            </Grid>
            <Grid item lg={2} xs={12}>
              name
            </Grid>
            <Grid item lg={2} xs={12}>
              amount
            </Grid>
            <Grid item lg={3} xs={12}>
              action
            </Grid>
          </Grid>
          <Grid container>
            {
              vendors && vendors
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