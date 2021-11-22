import React, { useState, useEffect } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';

import { connect } from 'react-redux';
import { finished } from 'stream';
import { useTranslation } from 'next-i18next'
import { formatNumber } from 'src/utils';
import { defaultCountry } from 'config';
import { validateForm, handleFormResponse } from 'src/utils/form';
import { getAddressesByUser, getAddressById, createAddress } from 'src/api/addresses';
import Icons from '@/components/common/Icons';
import Snackbar from '@/components/common/Snackbar';
import ActionForm from '@/components/common/Form/Action/Add';
import RadioBox from '@/components/common/RadioBox';

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: 10,
  },
  formRoot: {
    width: '100% !important',
    margin: '0px',
    textAlign: 'left',
    '& h4': {
      fontSize: '1.5em',
      padding: 10,
    }
  },
  addressBox: {
    padding: 10,
    margin: '10px 0px',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerTitleItem: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
  headerBtnItem: {
    display: 'flex',
    alignItems: 'center',
  }
});


const AddressSelection = ({classes, onSelected, userId, showTitle = true }) => {
  const [userAddress, setUserAddress] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [showAction, setShowAction] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showData, setShowData] = useState(false);
  const [form, setForm] = useState({});
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation('common')


  const changeContent = async(action) => {
    await setShowAction(action);
    loadActionHtml();
  }


  const loadUserAddress = async() => {
    let getAdd = null;
    const addresses = await getAddressesByUser()
    if (addresses && !addresses.length || !addresses) {
      setShowAction('add');
    } else {
      getAdd = addresses.filter(address => address.selected === true);
      if (!getAdd) {
        getAdd = addresses[0];
      }

      let getSimple = formatSimpleAddress(getAdd[0]);
      setUserAddresses(addresses);
      setUserAddress(getAdd[0])
      onSelected(getSimple);
      setShowAction(null);
    }
    setShowData(true); 
  }

  const formatSimpleAddress = (add) => {
    return {
      name: add.name,
      address: add.address,
      addressB: add.addressB,
      email: add.email,
      phone: add.phone,
      province: add.addressProvince,
      district: add.addressDistrict,
      corregimiento: add.addressCorregimiento,
      // zone: add.addressZone,
      none: add.note,
      country: add.addressCountry,
    }
  }

  const handleDeliveryForm = async(subform) => {
    subform = {
      ...subform,
      user: userId
    }
    const confirm = await createAddress(subform);
    const resp = handleFormResponse(confirm);
    resetForm();
    onSelected(subform);
    loadUserAddress()
    changeContent(null);
    setSnack(resp);
  }

  const handleDeliveryCancel = async() => {
    await changeContent(null)
  }

  const handleRadioSelect = (evt) => {
    const findAddres = userAddresses.filter(item => item.id == evt[0].id)
    if (findAddres && findAddres.length) {
      const listAddresses = userAddresses.map((item) => {
        item = {
          ...item,
          selected: findAddres[0].id === item.id ? true : false
        }
        return item
      })
      setUserAddresses(listAddresses)
      setUserAddress(findAddres[0])
      onSelected(findAddres[0]);
    }
    changeContent(null)
  }

  const loadActionHtml = () => {
    switch(showAction) {
      case 'list': {
        return (
          <Grid container className={classes.headerContainer}>
            {
              showTitle ? (
                <>
                <Grid item lg={9} xs={9} className={classes.headerTitleItem}>
                { t('shipping_address') }
                </Grid>
                <Grid item lg={3} xs={3} className={classes.headerBtnItem}>
                  <Button onClick={() => changeContent(null)} className={`mainButton`}>
                  { t('cancel') }
                  </Button>
                </Grid>
                </>
              ) : (
                <Grid item lg={3} xs={3} className={classes.headerBtnItem}>
                  <Button onClick={() => changeContent(null)} className={`mainButton`}>
                  { t('cancel') }
                  </Button>
                </Grid>
              )
            }
            <Grid item lg={12} xs={12} className={classes.addressBox}>
              <RadioBox options={userAddresses} name="address" type="address" onSelected={handleRadioSelect} />
            </Grid>
            <Grid item lg={5} xs={12} className={classes.headerBtnItem}>
              <Button onClick={() => changeContent('add')} className={`mainButton`}>
                { t('add') }
              </Button>
            </Grid>
          </Grid>
        )
        break;
      }
      case 'add': {
        return (
          <Grid container className={classes.headerContainer}>
            <ActionForm 
              classes={{root: classes.formRoot}}
              formSection={{
                name: 'Direccion de entrega',
              }} 
              ignoreForm={['selected']}
              showCancel={true}
              showTitle={showTitle}
              onCancel={handleDeliveryCancel}
              entryForm={form} 
              onSubmitAction={handleDeliveryForm}
              type="action"
            />
          </Grid>
        )
        break;
      }
      default: {
        return (
          <Grid container className={classes.headerContainer}>
            {
              showTitle ? (
                <>
                <Grid item lg={9} xs={9} className={classes.headerTitleItem}>
                    { t('shipping_address') }
                </Grid>
                <Grid item lg={3} xs={3} className={classes.headerBtnItem}>
                  <Button onClick={() => changeContent('list')} className={`mainButton`}>
                    { t('change') }
                  </Button>
                </Grid>
                </>
              ) : (
                <Grid item lg={3} xs={3} className={classes.headerBtnItem}>
                  <Button onClick={() => changeContent('list')} className={`mainButton`}>
                    { t('change') }
                  </Button>
                </Grid>
              )
            }

            {
              userAddress && (
                <Grid item lg={12} xs={12} className={classes.addressBox}>
                  <p>{userAddress.name}</p>
                  <p>{userAddress.address}</p>
                  {
                    userAddress.addressProvince && (
                      <p>{userAddress.addressProvince.name}</p>
                    )
                  }
                  {
                    userAddress.addressDistrict && (
                      <p>{userAddress.addressDistrict.name}</p>
                    )
                  }
                  {
                    userAddress.addressCorregimiento && (
                      <p>{userAddress.addressCorregimiento.name}</p>
                    )
                  }
                  {/* {
                    userAddress.addressZone && (
                      <p>{userAddress.addressZone.name}</p>
                    )
                  } */}
                  {
                    userAddress.note && userAddress.note !== "null" && (<p>{userAddress.note && userAddress.note}</p>)
                  }
                  {
                    userAddress.addressCountry && (
                      <p>{userAddress.addressCountry.nicename}</p>
                    )
                  }
                </Grid>
              )
            }
          </Grid>
        )
      }
    }
  }

  const resetForm = () => {
    setForm({
      name: null,
      email: null,
      phone: null,
      address: null,
      addressB: null,
      province: null,
      district: null,
      corregimiento: null,
      // zone: null,
      country: defaultCountry,
      note: null,
      selected: true
    })
  }
  useEffect(() => {
   resetForm()
   loadUserAddress();
  }, [])

  return showData && (
    <div className={classes.root}>
      {
        loadActionHtml()
      }
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false})} content={snack.text} />
    </div>
  );
}

AddressSelection.protoTypes = {
  classes: T.object,
  data: T.object,
  onSelected: T.func,
  showTitle: T.bool
}

const mapStateToProps = state => ({
  userInfo: state.user,
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(AddressSelection));