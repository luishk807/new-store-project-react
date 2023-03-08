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
import { formatNumber, getAddressFields } from 'src/utils';
import { isLoggedIn } from '@/utils/auth';
import { defaultCountry, defaultPanama } from 'config';
import { validateForm, handleFormResponse } from 'src/utils/form';
import { getAddressesByUser, getAddressById, createAddress } from 'src/api/addresses';
import Icons from '@/components/common/Icons';
import Snackbar from '@/components/common/Snackbar';
import ActionForm from '@/components/common/Form/Action/Add';
import RadioBox from '@/components/common/RadioBox';
import { ContactSupportOutlined } from '@material-ui/icons';


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


const AddressSelection = ({
  classes, 
  onSelected, 
  userId, 
  showTitle = true,
  entryForm,
  defaultFormSection,
  defaultDisableFields,
  defaultIgnoreFields,
  defaultShowCancel,
  resetPanamaSection,
  forceRefresh,
  onFormChange,
  onSubmitAction,
  defaultType,
  selectedDeliveryOption
}) => {
  const [userAddress, setUserAddress] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [showAction, setShowAction] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [hideFields, setHideFields] = useState(null);
  const [disabledFields, setDisabledFields] = useState(null);
  const [ignoreFields, setIgnoreFields] = useState(null);
  const [formSection, setFormSection] = useState({});
  const [showCancelOption, setShowCancelOption] = useState(true);
  const [showData, setShowData] = useState(false);
  const [formType, setFormType] = useState('action')
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
    setShowData(false); 
    try {
      const addresses = isUserLoggedIn ? await getAddressesByUser() : null;
      if (addresses && !addresses.length || !addresses) {
        setShowAction('add')
      } else {
        getAdd = addresses.filter(address => address.selected === true)[0];
        if (!getAdd || (getAdd && !getAdd.length)) {
          getAdd = addresses[0];
        }
        let getSimple = formatSimpleAddress(getAdd);
        setUserAddresses(addresses);
        setUserAddress(getAdd)
        onSelected(getSimple);
        setShowAction(null);
        setShowData(true); 
      }
    } catch (err) {
      setShowData(false); 
    }
  }

  const formatSimpleAddress = (add) => {
    const add_val = {
      name: add?.name,
      address: add?.address,
      addressB: add?.addressB,
      email: add?.email,
      phone: add?.phone,
      province: add?.addressProvince,
      district: add?.addressDistrict,
      corregimiento: add?.addressCorregimiento,
      // zone: add?.addressZone,
      none: add?.note,
      country: add?.addressCountry,
    } 
    return add_val;
  }

  const handleDeliveryForm = async(subform) => {
    if (!isUserLoggedIn) {
      onSubmitAction(subform)
    } else {
      subform = {
        ...subform
      }
      const confirm = await createAddress(subform);
      const resp = handleFormResponse(confirm);
      resetForm();
      onSelected(subform);
      loadUserAddress()
      changeContent(null);
      setSnack(resp);
    }
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

  const handleOnChangeForm = (e) => {
    if (onFormChange) {
      onFormChange(e)
    }
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
              formSection={formSection} 
              ignoreForm={ignoreFields}
              hideEntry={hideFields}
              showCancel={showCancelOption}
              showTitle={showTitle}
              disableFields={disabledFields}
              resetPanamaSection={resetPanamaSection}
              forceRefresh={forceRefresh}
              onFormChange={handleOnChangeForm}
              onCancel={handleDeliveryCancel}
              entryForm={form} 
              onSubmitAction={handleDeliveryForm}
              type={formType}
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
    const deliveryOption = +selectedDeliveryOption?.id;

    let defaultIgnoreFields = ['country'];
    let defaultHideFields = [];

    let fields = getAddressFields(deliveryOption);

    if (deliveryOption !== 1) {
      if (deliveryOption == 2) {
        defaultIgnoreFields =  defaultIgnoreFields.concat(['province', 'district']);
        defaultHideFields = defaultHideFields.concat(['province', 'district']);
      } 
      if (isUserLoggedIn) {
        fields = {
          ...fields,
          selected: true
        }
      }
    }
    setHideFields(defaultHideFields);
    setIgnoreFields(defaultIgnoreFields);
    setDisabledFields(defaultIgnoreFields);
    setForm(fields)
  }

  useEffect(() => {
    // TODO: finish setting up the initial setting with remaning fields
   let setFormSect = defaultFormSection ? defaultFormSection : {
    name: 'Direccion de entrega',
   }

   let setIgnoreSec = defaultIgnoreFields ? defaultIgnoreFields : ['selected'];

   if (defaultDisableFields) {
    setDisabledFields(defaultDisableFields)
   }
   if (defaultType) {
    setFormType(defaultType)
   }
   if (typeof defaultShowCancel !== "null") {
    setShowCancelOption(defaultShowCancel)
   }

   setIgnoreFields(setIgnoreSec);

   setFormSection(setFormSect)

   const getUserLogged = isLoggedIn();
   setIsUserLoggedIn(getUserLogged)
  }, [])

  useEffect(() => {
    loadUserAddress();
    resetForm()
  }, [selectedDeliveryOption])

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
  showTitle: T.bool,

  entryForm: T.object,
  defaultFormSection: T.object,
  defaultDisableFields: T.object,
  defaultIgnoreFields: T.object,
  defaultShowCancel: T.bool,
  forceRefresh: T.bool,
  resetPanamaSection: T.bool,
  onFormChange: T.func,
  onSubmitAction: T.func,
  selectedDeliveryOption: T.obj,
  defaultType: T.string
}

const mapStateToProps = state => ({
  userInfo: state.user,
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(AddressSelection));