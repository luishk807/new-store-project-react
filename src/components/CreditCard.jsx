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
      // const currDate = moment(creditCardForm.creditCardExpireDate).format('MM-YYYY');
      // setCreditCardForm({
      //   ...creditCardForm,
      //   creditCardExpireDate: currDate
      // })
      // const encrypt = await encryptSign(formData);
      const encrypt = await encryptSign(formData);
       console.log("encry", encrypt)
    //  const encrypt = getSignaureTest();

      setSignatureField(encrypt)
     // formRef.current.submit();
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
  //  let referenceNum = new Date().getTime(); // user numero de orden - 
    let referenceNum = Math.floor(Math.random() * 100000);
    const fields = {
      card_number: '4242424242424242',
      card_expiry_date: "12-2023",
      card_cvn: '005',
      payment_method: 'card',
      card_type:"001",
      access_key: process.env.STGEORGE_ACCESS_KEY,
      profile_id: process.env.STGEORGE_PROFILE_ID,
      merchant_defined_data2: "AVENIDAZ",
      merchant_defined_data3: "https://WWW.AVENIDAZ.COM",
      tax_indicator: "Y",
      unsigned_field_names: 'card_type,card_number,card_expiry_date,card_cvn',
      signed_field_names: 'line_item_count,item_0_quantity,item_0_sku,item_0_name,item_0_code,item_0_unit_price,item_0_tax_amount,ship_to_forename,ship_to_surname,ship_to_phone,ship_to_address_line1,ship_to_address_city,ship_to_address_state,ship_to_address_country,ship_to_address_postal_code,user_po,tax_indicator,customer_ip_address,merchant_defined_data2,merchant_defined_data3,device_fingerprint_id,device_fingerprint_raw,override_custom_receipt_page,access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,card_type,card_number,card_expiry_date,card_cvn,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code',
      signed_date_time: convertToSignatureDate(new Date()),
      reference_number: referenceNum,
      user_po: referenceNum,
      override_custom_receipt_page: "https://WWW.AVENIDAZ.COM",
      locale: 'es-co',
      device_fingerprint_raw: 'true',
      device_fingerprint_id: new Date().getTime(),
      transaction_type: "sale",
      transaction_uuid: Math.floor(Math.random() * 100000000),
      currency: "USD",
      amount:"100.00",
      bill_to_forename:'Ricardo',
      bill_to_surname:'Lee',
      bill_to_email:'rlee@stgeorgesbank.com',
      bill_to_phone:'62384777',
      bill_to_address_line1:'Panama',
      bill_to_address_city:'Panama',
      bill_to_address_state:'PA',
      bill_to_address_country:'PA',
      bill_to_address_postal_code:'507222',
      customer_ip_address:'3333',
      item_0_quantity:"1",
      item_0_sku:"cod0101",
      item_0_name:"Prueba",
      item_0_unit_price:"100.00",
      item_0_tax_amount:"0.00",
      item_0_code: '0101010101',
      line_item_count:"1",
      ship_to_forename:'Ricardo',
      ship_to_surname:'Lee',
      ship_to_email:'rlee@stgeorgesbank.com',
      ship_to_phone:'62384777',
      ship_to_address_line1:'Panama',
      ship_to_address_city:'Panama',
      ship_to_address_state:'PA',
      ship_to_address_country:'PA',
      ship_to_address_postal_code:'507222'
    }

    //     const fields = {
    //   card_number: "4111111111111111",
    //   card_expiry_date: "12-2024",
    //   card_cvn: '333',
    //   payment_method: 'card',
    //   card_type:"001",
    //   access_key: `${process.env.STGEORGE_ACCESS_KEY}`,
    //   profile_id: `${process.env.STGEORGE_PROFILE_ID}`,
    //   transaction_uuid: "eb5238c0-4c29-40bc-a2fd-10fec841bbd2",
    //   tax_indicator: "Y",
    //   unsigned_field_names: 'card_number',
    //   signed_field_names: 'access_key,amount,bill_to_address_city,bill_to_address_country,bill_to_address_line1,bill_to_email,bill_to_forename,bill_to_surname,card_expiry_date,card_type,currency,customer_ip_address,device_fingerprint_id,device_fingerprint_raw,locale,payment_method,profile_id,reference_number,signed_date_time,signed_field_names,transaction_type,transaction_uuid,unsigned_field_names,ship_to_forename,ship_to_surname,ship_to_phone,ship_to_address_line1,ship_to_address_city,ship_to_address_state,ship_to_address_country,ship_to_address_postal_code',
    //   signed_date_time: "2021-08-20T11:33:43Z",
    //   reference_number: '593aff18-ec39-4b16-a19a-c0772a7e9c77',
    //   locale: 'en-US',
    //   device_fingerprint_raw: 'true',
    //   device_fingerprint_id: "eb5238c0-4c29-40bc-a2fd-10fec841bbd2",
    //   transaction_type: "authorization,create_payment_token",
    //   currency: "DOP",
    //   amount:'3333',
    //   bill_to_forename:"Elena",
    //   bill_to_surname:"Tonra",
    //   bill_to_email:"email@fake.test",
    //   bill_to_address_line1:"Somewhere",
    //   bill_to_address_city:"Santo Domingo",
    //   bill_to_address_country:"US",
    //   bill_to_address_postal_code:"12222",
    //   customer_ip_address:'3333',
    //   ship_to_forename:'Ricardo',
    //   ship_to_surname:'Lee',
    //   ship_to_email:'rlee@stgeorgesbank.com',
    //   ship_to_phone:'62384777',
    //   ship_to_address_line1:'Panama',
    //   ship_to_address_city:'Panama',
    //   ship_to_address_state:'PA',
    //   ship_to_address_country:'PA',
    //   ship_to_address_postal_code:'507222'
    // }


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
        {/* <input type="hidden" name="signature" value={signatureField || ''} />
          <input type="hidden" name="access_key" value={formData.access_key}/>
          <input type="hidden" name="profile_id" value={formData.profile_id} />
          <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
          <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
          <input type="hidden" name="unsigned_field_names" value={formData.unsigned_field_names} />
          <input type="hidden" name="signed_date_time" value={formData.signed_date_time} />
          <input type="hidden" name="locale" value={formData.locale} />
          <input type="hidden" name="device_fingerprint_id" value={formData.device_fingerprint_id} />
          <input type="hidden" name="device_fingerprint_raw" value={formData.device_fingerprint_raw} />
          <input type="hidden" name="override_custom_receipt_page" value={formData.override_custom_receipt_page} />
          <input type="hidden" name="merchant_defined_data3" value={formData.merchant_defined_data3} />
          <input type="hidden" name="merchant_defined_data2" value={formData.merchant_defined_data2}/>
          <input type="hidden" name="customer_ip_address" value={myIP || ''} />
          <input type="hidden" name="tax_indicator" value={formData.tax_indicator} />
          <input type="hidden" name="reference_number" value={formData.reference_number} />
          <input type="hidden" name="user_po" value={formData.user_po} />
          <input type="hidden" name="transaction_type" value={formData.transaction_type} />
          <input type="hidden" name="amount" value={formData.amount} />
          <input type="hidden" name="currency" value={formData.currency} />
          <input type="hidden" name="payment_method" value={formData.payment_method} />

          <input type="hidden" name="card_type" value={formData.card_type} />
          <input type="hidden" name="card_number" value={formData.card_number} />
          <input type="hidden" name="card_expiry_date" value={formData.card_expiry_date}/>
          <input type="hidden" name="card_cvn" value={formData.card_cvn} />

          <input type="hidden" name="item_0_quantity" value={formData.item_0_quantity} />
          <input type="hidden" name="item_0_sku" value={formData.item_0_sku} />
          <input type="hidden" name="item_0_name" value={formData.item_0_name} />
          <input type="hidden" name="item_0_code" value={formData.item_0_code} />
          <input type="hidden" name="item_0_unit_price" value={formData.item_0_unit_price} />
          <input type="hidden" name="item_0_tax_amount" value={formData.item_0_tax_amount} />

          <input type="hidden" name="line_item_count" value={formData.line_item_count} />

          <input type="hidden" name="bill_to_forename" value={formData.bill_to_forename} />
          <input type="hidden" name="bill_to_surname" value={formData.bill_to_surname}  />
          <input type="hidden" name="bill_to_email" value={formData.bill_to_email}  />
          <input type="hidden" name="bill_to_address_line1" value={formData.bill_to_address_line1}  />
          <input type="hidden" name="bill_to_address_city" value={formData.bill_to_address_city}  />
          <input type="hidden" name="bill_to_address_country" value={formData.bill_to_address_country}  />
          <input type="hidden" name="bill_to_address_postal_code" value={formData.bill_to_address_postal_code}  />

         <input type="hidden" name="ship_to_forename"  value={formData.ship_to_forename}/>
        <input type="hidden" name="ship_to_surname"  value={formData.ship_to_surname}/>
        <input type="hidden" name="ship_to_phone"  value={formData.ship_to_phone}/>
        <input type="hidden" name="ship_to_address_line1"  value={formData.ship_to_address_line1}/>
        <input type="hidden" name="ship_to_address_city"  value={formData.ship_to_address_city}/>
        <input type="hidden" name="ship_to_address_state"  value={formData.ship_to_address_state}/>
        <input type="hidden" name="ship_to_address_country"  value={formData.ship_to_address_country}/>
        <input type="hidden" name="ship_to_address_postal_code"  value={formData.ship_to_address_postal_code}/> */}





        <input type="hidden" name="signature" value={signatureField || ''} />
        <input type="hidden" name="access_key" id="access_key" value={formData.access_key} />
        <input type="hidden" name="profile_id" id="profile_id" value={formData.profile_id} />
        <input type="hidden" name="transaction_uuid" id="transaction_uuid" value={formData.transaction_uuid} />
        <input type="hidden" name="transaction_type" id="transaction_type" value="sale"/>
        <input type="hidden" name="signed_field_names" id="signed_field_names" value={formData.signed_field_names}/>
        <input type="hidden" name="unsigned_field_names" id="unsigned_field_names"  value={formData.unsigned_field_names}/>
        <input type="hidden" name="signed_date_time" id="signed_date_time" value={formData.signed_date_time} />
        <input type="hidden" name="locale" id="locale" value={formData.locale} />
        <input type="hidden" name="device_fingerprint_id" id="device_fingerprint_id"  value={formData.device_fingerprint_id} />
        <input type="hidden" name="device_fingerprint_raw" id="device_fingerprint_raw" value={formData.device_fingerprint_raw} />
        <input type="hidden" name="override_custom_receipt_page" id ="override_custom_receipt_page" value={formData.override_custom_receipt_page} />
        <input type="hidden" name="merchant_defined_data3" id ="merchant_defined_data3" value={formData.merchant_defined_data3} />
        <input type="hidden" name="merchant_defined_data2" id ="merchant_defined_data2" value={formData.merchant_defined_data2} />
        <input type="hidden" name="customer_ip_address" id="customer_ip_address" value={myIP || ''} />
        <input type="hidden" name="tax_indicator" id="tax_indicator"  value={formData.tax_indicator} /> 
        <input type="hidden" name="reference_number" id="reference_number" value={formData.reference_number} />
        <input type="hidden" name="user_po" id="user_po"  value={formData.user_po} />
        <input type="hidden" name="amount" id="amount" value={formData.amount} />
        <input type="hidden" name="currency" id="currency" value={formData.currency} />
        <input type="hidden" name="payment_method" id="payment_method" value={formData.payment_method} />
        <input type="hidden" name="card_type" id="card_type" value={formData.card_type} />
        <input type="hidden" name="card_number" id="card_number" value={formData.card_number} />
        <input type="hidden" name="card_expiry_date" id="card_expiry_date" value={formData.card_expiry_date} />
		    <input type="hidden" name="card_cvn" id="card_cvn" value={formData.card_cvn} />	 
        <input type="hidden" name="item_0_quantity" id="item_0_quantity" value={formData.item_0_quantity} />	 
        <input type="hidden" name="item_0_sku" id="item_0_sku" value={formData.item_0_sku} />	  
        <input type="hidden" name="item_0_name" id="item_0_name" value={formData.item_0_name} />	  
        <input type="hidden" name="item_0_code" id="item_0_code" value={formData.item_0_code} />	  
        <input type="hidden" name="item_0_unit_price" id="item_0_unit_price" value={formData.item_0_unit_price} />	  
        <input type="hidden" name="item_0_tax_amount" id="item_0_tax_amount" value={formData.item_0_tax_amount} />	  
        <input type="hidden" name="line_item_count" id="line_item_count" value={formData.line_item_count} />	
        <input type="hidden" name="bill_to_forename" id="bill_to_forename" value={formData.bill_to_forename} />
        <input type="hidden" name="bill_to_surname" id="bill_to_surname" value={formData.bill_to_surname} />
        <input type="hidden" name="bill_to_email" id="bill_to_email" value={formData.bill_to_email} />
        <input type="hidden" name="bill_to_phone" id="bill_to_phone" value={formData.bill_to_phone} />
        <input type="hidden" name="bill_to_address_line1" id="bill_to_address_line1" value={formData.bill_to_address_line1} />
        <input type="hidden" name="bill_to_address_city" id="bill_to_address_city" value={formData.bill_to_address_city} />
        <input type="hidden" name="bill_to_address_state" id="bill_to_address_state" value={formData.bill_to_address_state} />
        <input type="hidden" name="bill_to_address_country" id="bill_to_address_country" value={formData.bill_to_address_country} />
        <input type="hidden" name="bill_to_address_postal_code" id="bill_to_address_postal_code" value={formData.bill_to_address_postal_code} />
		    <input type="hidden" name="ship_to_forename" id="ship_to_forename" value={formData.ship_to_forename} />
        <input type="hidden" name="ship_to_surname" id="ship_to_surname" value={formData.ship_to_surname} />
        <input type="hidden" name="ship_to_phone" id="ship_to_phone" value={formData.ship_to_phone} />
        <input type="hidden" name="ship_to_address_line1" id="ship_to_address_line1" value={formData.ship_to_address_line1} />
        <input type="hidden" name="ship_to_address_city" id="ship_to_address_city" value={formData.ship_to_address_city} />
        <input type="hidden" name="ship_to_address_state" id="ship_to_address_state" value={formData.ship_to_address_state} />
        <input type="hidden" name="ship_to_address_country" id="ship_to_address_country" value={formData.ship_to_address_country} />
        <input type="hidden" name="ship_to_address_postal_code" id="ship_to_address_postal_code" value={formData.ship_to_address_postal_code} />


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

// line_item_count,item_0_quantity,item_0_sku,item_0_name,item_0_code,item_0_unit_price,item_0_tax_amount,ship_to_forename,ship_to_surname,ship_to_phone,ship_to_address_line1,ship_to_address_city,ship_to_address_state,ship_to_address_country,ship_to_address_postal_code,user_po,tax_indicator,customer_ip_address,merchant_defined_data2,merchant_defined_data3,device_fingerprint_id,device_fingerprint_raw,override_custom_receipt_page,access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,card_type,card_number,card_expiry_date,card_cvn,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code

// card_type,card_number,card_expiry_date,card_cvn


// line_item_count,item_0_quantity,item_0_sku,item_0_name,item_0_code,item_0_unit_price,item_0_tax_amount,ship_to_forename,ship_to_surname,ship_to_phone,ship_to_address_line1,ship_to_address_city,ship_to_address_state,ship_to_address_country,ship_to_address_postal_code,user_po,tax_indicator,customer_ip_address,merchant_defined_data2,merchant_defined_data3,device_fingerprint_id,device_fingerprint_raw,override_custom_receipt_page,access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,card_type,card_number,card_expiry_date,card_cvn,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code

// card_type,card_number,card_expiry_date,card_cvn