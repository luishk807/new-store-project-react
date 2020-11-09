import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Grid,
  Button
} from '@material-ui/core';

import Typography from '../../../components/common/Typography';
import { VENDOR_SECTIONS } from '../../../constants/vendor'
import CardIcon from '../../../components/common/CardIcon';
import Icons from '../../../components/common/Icons';
import VendorLayoutTemplate from '../../../components/common/Layout/VendorLayoutTemplate';
import { logout } from '../../../api/auth';
import { getVendorByUserId } from '../../../api/vendor';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  smallLink: {
    fontSize: '.6em',
  },
});

const Index = ({classes, userInfo}) => {
  const router = useRouter();

  return (
    <VendorLayoutTemplate>
      <div className={classes.root}>
        <Grid container spacing={2}>
        {
          VENDOR_SECTIONS.map((button, index) => {
            return (
              <Grid key={index} item lg={3} xs={12}>
                <CardIcon link={`/account/vendor/${button.url}`} title={button.label}>
                  <Icons name={button.name} />
                </CardIcon>
              </Grid>
            )
          })
        }
        </Grid>
      </div>
    </VendorLayoutTemplate>
  );
}
 
Index.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Index));