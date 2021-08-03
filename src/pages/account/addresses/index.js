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

import Typography from 'src/components/common/Typography';
import CardIcon from 'src/components/common/CardIcon';
import Icons from 'src/components/common/Icons';
import { getAddressesByUser, deleteAddress, updateAddress } from 'src/api/addresses';
import UserLayoutTemplate from 'src/components/common/Layout/UserLayoutTemplate';
import AddressBox from 'src/components/address/AddressBox';
import Snackbar from 'src/components/common/Snackbar';
import { handleFormResponse } from 'src/utils/form';
import ProgressBar from 'src/components/common/ProgressBar';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
  const { t } = useTranslation(['addresses'])

  const loadAddresses = async() => {
    const getAddreseses = await getAddressesByUser();
    setAddresses(getAddreseses);
    setShowDate(true);
  }

  const addressSet = async(id) => {
    let snackResp = null;
    let data = null;
    const selectedData = await addresses.filter((address) => address.id === id)
    if (selectedData[0].selected) {
      data = {
        unfavorite: id,
        user: userInfo.id,
      }
    } else {
      data = {
        favorite: id,
        user: userInfo.id,
      }
    }

    const res = await updateAddress(data, id);
    if (res.status) {
      snackResp = handleFormResponse(res)
    } else {
      snackResp = handleFormResponse(res)
    }
    setSnack(snackResp)
    loadAddresses();
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
            <Typography align="left" variant="h4" component="h3">{ t('my_addresses') }</Typography>
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
                    onClickSet={addressSet}
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

/** This section is mandatory for next-18next translation to work, only inside /pages */
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'addresses', 'footer']),
  },
})

export default connect(mapStateToProps)(withStyles(styles)(Index));