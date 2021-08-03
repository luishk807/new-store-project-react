import React from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { 
  withStyles,
} from '@material-ui/core';

import EditForm from 'src/components/common/Form/EditForm';
import { USER_SECTIONS } from 'src/constants/user';
import VendorLayoutTemplate from 'src/components/common/Layout/VendorLayoutTemplate';


const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
  },
});

const Settings = ({classes, vendorInfo}) => {

  const form = {
    name: null,
    email: null,
    position: null,
    description: null,
    status: null,
    address: null,
    email: null,
    mobile: null,
    phone: null,
    province: null,
    township: null,
    country: null,
    image: {
      values: [],
      open: false,
    }
  }
  
  const ignoreEntry=['image']

  return (
    <VendorLayoutTemplate>
      <div className={classes.root}>
        <EditForm showTitle={false} ignoreForm={ignoreEntry} userSection={USER_SECTIONS.vendor} id={vendorInfo.id} entryForm={form} />
      </div>
    </VendorLayoutTemplate>
  );
}

Settings.protoTypes = {
  classes: T.object
}

const mapStateToProps = state => ({
  userInfo: state.user,
  vendorInfo: state.vendor,
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Settings));