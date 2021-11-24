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

import { finished } from 'stream';
import { useTranslation } from 'next-i18next'
import { formatNumber } from 'src/utils';
import { defaultCountry } from 'config';
import { validateForm, handleFormResponse } from 'src/utils/form';
import { getAddressByUserId, getAddressById, createAddress } from 'src/api/addresses';
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
  // const [userAddress, setUserAddress] = useState(null);
  const [userAddresses, setUserAddresses] = useState([]);
  const [showAction, setShowAction] = useState(null);
  // const [addresses, setAddresses] = useState([]);
  const [showData, setShowData] = useState(false);
  const [form, setForm] = useState({});
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation('common')


  const changeContent = async(action) => {
    if (action) {
      setShowAction(action);
    } else {
      onSelected(null);
    }
  }

  useEffect(() => {
    loadActionHtml();
  }, [showAction]);

  const loadUserAddress = async() => {
    // let getAdd = null;
    const addresses = await getAddressByUserId(userId);
    if (addresses && !addresses.length || !addresses) {
      setShowAction('add');
    } else {
      // getAdd = addresses.filter(address => address.selected === true);
      // if (!getAdd) {
      //   getAdd = addresses[0];
      // }

     // let getSimple = formatSimpleAddress(getAdd[0]);
      setUserAddresses(addresses);
     // setUserAddress(getAdd[0])
      //onSelected(getSimple);
      setShowAction(null);
    }
    setShowData(true); 
  }

  // const formatSimpleAddress = (add) => {
  //   return {
  //     name: add.name,
  //     address: add.address,
  //     addressB: add.addressB,
  //     email: add.email,
  //     phone: add.phone,
  //     province: add.addressProvince,
  //     district: add.addressDistrict,
  //     corregimiento: add.addressCorregimiento,
  //     zone: add.addressZone,
  //     none: add.note,
  //     country: add.addressCountry,
  //   }
  // }

  const handleDeliveryForm = async(subform) => {
    subform = {
      ...subform,
      user: userId
    }
    // const confirm = await createAddress(subform);
    // const resp = handleFormResponse(confirm);
    resetForm();
    onSelected(subform);
    loadUserAddress()
    changeContent(null);
  //  setSnack(resp);
  }

  const handleDeliveryCancel = async() => {
    await changeContent(null)
  }

  const handleRadioSelect = (evt) => {
    const findAddres = userAddresses.filter(item => item.id == evt[0].id)
    console.log("address found", findAddres)
    if (findAddres && findAddres.length) {
      const listAddresses = userAddresses.map((item) => {
        item = {
          ...item,
          selected: findAddres[0].id === item.id ? true : false
        }
        return item
      })
      setUserAddresses(listAddresses)
      // setUserAddress(findAddres[0])
      onSelected(findAddres[0]);
    }
    changeContent(null)
  }

  const loadActionHtml = () => {
    switch(showAction) {
      case 'add': {
        return (
          <Grid container className={classes.headerContainer}>
            <ActionForm 
              classes={{root: classes.formRoot}}
              formSection={{
                name: 'Direccion de entrega',
              }} 
              ignoreForm={['selected', 'note', 'addressB']}
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
            <Grid item lg={12} xs={12} className={classes.addressBox}>
              <RadioBox options={userAddresses} name="address" type="address_ne" onSelected={handleRadioSelect} />
            </Grid>
            <Grid item lg={5} xs={5} className={classes.headerBtnItem}>
              <Button onClick={() => changeContent(null)} className={`mainButton`}>
              { t('cancel') }
              </Button>
            </Grid>
            <Grid item lg={5} xs={5} className={classes.headerBtnItem}>
              <Button onClick={() => changeContent('add')} className={`mainButton`}>
                { t('new') }
              </Button>
            </Grid>
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
      zone: null,
      country: defaultCountry,
      note: null
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
  showTitle: T.bool,
  userId: T.number
}

export default withStyles(styles)(AddressSelection);