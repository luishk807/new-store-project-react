import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import {
  withStyles,
  Grid,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Typography from '@/components/common/Typography';
import UserLayoutTemplate from './UserLayoutTemplate';
import { USER_SECTIONS } from '@/constants/user';
import Icons from '@/common/Icons';
import AddForm from '@components/common/Form/AddForm';
import { defaultCountry } from '@/config';
import { logout } from '@/api/auth';
import DotMenu from '@/components/common/DotMenu';

const styles = (theme) => ({
  root: {},
  icon: {
    width: 37,
    height: 37,
    fill: '#000',
  },
  topContainer: {
    padding: 9,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    }
  },
  logoutContainer: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  }
});

const VendorLayoutTemplate = ({classes, userInfo, children, vendorInfo}) => {
  const router = useRouter();
  const [vendor, setVendor] = useState(false);

  const options = [
    {
      name: 'Account',
      url: '/account'
    },
    {
      name: 'Vendor', 
      url: '/account/vendor',
    },
    {
      name: 'Add product',
      url: '/account/vendor/add'
    },
    {
      name: 'Import product',
      url: '/account/vendor/import'
    },
    {
      name: 'Logout',
      url: 'logout'
    },
  ];

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
        <Grid container className={classes.topContainer}>
          <Grid item lg={8} align="left">
            <Typography align="left" variant="h4" component="h3" >
              {vendor ? `Welcome ${vendor.name} ` : `Welcome`}
              <DotMenu options={options} />
            </Typography>
          </Grid>
          <Grid item lg={4} align="right" className={classes.logoutContainer}>
            <Button onClick={onLogOut} href="#" className={classes.smallLink}>
              <Icons name="logout"  classes={{icon: classes.icon}} />
            </Button>
          </Grid>
        </Grid>
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