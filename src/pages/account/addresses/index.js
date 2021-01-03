import React, { useEffect, useState } from 'react';
import * as T from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  withStyles,
  Link,
  Button,
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
import ProgressBar from '../../../components/common/ProgressBar';

const styles = (theme) => ({
  root: {
    padding: 5,
  },
  headerItem: {
    display: 'flex',
    alignItems: 'center',
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
  addIcon: {
    width: 40,
    height: 40,
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
        <Grid container>
          <Grid item lg={12} xs={12} className={classes.headerItem}>
            <Typography align="left" variant="h4" component="h3">My Addresses</Typography>
            &nbsp;&nbsp;<Button href={`addresses/add`}>
              <Icons name="addCircle" classes={{icon: classes.addIcon}}/>
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={12}>
            {
              showData ? addresses.map((address, index) => {
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
                <ProgressBar />
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