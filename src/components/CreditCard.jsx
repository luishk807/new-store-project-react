import React, { useEffect, useState, useRef } from 'react';
import * as T from 'prop-types';
import { 
  withStyles,
  Grid,
  TextField,
  FormControl,
  Button,  
} from '@material-ui/core';
import moment from 'moment';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { FORM_SCHEMA } from '../../config';
import { 
  getCardType, 
  cybs_dfprofiler, 
  convertToSignatureDate, 
  encryptSign, 
  uniqid 
} from '../utils/creditCard';
import { getIP } from '../utils';
import ActionForm from './common/Form/Action/Add';
import { validateForm } from '../utils/form';
import { removeCharacter } from '../utils';
import Snackbar from './common/Snackbar';
import Typography from './common/Typography';
import { useTranslation } from 'next-i18next'
import { ContactSupportOutlined } from '@material-ui/icons';

import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';



const styles = (theme) => ({
  root: {
    width: '100%'
  },
  formRoot: {
    width: '100%',
    margin: '0px',
    textAlign: 'left',
    '& h4': {
      fontSize: '1.5em',
      padding: 10,
    }
  },
  formItems: {
    margin: '0px auto',
    justifyContent: 'space-between'
  },
  formTextField: {
    padding: '10px 0px',
    width: '100%',
  },
  mainContainer: {
    justifyContent: 'space-between',
  },
  formItem: {
    width: '100%',
    margin: 5,
    padding: '5px 0px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    // margin: '20px auto 0px auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CreditCard = ({
  classes, 
  onChange:formOnChange,
  creditCardRefresh: forceRefresh
}) => {
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({});
  const [signatureField, setSignatureField] = useState(null);
  const formRef = useRef(null);
  const [creditCardForm, setCreditCardForm] = useState({});
  const [showPlaceOrderLoader, setShowPlaceOrderLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [myIP, setMyIP] = useState(null);
  const { t } = useTranslation('order')
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

  const handleFormChange = (e) => {
    const currForm = creditCardForm;
    const {name:key, value:val} = e.target;
    let valid = true;
    switch(key) {
      case 'creditCardNumber': {
        const cardType = getCardType(val);
        currForm[key] = val;
        if (val.length > 10) {
          if (cardType) {
            currForm[key] = val;
            currForm['creditCardType'] = cardType.id;
          } else {
            valid = false;
            setSnack({
              severity: 'error',
              open: true,
              text: 'Invalid credit card type',
            })
          }
        }
        break;
      }
      case 'creditCardExpireDate': {
        const currDate = moment(val).format('MM-YYYY');
        currForm[key] = currDate;
        break;
      }
      default: {
        console.log("jeeeeee", val, 'jey', key)
        currForm[key] = val;
      }
    }

    if (valid) {
      console.log("complete", currForm)
      setCreditCardForm(currForm);
    }
  }
  const handleDeliveryForm = async (e) => {
    e.preventDefault();
    let errorFound = false;
    let key = '';
    console.log("hey",creditCardForm)
    for (var i in creditCardForm) {
      errorFound = await validateForm(i, creditCardForm[i]);
      key = i;
      if (errorFound){
        saveErrors(i)
      } else {
        saveErrors(i, true, `${i} is required`)
        break
      }
    }
    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to login, ${i} is required`
      })

    } else {
      //onSubmit(form);
      console.log("form", formData)
      const currDate = moment(creditCardForm.creditCardExpireDate).format('MM-YYYY');
      setCreditCardForm({
        ...creditCardForm,
        creditCardExpireDate: currDate
      })
      const encrypt = await encryptSign(formData);
      console.log("encry", encrypt)
      setSignatureField(encrypt)
      //set form



      //end of set form
    }
  }


  const saveErrors = async (key, err = false, str = '') => {
    await setErrors({
      ...errors,
      [key]: {
        error: err,
        text: str,
      }
    });
  }

  const configureError = async(fields) => {
    let newErrors = {}

    Object.keys(fields).forEach((field, index) => {
      newErrors = {
        ...newErrors,
        [field]: {
          error: false,
          text: '',
        }
      }
    })
    setErrors(newErrors);
  }

  const fethIP = async() => {
    const ip = await getIP();
    // setFormData({
    //   ...formData,
    //   customer_ip_address: ip
    // })
    setMyIP(ip);
  }

  useEffect(() => {

    fethIP();
    let referenceNum = new Date().getTime(); // user numero de orden - 
    const fields = {
      card_number: 4111111111111111,
      card_expiry_date: "12-2021",
      card_cvn: '333',
      payment_method: 'card',
      card_type:"001",
      access_key: process.env.STGEORGE_ACCESS_KEY,
      profile_id: process.env.STGEORGE_PROFILE_ID,
      transaction_uuid: referenceNum,
      merchant_defined_data2: "Avenidaz.com",
      merchant_defined_data3: "https://www.avenidaz.com",
      tax_indicator: "Y",
      unsigned_field_names: 'card_type,card_number,card_expiry_date,card_cvn',
      signed_field_names: 'transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,override_custom_receipt_page,merchant_defined_data2,merchant_defined_data3,user_po,line_item_count,device_fingerprint_id,customer_ip_address,tax_indicator,item_0_quantity,item_0_name,item_0_sku,item_0_tax_amount,item_0_unit_price',
      signed_date_time: convertToSignatureDate(new Date()),
      reference_number: referenceNum,
      user_po: referenceNum,
      override_custom_receipt_page: "https://www.avenidaz.com/stgeorgeprocess.js",
      locale: 'es-co',
      device_fingerprint_raw: 'true',
      device_fingerprint_id: new Date().getTime(),
      transaction_type: "sale",
      currency: "USD",
      amount:3333,
      bill_to_forename:"test",
      bill_to_surname:"test",
      bill_to_email:"test@test.com",
      bill_to_address_line1:"1 test street",
      bill_to_address_city:"test",
      bill_to_address_country:"US",
      bill_to_address_postal_code:"12222",
      customer_ip_address:'3333',
      item_0_quantity:"1",
      item_0_sku:"133433",
      item_0_name:"test product",
      item_0_unit_price:"33.00",
      item_0_tax_amount:"7.9",
      line_item_count:"1"
    }

    configureError(fields)
    setFormData(fields)
    setCreditCardForm({
      creditCardName: 'test',
      creditCardNumber: 4111111111111111,
      creditCardExpireDate: '12-2023',
      creditCardCode: '333',
    })
  }, [])

  useEffect(() => {
    if (signatureField) {
      formRef.current.submit();
    }
  },[signatureField])

  // useEffect(() => {
  //   if (formRef.current) {
  //     console.log("ready")
  //     // formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
  //     formRef.current.submit();
  //   }
  // }, [formRef])
  return errors && (
      <div className={classes.root}>
        {/* <ActionForm 
          classes={{root: classes.formRoot, formItems: classes.formItems}}
          formSection={{
            name: "Tarjeta de Credito"
          }} 
          forceRefresh={forceRefresh}
          onFormChange={handleFormChange}
          entryForm={form} 
          showCancel={false}
          type="dynamic"
        /> */}
        {/* <form onSubmit={(e) => handleDeliveryForm(e)} action={process.env.STGEORGE_URL} className={classes.formFoot} autoComplete="off" method="post"> */}
        <form  onSubmit={handleDeliveryForm} ref={formRef} action={process.env.STGEORGE_URL} className={classes.formFoot} method="post">
          <input type="hidden" name="access_key" value={formData.access_key}/>
          <input type="hidden" name="profile_id" value={formData.profile_id} />
          <input type="hidden" name="card_type" value={formData.card_type} />
          <input type="hidden" name="card_expiry_date" value={formData.card_expiry_date}/>
          <input type="hidden" name="card_number" value={formData.card_number} />
          <input type="hidden" name="card_cvn" value={formData.card_cvn} />
          <input type="hidden" name="bill_to_forename" value={formData.bill_to_forename} />
          <input type="hidden" name="bill_to_surname" value={formData.bill_to_surname}  />
          <input type="hidden" name="bill_to_email" value={formData.bill_to_email}  />
          <input type="hidden" name="bill_to_address_line1" value={formData.bill_to_address_line1}  />
          <input type="hidden" name="bill_to_address_city" value={formData.bill_to_address_city}  />
          <input type="hidden" name="bill_to_address_country" value={formData.bill_to_address_country}  />
          <input type="hidden" name="bill_to_address_postal_code" value={formData.bill_to_address_postal_code}  />
          <input type="hidden" name="device_fingerprint_id" value={formData.device_fingerprint_id} />
          <input type="hidden" name="device_fingerprint_raw" value={formData.device_fingerprint_raw} />
          <input type="hidden" name="signature" value={signatureField || ''} />
          <input type="hidden" name="signed_date_time" value={formData.signed_date_time} />
          <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
          <input type="hidden" name="unsigned_field_names" value={formData.unsigned_field_names} />
          <input type="hidden" name="merchant_defined_data2" value={formData.merchant_defined_data2}/>
          <input type="hidden" name="merchant_defined_data3" value={formData.merchant_defined_data3} />
          <input type="hidden" name="override_custom_receipt_page" value={formData.override_custom_receipt_page} />
          <input type="hidden" name="currency" value={formData.currency} />
          <input type="hidden" name="locale" value={formData.locale} />
          <input type="hidden" name="payment_method" value={formData.payment_method} />
          <input type="hidden" name="reference_number" value={formData.reference_number} />
          <input type="hidden" name="tax_indicator" value={formData.tax_indicator} />
          <input type="hidden" name="transaction_type" value={formData.transaction_type} />
          <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
          <input type="hidden" name="item_0_quantity" value={formData.item_0_quantity} />
          <input type="hidden" name="item_0_sku" value={formData.item_0_sku} />
          <input type="hidden" name="item_0_name" value={formData.item_0_name} />
          <input type="hidden" name="item_0_unit_price" value={formData.item_0_unit_price} />
          <input type="hidden" name="item_0_tax_amount" value={formData.item_0_tax_amount} />
          <input type="hidden" name="line_item_count" value={formData.line_item_count} />
          <input type="hidden" name="user_po" value={formData.user_po} />
          <input type="hidden" name="amount" value={formData.amount} />
          <input type="hidden" name="customer_ip_address" value={myIP || ''} />

            <Grid item className={classes.itemSection} lg={12} xs={12}>
                <Grid container className={classes.mainContainer}>
                  {/* <Grid item lg={12} xs={12} className={classes.formItem}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                          error={errors.creditCardName.error}
                          helperText={errors.creditCardName.text} 
                          name="bill_to_forename"
                          defaultValue={creditCardForm.creditCardName}
                          onChange={handleFormChange}
                          label={removeCharacter( t(FORM_SCHEMA.creditCardName.tKey) )} 
                          variant="outlined" 
                        />
                    </FormControl>
                  </Grid>
                  <Grid  item lg={12} xs={12} className={classes.formItem}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                          error={errors.creditCardNumber.error}
                          helperText={errors.creditCardNumber.text} 
                          defaultValue={creditCardForm.creditCardNumber}
                          name="card_number"
                          onChange={handleFormChange}
                          label="Credit card number"
                          variant="outlined" 
                        />
                    </FormControl>
                  </Grid> */}
                  {/* <Grid  item lg={7} xs={7} className={classes.formItem}>
                    <FormControl fullWidth variant="outlined">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              autoOk
                              name="card_expiry_date"
                              variant="inline"
                              openTo="year"
                              views={["year", "month"]}
                              value={creditCardForm.creditCardExpireDate}
                              label={removeCharacter( t(FORM_SCHEMA.creditCardExpireDate.tKey) )} 
                              onChange={(e) => handleFormChange({target: {value: e, name: "creditCardExpireDate"}})}
                              inputVariant="outlined"
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid> */}
                  {/* <Grid  item lg={4} xs={4} className={classes.formItem}>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                          error={errors.creditCardCode.error}
                          helperText={errors.creditCardCode.text} 
                          name="card_cvn"
                          defaultValue={creditCardForm.creditCardCode}
                          label={removeCharacter( t(FORM_SCHEMA.creditCardCode.tKey) )} 
                          onChange={handleFormChange}
                          placeholder="Placeholder"
                          variant="outlined" 
                        />
                    </FormControl>
                  </Grid> */}
                  <Grid item lg={12}>
                    {/* <Button onClick={handleDeliveryForm} className={`mainButton ${classes.processBtn}`}>
                        { 
                          showPlaceOrderLoader ? (
                            <CircularProgress color='inherit' />
                          ) : (
                            t('place_your_order')
                          )
                        }
                    </Button> */}
                    <input type="submit" className={`mainButton ${classes.processBtn}`} value={ 
                          showPlaceOrderLoader ? (
                            <CircularProgress color='inherit' />
                          ) : (
                            t('place_your_order')
                          )
                        }/>

                  </Grid>
                </Grid>
            </Grid>
        </form>
        <Snackbar open={snack.open} severity={snack.severity} onClose={()=>setSnack({...snack,open: false, text: ''})} content={snack.text} />
      </div>
  );
}

CreditCard.protoTypes = {
  classes: T.object,
  onChange: T.func,
  creditCardRefresh: T.bool
}

export default withStyles(styles)(CreditCard);