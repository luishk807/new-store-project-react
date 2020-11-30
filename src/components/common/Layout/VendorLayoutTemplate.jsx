import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import {
  withStyles,
  Grid,
  Button
} from '@material-ui/core';

import Typography from '../../../components/common/Typography';
import UserLayoutTemplate from './UserLayoutTemplate';
import { USER_SECTIONS } from '../../../constants/user';
import AddForm from '../../../components/common/Form/AddForm';
import { defaultCountry } from '../../../../config';
import { logout } from '../../../api/auth';

const styles = (theme) => ({
  root: {},
});

const VendorLayoutTemplate = ({classes, userInfo, children, vendorInfo}) => {
  const router = useRouter();
  const [vendor, setVendor] = useState(false);

  const form = {
    name: null,
    email: null,
    position: null,
    description: null,
    user: userInfo.id,
    address: null,
    email: null,
    mobile: null,
    phone: null,
    province: null,
    township: null,
    country: defaultCountry,
    image: {
      values: [],
      open: false,
    }
  }
  const ignoreEntry = ['image', 'user'];

  const hideEntry = ['user']

  const onLogOut = () => {
    if (logout()) {
      router.push('/')
    }
  }

  const loadVendorUser = async(vendor) => {
    if (vendor && Object.keys(vendor).length) {
      setVendor(vendorInfo);
    }
  }

  useEffect(() => {
    loadVendorUser(vendorInfo);
  }, [vendorInfo])

  return (
    <UserLayoutTemplate>
      <div className={classes.root}>
        <Typography align="left" variant="h4" component="h3">
          {vendor ? `Welcome ${vendor.name} ` : `Welcome`}
          {
            vendor && (
              <Button onClick={()=>router.push('/account/vendor')} href="#" className={classes.smallLink}>[Back to vendor]</Button>
            )
          }
          <Button onClick={()=>router.push('/account')} href="#" className={classes.smallLink}>[Back to user]</Button>
          <Button onClick={onLogOut} href="#" className={classes.smallLink}>[Log out]</Button>
        </Typography>
        <Grid container spacing={2}>
          {
             vendor ? (
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {
                  children
                }
              </Grid>
             ) : (
               <AddForm userSection={USER_SECTIONS.vendor} name="vendor" ignoreForm={ignoreEntry} customUrl={`/account`} entryForm={form} hideEntry={hideEntry} />
             )
          }

        </Grid>
      </div>
    </UserLayoutTemplate>
  )
};

VendorLayoutTemplate.protoTypes = {
  classes: T.object,
  children: T.node
}


const mapStateToProps = state => ({
  userInfo: state.user,
  vendorInfo: state.vendor
}) // add reducer access to props


export default connect(mapStateToProps)(withStyles(styles)(VendorLayoutTemplate));