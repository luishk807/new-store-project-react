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
import AddressBox from '../../../components/common/AddressBox';
import Snackbar from '../../../components/common/Snackbar';
import { handleFormResponse } from '../../../utils/form';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  addressItem: {
    width: '25%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  }
});

const Index = ({classes, userInfo}) => {
  const router = useRouter();
  const [addresses, setAddresses] = useState([])
  const [showData, setShowDate] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });


  const loadAddresses = async() => {
    const getAddreseses = await getAddresses();
    setAddresses(getAddreseses);
    setShowDate(true);
  }

  const addressDelete = async(id) => {
    console.log('delete', id)
    const res = await deleteAddress(id)
    if (resp.status) {
      
    } else {

    }
    const snackResp = handleFormResponse(res.data)
    setSnack(snackResp)
  }

  const addressUpdate = (id) => {
    console.log('update', id)
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
            showData && addresses ? addresses.map((address, index) => {
              return (
                <AddressBox 
                  onClickEdit={addressUpdate}
                  onClickRemove={addressDelete}
                  key={index}
                  classes={{root: classes.addressItem}}
                  data={address} 
                />
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
        <Snackbar open={snack.open} severity={snack.severity} onClose={()=>{setSnack({...snack,open:false})}} content={snack.text} />
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