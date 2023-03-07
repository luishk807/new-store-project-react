import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid
} from '@material-ui/core';

import { defaultCountry } from '@/config';
import { getFormatAddressText } from 'src/utils';
import AddressSelectionSelect from '@/components/address/AddressSelectionSelect';
import ProgressBar from '@/common/ProgressBar';
import ActionForm from '@/common/Form/Action/Add';
import { useTranslation } from 'next-i18next'

const styles = (theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
    }
  },
  addressItem: {
    whiteSpace: 'pre-line'
  },
  addressBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  editBtn: {
    padding: 5,
    textTransform: 'capitalize'
  },
  headerContainer: {
    display: 'flex',
    margin: '10px 0px',
    justifyContent: 'center'
  },
  itemHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    display: 'flex',
    margin: 5,
  },
  sectionTitleRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  subTitle: {
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    margin: 5,
    alignItems: 'center',
  },
  addressContainer: {

  },
  sectionTitleRight_btnCnt: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  guessForm: {
    width: '100%',
    '& form': {
      width: '100%'
    }
  }
});

const AddressMainBox = ({
  classes, 
  onAddressSubmit, 
  initialAddress = null, 
  userId = null, 
  deliveryOption, 
  showTitle, 
  updateAddress, 
  onHandleRevert: revertAddress 
}) => {
  const [disableFields, setDisabledFields] = useState([]);
  const [forceAddressRefresh, setForceAdddressRefresh] = useState(null);
  const [savedUserAddress, setSavedUserAddress] = useState(null);
  const [address, setAddress] = useState({});
  const [currDeliveryOption, setCurrDeliveryOption] = useState(null)
  const [showAddressLoader, setShowAddressLoader] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null)
  const [guestAddress, setGuestAddress] = useState({});
  const [showUserAddress, setShowUserAddress] = useState(false);

  const { t } = useTranslation(['common', 'checkout', 'addresses','order'])

  const handleAddressSelection = async(evt) => {
    if (evt) {
      handleDeliveryForm(evt)
    } 
    else {
      handleAddressFormCancel()
    }

  }

  const handleAddressFormCancel = (e) => {
    setShowUserAddress(true)
  }

  const getObjectValue = (obj, prop = null, key = null) => {

    if (prop && obj[prop]) {
      if (key) {
        return obj[prop][key];
      }
      return obj[prop]['name'];
    }
    else if (key && obj[key]) {
      return obj[key];
    }
    return null;
  }

  const handleDeliveryForm = (e) => {
    onAddressSubmit({
      shipping_name: e.name,
      shipping_address: e.address,
      shipping_addressB: e.addressB,
      shipping_province: getObjectValue(e, 'province'),
      shipping_township: getObjectValue(e, 'township'),
      shipping_corregimiento: getObjectValue(e, 'corregimiento'),
      shipping_district: getObjectValue(e, 'district'),
      shipping_zone: e.zone,
      shipping_city: e.city,
      shipping_country: getObjectValue(e, 'country'),
      shipping_zip: e.zip,
      shipping_note: e.note,
      shipping_email: e.email,
      shipping_phone: e.phone,
    })
    setShowUserAddress(true)
  }

  const handleRevert = () => {
    revertAddress()
    setShowUserAddress(!showUserAddress)
  }
  const handleEditButton = (e) => {
    setShowUserAddress(!showUserAddress)
  }

  const setProperAddress = () => {
   setShowAddressLoader(true)
    switch(currDeliveryOption) {
      case '1': {
        setAddress({
          name: initialAddress.shipping_name,
          email: initialAddress.shipping_email,
          phone: initialAddress.shipping_phone,
        })
        break;
      } default: {
        setAddress({
          name: initialAddress.shipping_name,
          address: null,
          addressB: null,
          email: initialAddress.shipping_email,
          phone: initialAddress.shipping_phone,
          province: null,
          district: null,
          corregimiento: null,
          country: defaultCountry,
          note: null,
        })
      }
    }
  }

  useEffect(() => {
    setShowAddressLoader(false)
  }, [address])

  useEffect(() => { 
    if (deliveryOption && deliveryOption.id !== currDeliveryOption) {
      setCurrDeliveryOption(deliveryOption.id)
    }
  }, [deliveryOption])

  useEffect(() => {
    setProperAddress();

  }, [currDeliveryOption]);
  
  useEffect(() => {
    if (forceAddressRefresh !== updateAddress) {
      setForceAdddressRefresh(updateAddress)
    }
    setProperAddress();

    if (initialAddress) {
      const getFormatAddress = getFormatAddressText(initialAddress)
      setSavedUserAddress(getFormatAddress)
    } else {
      setSavedUserAddress(null)
    }

  }, [updateAddress])



  useEffect(() => {
    if (savedUserAddress) {
      setShowUserAddress(true)
    } else {
      setShowUserAddress(false)
    }
  }, [savedUserAddress]);

  useEffect(() => {
  }, [guestAddress])

  const handleChange = ({key, val}) => {

    if (key && val) {
      setGuestAddress({
        ...guestAddress,
        [key]: val
      })
    }
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.addressContainer} spacing={2}>
          <Grid item lg={12} xs={12} className={classes.itemHeader}>
              <Grid container className={`${classes.headerContainer} ${classes.addressBox}`}>
                <Grid item lg={12} className={classes.sectionTitle}>
                  <Grid item lg={9} xs={7} className={classes.subTitle}>
                      { t('common:shipping_address') }
                  </Grid>
                  <Grid item lg={3} xs={5} className={classes.sectionTitleRight}>
                    <Grid container spacing={1} className={classes.sectionTitleRight_btnCnt}>
                        {
                          showUserAddress ? (
                            <Grid item lg={6} xs={6}>
                              <button onClick={handleEditButton} className={`secondButton ${classes.editBtn}`}> { t('common:change') }</button>
                            </Grid>
                          ) : (
                            <Grid item lg={6} xs={6}>
                              <button onClick={handleRevert} className={`secondButton ${classes.editBtn}`}> {  t('common:revert') }</button>
                            </Grid>
                          )
                        }

                    </Grid>
                  </Grid>
                </Grid>
                {
                  showUserAddress ? (
                    <Grid item className={classes.addressItem}>{savedUserAddress}</Grid>
                  ) : (
                    <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                      {
                        userId ? (
                            <AddressSelectionSelect showTitle={showTitle} userId={userId} onSelected={handleAddressSelection} />
                          ) : showAddressLoader ? (
                            <ProgressBar />
                          ) : (
                            <ActionForm 
                              classes={{root: classes.guessForm}}
                              formSection={{
                                name: selectedDeliveryOption && selectedDeliveryOption.id == 1 ? t('common:delivery_option_pickup') :  t('checkout:delivery_option_delivery') ,
                              }} 
                              showTitle={showTitle}
                              onCancel={handleAddressFormCancel}
                              disableFields={disableFields}
                              resetPanamaSection={forceAddressRefresh}
                              forceRefresh={forceAddressRefresh}
                              onFormChange={handleChange}
                              ignoreForm={['province', 'district', 'corregimiento', 'email', 'note', 'addressB', 'zone', 'phone', 'country']}
                              entryForm={address} 
                              onSubmitAction={handleDeliveryForm}
                              actionButtonName="Save"
                            />
                          )
                      }
                    </Grid>
                  )
                }




              </Grid>
          </Grid>
      </Grid>
    </div>
  )
}
AddressMainBox.protoTypes = {
  classes: T.object,
  userId: T.number,
  initialAddress: T.object,
  deliveryOption: T.object,
  showTitle: T.bool,
  updateAddress: T.bool,
  onAddressSubmit: T.func,
  onHandleRevert: T.func
} 
export default withStyles(styles)(AddressMainBox);