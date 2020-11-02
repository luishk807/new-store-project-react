import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Grid,
} from '@material-ui/core';

import Typography from '../../../components/common/Typography';
import CardIcon from '../../../components/common/CardIcon';
import Icons from '../../../components/common/Icons';
import { getAddresses } from '../../../api/addresses';
import UserLayoutTemplate from '../../../components/common/Layout/UserLayoutTemplate';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
});

const Index = ({classes, userInfo}) => {
  const router = useRouter();
  const [addresses, setAddresses] = useState([])
  const [showData, setShowDate] = useState(false);

  const loadAddresses = async() => {
    const getAddreseses = await getAddresses();
    setAddresses(getAddreseses);
    setShowDate(true);
  }

  useEffect(() => {
    loadAddresses();
  }, [])
  return (
    <UserLayoutTemplate>
      <div className={classes.root}>
        <Typography align="left" variant="h4" component="h3">My Addresses [<Link href="addresses/add">Add</Link>]</Typography>
        <Grid container>
          <Grid item lg={12}>
          {
            showData && addresses ? addresses.map((address, key) => {
              return (
                <Grid container spacing={2}>
                  <Grid item>{address.name}</Grid>
                  <Grid item>{address.address}</Grid>
                  <Grid item>{address.provice}</Grid>
                  <Grid item>{address.township}</Grid>
                  <Grid item>{address.city}</Grid>
                  <Grid item>{address.addressCountry.iso}</Grid>
                  <Grid item>{address.zip}</Grid>
                </Grid>
              )
            }) : (
              <Grid container>
                <Grid item>
                    No Address Saved
                </Grid>
              </Grid>
            )
          }
          </Grid>
        </Grid>
      </div>
    </UserLayoutTemplate>
  );
}
 
Index.protoTypes = {
  classes: T.object,
}

const mapStateToProps = state => ({
  userInfo: state.user
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(Index));