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
import Icons from '../common/Icons';
import Snackbar from '../common/Snackbar';
import { formatNumber } from '../../utils';
import { validateForm, handleFormResponse } from '../../utils/form';
import { getAddresses, createAddress } from '../../api/addresses';
import ActionForm from '../common/Form/Action/Add';
import RadioBox from '../common/RadioBox';
import { defaultCountry } from '../../../config';
import { finished } from 'stream';

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


const AddressSelection = ({classes, userInfo, onSelected}) => {
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


  const changeContent = async(action) => {
    await setShowAction(action);
    loadActionHtml();
  }


  const loadUserAddress = async() => {
    const addresses = await getAddresses()
    let getAdd = addresses.filter(address => address.selected === true);

    if (addresses && !addresses.length || !addresses) {
      setShowAction('add');
    } else {
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
      email: add.email,
      phone: add.phone,
      province: add.addressProvince.name,
      district: add.addressDistrict.name,
      corregimiento: add.addressCorregimiento.name,
      country: add.addressCountry.iso,
    }
  }

  const handleDeliveryForm = async(subform) => {
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
            <Grid item lg={9} xs={9} className={classes.headerTitleItem}>
                Direccion de entrega
            </Grid>
            <Grid item lg={3} xs={3} className={classes.headerBtnItem}>
              <Button onClick={() => changeContent(null)} className={`mainButton`}>
                  Cancel
              </Button>
            </Grid>
            <Grid item lg={12} xs={12} className={classes.addressBox}>
              <RadioBox options={userAddresses} name="address" type="address" onSelected={handleRadioSelect} />
            </Grid>
            <Grid item lg={5} xs={12} className={classes.headerBtnItem}>
              <Button onClick={() => changeContent('add')} className={`mainButton`}>
                  Add
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
            <Grid item lg={9} xs={9} className={classes.headerTitleItem}>
                Direccion de entrega
            </Grid>
            <Grid item lg={3} xs={3} className={classes.headerBtnItem}>
              <Button onClick={() => changeContent('list')} className={`mainButton`}>
                  Change
              </Button>
            </Grid>
            {
              userAddress && (
                <Grid item lg={12} xs={12} className={classes.addressBox}>
                  <p>{userAddress.name}</p>
                  <p>{userAddress.address}</p>
                  <p>{userAddress.addressDistrict.name} {userAddress.addressCorregimiento.name}</p>
                  <p>{userAddress.addressProvince.name}</p>
                  <p>{userAddress.addressCountry.nicename}</p>
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
      address: null,
      email: null,
      phone: null,
      province: null,
      district: null,
      corregimiento: null,
      country: defaultCountry,
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
  onSelected: T.func
}

const mapStateToProps = state => ({
  userInfo: state.user,
}) // add reducer access to props

export default connect(mapStateToProps)(withStyles(styles)(AddressSelection));