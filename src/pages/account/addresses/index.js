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
import { getAddresses, deleteAddress } from '../../../api/addresses';
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
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  icon: {
    width: 120,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    let snackResp = null
    const res = await deleteAddress(id)
    if (res.status) {
      snackResp = handleFormResponse(res)
    } else {
      snackResp = handleFormResponse(res)
    }
    console.log(addresses)
    const fixAddress = addresses.filter((item) => item.id !== id);
    setAddresses(fixAddress)
    setSnack(snackResp)
  }

  const addressUpdate = (id) => {
    router.push(`addresses/${id}`)
  }

  useEffect(() => {
    loadAddresses();
  }, [])

  return (
    <UserLayoutTemplate>
      <div className={classes.root}>
        <Typography align="left" variant="h4" component="h3">My Addresses</Typography>
        <Grid container>
          <Grid item lg={12}>
            <Grid container>
              <Grid item lg={3}>
                <CardIcon link={`addresses/add`} title="Add Address">
                  <Icons name="add" classes={{icon: classes.icon}}/>
                </CardIcon>
              </Grid>
            </Grid>
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