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
import { getVendorByUserId } from '../../../api/vendor';

const styles = (theme) => ({
  root: {},
});

const VendorLayoutTemplate = ({classes, userInfo, children, vendorInfo}) => {
  const router = useRouter();
  const [vendor, setVendor] = useState(false);

  const onLogOut = () => {
    if (logout()) {
      router.push('/')
    }
  }

  const loadVendorUser = async(vendor) => {
    if (vendor) {
      setVendor(vendorInfo);
    }
  }

  useEffect(() => {
    loadVendorUser(vendorInfo);
  }, [vendorInfo])

  return (
    <UserLayoutTemplate>
      <div className={classes.root}>
        <Typography align="left" variant="h4" component="h3">Welcome {vendor.name} <Button onClick={()=>router.back()} href="#" className={classes.smallLink}>[Back to vendor]</Button><Button onClick={()=>router.push('/account/vendor')} href="#" className={classes.smallLink}>[Back to user]</Button><Button onClick={onLogOut} href="#" className={classes.smallLink}>[Log out]</Button></Typography>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            {
              children
            }
          </Grid>
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