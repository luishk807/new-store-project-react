import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { defaultCountry, defaultPanama, FORM_SCHEMA } from '../../../config';
import CreditCard from '../../components/CreditCard';
import CartBox from '../../components/cart/Block';
import Icons from '../../components/common/Icons';
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import ActionForm from '../../components/common/Form/Action/Add';
import Snackbar from '../../components/common/Snackbar';
import AddressSelection from '../../components/address/AddressSelection';
import RadioBox from '../../components/common/RadioBox';
import PromotionalCode from '../../components/PromotionalCode';
import ProgressBar from '../../components/common/ProgressBar';
import { validateForm, handleFormResponse } from '../../utils/form';
import { cybs_dfprofiler } from '../../utils/creditCard';
import { returnDefaultOption } from '../../utils';
import { emptyCart } from '../../redux/actions/main'
import { getDeliveryServiceCostByFilter } from '../../api/deliveryServiceCosts';
import { getActiveDeliveryServicesByDeliveryOption } from '../../api/deliveryOptionServices';
import { getDeliveryServiceGroupCostByDeliveryOption } from '../../api/deliveryServiceGroupCosts';
import { getActivePromotionCodeByCode } from '../../api/promotionCodes';
import { processOrderByUser } from '../../api/orders';
import { getDeliveryOptions } from '../../api/deliveryOptions';
import { getProductItemByIds } from '../../api/productItems';
import { getActivePaymentOptions } from '../../api/paymentOptions';
import { processPaymentCard } from '../../api/stGeorgePayment';

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: 10,
  },
  contentBoxSection: {
    background: 'rgba(0,0,0,.03)',
    marginBottom: 20,
    padding: 10,
  },
  contentBoxSectionContainer: {
    padding: 10,
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
  },
  centerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  pageTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  orderResultPageTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    fontWeight: 'bold',
    flexDirection: 'column',
  },
  pageTitleContainer: {},
  pageContenContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px auto',
  },
  subPageContainer: {

  },
  contentSection: {
    paddingRight: 30,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
    }
  },
  processBtn: {
    padding: '5px 0px',
  },
  addressBox: {
    padding: 10,
    margin: '10px 0px',
  },
  orderResultItemCont: {
    textAlign: 'center'
  },
  linkStyle: {
    paddingTop: 30,
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  orderResultIcon: {
    width: 80,
    height: 80,
    fill: 'green',
  },
  promoCodeMain: {
    background: 'rgba(0,0,0,.03)',
    marginBottom: 20,
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      padding: 10
    }
  },
  promoCodeTitle: {
    margin: '10px 0px',
    '& h4': {
      fontSize: '1em',
      fontWeight: 'bold'
    }
  },
  promoCodeButton: {
    margin: '0px !important',
    height: '100%',
  },
  promoCodeIteInput: {
    '& input': {
      background: 'white'
    }
  },
  promoCodeItemBtn: {
    width: '100%',
    padding: '0px 5px',
  },
});


const Home = React.memo(({userInfo, classes, cart, emptyCart}) => {
  const router = useRouter()
  const [showThankyou, setThankyou] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPlaceOrderLoader, setShowPlaceOrderLoader] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null)
  const [selectedDeliveryService, setSelectedDeliveryService] = useState(null)
  const [selectedZone, setSelectedZone] = useState(null)
  const [creditCardForm, setCreditCardForm] = useState({})  
  const [selectedCorregimiento, setSelectedCorregimiento] = useState(null)
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [deliveryServices, setDeliveryServices] = useState([])
  const [forceAddressRefresh, setForceAdddressRefresh] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState(null)
  const [form, setForm] = useState(null);
  const [showDeliveryServices, setShowDeliveryServices] = useState(false);
  const [disableFields, setDisabledFields] = useState([]);
  const [isUser, setIsUser] = useState(false);
  const [address, setAddress] = useState({});
  const [showAddressLoader, setShowAddressLoader] = useState(false);
  const [guestAddress, setGuestAddress] = useState({});
  const [orderResult, setOrderResult] = useState(null);
  const [selectedPromotionCode, setSelectedPromotionCode] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [total, setTotal] = useState({});
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation('checkout')

  const handleCreditCardFormChange = (e) => {
    console.log("credit card form", e);
    setCreditCardForm(e);
  }

  const handleDeliveryForm = (getForm) => {
    setForm({
      ...form,
      address: getForm
    })
  }

  const handleCancel = () => {
    emptyCart();
    router.push('/');
  }

  const handleServiceOption = async(val) => {
    if (val && val[0].amount) {
      setTotal({
        ...total,
        delivery: val[0].amount
      })
    } else {
      setTotal({
        ...total,
        delivery: 0
      })
    }

    setSelectedDeliveryService(val[0])
    if (val[0] && val[0].id) {
      setForm({
        ...form,
        'deliveryService': Number(val[0].id)
      })
    }
  }

  const handleDeliveryOption = async(val) => {
    const deliveryOptionCost = val.deliveryOptionDeliveryServiceGroupCost && val.deliveryOptionDeliveryServiceGroupCost.length ? val.deliveryOptionDeliveryServiceGroupCost[0] : null;
    setShowDeliveryServices(false);
    setSelectedDeliveryService(deliveryOptionCost)
    if (deliveryOptionCost) {
      setTotal({
        ...total,
        delivery: deliveryOptionCost.amount
      })
      setForm({
        ...form,
        delivery:  deliveryOptionCost.amount
      })
    } else {
      setTotal({
        ...total,
        delivery: 0
      })
      setForm({
        ...form,
        delivery: 0
      })
    }
    setSelectedDeliveryOption(val[0])
  }

  const handlePaymentOption = (val) => {
    setSelectedPaymentOption(val[0]);
  }

  const handleFormChange = async(add) => {
    if (add && add.key && 'val' in add) {
      if (add.key && add.key === "zone") {
        setSelectedZone(add.val)
      }
      if (add.key && add.key === "corregimiento") {
        setSelectedCorregimiento(add.val)
      }
      setGuestAddress({
        ...guestAddress,
        [add.key]: add.val
      })
    } else if (add && add.target && add.target.name === "promoCode") {
      setForm({
        ...form,
        'promoCode': add.target.value,
      })
    }
  }

  const handleAddressSelection = async(evt) => {
    const fetchedAddress = Object.assign({}, guestAddress);

    fetchedAddress.name = evt.name;
    fetchedAddress.addressB = evt.addressB;
    fetchedAddress.address = evt.address;
    fetchedAddress.email = evt.email;
    fetchedAddress.phone = evt.phone;
    fetchedAddress.note = evt.note;
    fetchedAddress.province = evt.addressProvince && evt.addressProvince.name ? evt.addressProvince.name : evt.province ? evt.province : null;
    fetchedAddress.district = evt.addressDistrict && evt.addressDistrict.name ? evt.addressDistrict.name : evt.district ? evt.district : null;
    fetchedAddress.corregimiento = evt.addressCorregimiento && evt.addressCorregimiento.iso ? evt.addressCorregimiento.iso : evt.district ? evt.corregimiento : null;
    // fetchedAddress.zone = evt.addressZone && evt.addressZone.name ? evt.addressZone.name : evt.zone ? evt.zone : null;
    fetchedAddress.country = evt.addressCountry  && evt.addressCountry.name ? evt.addressCountry.name : evt.district ? evt.country : null;

    if (fetchedAddress.zone) {
      setSelectedZone(fetchedAddress.zone)
    }

    if (evt.addressCorregimient) {
      setSelectedCorregimiento(fetchedAddress.corregimiento)
    }

    await setAddress(fetchedAddress)
  }

  const handleCartTotal = async(evt) => {
    setTotal(evt);
  }

  const handlePromoCode = async(e) => {
    setSelectedPromotionCode(e)
  }

  const checkStock = async(cart) => {
    const productItemIds = Object.keys(cart).map(key => Number(cart[key].id));
    if (productItemIds) {
      const getProductItems = await getProductItemByIds(productItemIds);
      Object.keys(cart).forEach((key) => {
        const currProd = getProductItems.filter(item => item.id === cart[key].id)[0];
        if (currProd && cart[key].stock > currProd.stock) {
           window.location.href="/cart";
        }
      })
    }
  }

  const handlePlaceOrder = async() => {
    checkStock(cart);
    if (!Object.entries(cart).length) {
      setSnack({
        severity: 'error',
        open: true,
        text: 'No items in cart',
      });

      setTimeout(() => {
        handleCancel();
      }, 1000);
      return;
    }
    let errorFound = true;
    let key = '';
    let ignoreFields = ['address', 'cart', 'userid'];
    let saveAddress = false;
    let isUserPickUp = false;
    const copyFormCheck = Object.assign({}, form);
    ignoreFields = ['cart', 'userid', 'delivery'];
    copyFormCheck['paymentOption'] = selectedPaymentOption;
    copyFormCheck['deliveryOption'] = selectedDeliveryOption;
    copyFormCheck['deliveryService'] = selectedDeliveryService;
    const useAddress = isUser ? Object.assign({}, address) : Object.assign({}, guestAddress)
    if (selectedDeliveryOption.id != 1) {
      isUserPickUp = false;
      ignoreFields = ignoreFields.concat(['addressB', 'zone', 'note']);
      if (!selectedDeliveryService) {
        ignoreFields = ignoreFields.concat(['deliveryService']);
      }
      saveAddress = true;
      for(const key in useAddress) {
        copyFormCheck[key] = useAddress[key];
      }
    } else {
      ignoreFields = ignoreFields.concat(['deliveryService']);
      isUserPickUp = true;
      copyFormCheck['name'] = useAddress.name;
      copyFormCheck['email'] = useAddress.email;
      copyFormCheck['phone'] = useAddress.phone;
    }

    if (selectedPaymentOption.id == 3) {
      // credit card
      for (var i in creditCardForm) {
        copyFormCheck[i] = creditCardForm[i];
      }
      ignoreFields.push('creditCardType');
    }

    for (var i in copyFormCheck) {
      if (errorFound) {
        errorFound = await validateForm(i, copyFormCheck[i], ignoreFields);
        key = FORM_SCHEMA[i].label;
      } else {
        break;
      }
    }

    console.log("cart", cart)
    let cartCreditCard = {};
    let cartTotalItems = 0;
    for(const cartIndx in cart) {
      console.log(`${cartIndx} ${cart[cartIndx].product}` )
      cartCreditCard[`item_${cartIndx}_quantity`] = cart[cartIndx].quantity;;
      cartCreditCard[`item_${cartIndx}_sku`] = cart[cartIndx].productItemProduct.sku;
      cartCreditCard[`item_${cartIndx}_name`] = cart[cartIndx].productItemProduct.name
      cartCreditCard[`item_${cartIndx}_unit_price`] = Number(cart[cartIndx].retailPrice);
      cartCreditCard[`item_${cartIndx}_tax_amount`] = Number(cart[cartIndx].retailPrice) * 0.08;
      cartTotalItems += cart[cartIndx].quantity;
    }
    cartCreditCard['amount'] = total.grandTotal;
    cartCreditCard['line_item_count'] = cartTotalItems;

    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to process order, ${key} is required`
      })
    } else {
      setSnack({
        severity: 'error',
        open: false,
        text: null
      })
      const formSubmit = Object.assign({}, form);
      const cart = formSubmit.cart;
      let country = copyFormCheck.country;
      if (typeof country !== "string") {
        country = defaultCountry.name;
      }

      if (selectedPaymentOption.id == 3) {
          //credit card
          // get fingerprint
          let referenceNum = new Date().getTime();
          const getDeviceFingerPrint = await cybs_dfprofiler(process.env.STGEORGE_MID,'test');
          cartCreditCard['card_type'] = copyFormCheck.creditCardType && copyFormCheck.creditCardType.id ? copyFormCheck.creditCardType.id : null;
          cartCreditCard['card_number'] = copyFormCheck.creditCardNumber;
          cartCreditCard['card_expiry_date'] = copyFormCheck.creditCardExpireDate;
          cartCreditCard['card_cvn'] = copyFormCheck.creditCardCode;
          cartCreditCard['transaction_type'] = "sale";
          cartCreditCard['reference_number'] = referenceNum;
          cartCreditCard['user_po'] = referenceNum;
          cartCreditCard['device_fingerprint_id'] = getDeviceFingerPrint;
          // cartCreditCard['amount'] = copyFormCheck.grandTotal;
          cartCreditCard['currency'] = "USD";
          cartCreditCard['payment_method'] = "card";
          cartCreditCard['bill_to_forename'] = copyFormCheck.name;
          cartCreditCard['bill_to_surname'] = copyFormCheck.name;
          cartCreditCard['bill_to_email'] = copyFormCheck.email;
          cartCreditCard['bill_to_phone'] = copyFormCheck.phone;
          cartCreditCard['bill_to_address_line1'] = copyFormCheck.address;
          cartCreditCard['bill_to_address_city'] = copyFormCheck.province;
          cartCreditCard['bill_to_address_state'] = copyFormCheck.district;
          cartCreditCard['bill_to_address_country'] = copyFormCheck.country;
          cartCreditCard['bill_to_address_postal_code'] = '00000';
      }

      console.log("entire cart", cartCreditCard)
      formSubmit['shipping_name'] = copyFormCheck.name;
      formSubmit['shipping_address'] = copyFormCheck.address;
      formSubmit['shipping_addressB'] = copyFormCheck.addressB;
      formSubmit['shipping_corregimiento'] = copyFormCheck.corregimiento ? copyFormCheck.corregimiento.name : null;
      formSubmit['shipping_district'] = copyFormCheck.district ? copyFormCheck.district.name : null;
      formSubmit['shipping_zone'] = copyFormCheck.zone ? copyFormCheck.zone.name : null;
      formSubmit['shipping_phone'] = copyFormCheck.phone;
      formSubmit['shipping_province'] =copyFormCheck.province ? copyFormCheck.province.name : null;
      formSubmit['shipping_country'] = country;
      formSubmit['shipping_email'] = copyFormCheck.email;
      formSubmit['shipping_note'] = copyFormCheck.note ? copyFormCheck.note : null;
      formSubmit['cart'] = JSON.stringify(cart);
      formSubmit['subtotal'] = total.subtotal;
      formSubmit['totalSaved'] = total.saved;
      formSubmit['tax'] = parseFloat(total.taxes);
      formSubmit['grandtotal'] = total.grandTotal;
      formSubmit['promotionCode'] = selectedPromotionCode ? selectedPromotionCode.name : null;
      formSubmit['promotionCodeId'] = selectedPromotionCode ? selectedPromotionCode.id : null;
      formSubmit['deliveryOption'] = selectedDeliveryOption ? selectedDeliveryOption.name : null;
      formSubmit['deliveryOptionId'] = selectedDeliveryOption ? selectedDeliveryOption.id : null;
      formSubmit['paymentOption'] = selectedPaymentOption ? selectedPaymentOption.name : null;
      formSubmit['paymentOptionId'] = selectedPaymentOption ? selectedPaymentOption.id : null;
      formSubmit['delivery'] = total.delivery;
      formSubmit['deliveryService'] = !isUserPickUp && selectedDeliveryService ? selectedDeliveryService.name : null;
      formSubmit['deliveryServiceId'] = !isUserPickUp && selectedDeliveryService ? selectedDeliveryService.id : null;
      console.log("submit", cartCreditCard)


      const rest = await processPaymentCard(cartCreditCard);

       console.log('response', rest);
      // setShowPlaceOrderLoader(true);
      // const confirm = await processOrderByUser(formSubmit)
      // if (confirm && confirm.data && confirm.data.data) {
      //   setOrderResult(confirm.data.data);
      // }
      // setShowCheckout(false);
      // const resp = handleFormResponse(confirm);
      // setSnack(resp);
    }
  }

  const loadDelivery = async() => {
    const data = await getDeliveryOptions();
    if (data) {
      setDeliveryOptions(data);
      const loadDefault = returnDefaultOption(data);
      if (loadDefault) {
        setSelectedDeliveryOption(loadDefault);
      }
    } else {
      setDeliveryOptions([]);
    }
  }

  const loadServices = useCallback(async(serviceOption) => {
    if (serviceOption) {
      const data = await getDeliveryServiceGroupCostByDeliveryOption(serviceOption.id);
      if (data) {
        const getServices = data
        setDeliveryServices(getServices);
        const loadDefault = returnDefaultOption(getServices);
        if (loadDefault) {
          await setTotal({
            ...total,
            delivery: loadDefault.amount
          })
          setSelectedDeliveryService(loadDefault);
        }
      } else {
        setDeliveryServices([]);
      }
    }
  }, [deliveryServices])

  const loadPayment = useCallback(async() => {
    const data = await getActivePaymentOptions();
    if (data) {
      setPaymentOptions(data);
      const loadDefault = returnDefaultOption(data);
      if (loadDefault) {
        setSelectedPaymentOption(loadDefault);
      }
    } else {
      setPaymentOptions(null);
    }
  }, [paymentOptions])

  const loadCartTotal = useCallback(() => {
    return <CartBox deliveryOption={total.delivery} promotionCode={selectedPromotionCode} onCartTotal={handleCartTotal} data={cart} />
  }, [total.delivery, selectedPromotionCode, cart])
  
  const resetAddress = useCallback(() => {
    setShowAddressLoader(true);
    setShowDeliveryServices(false);
    if (selectedDeliveryOption) {
      if (selectedDeliveryOption.id == 1) {
        if (!isUser) {
          setAddress({
            name: null,
            email: null,
            phone: null,
          })
        }
        setForm({
          ...form,
          'deliveryService': null,
          'delivery': 0
        })

        setTotal({
          ...total,
          delivery: 0
        })

        setSelectedDeliveryService(null);
        setForceAdddressRefresh(selectedDeliveryOption.id)
      } else {
        const address = {
          name: null,
          address: null,
          addressB: null,
          email: null,
          phone: null,
          province: defaultPanama.province,
          district: defaultPanama.district,
          corregimiento: null,
          // zone: null,
          country: defaultCountry,
          note: null,
        }
        loadServices(selectedDeliveryOption)
        if (selectedDeliveryOption.id == 2) {
          setDisabledFields(['province', 'district']);
          address.province = defaultPanama.province;
          address.district = defaultPanama.district;
        } else {
          setDisabledFields([]);
          address.province = null;
          address.district = null;
        }
        if (!isUser) {
          setAddress(address)
          setGuestAddress(address)
        }
        setForceAdddressRefresh(selectedDeliveryOption.id)
      }
    }
  }, [selectedDeliveryOption])

  useEffect(() => {
    if (showAddressLoader) {
      setShowAddressLoader(false);
    }
  }, [address])

  useEffect(() => {
    if (selectedDeliveryService) {
      setShowDeliveryServices(true);
    }
  }, [selectedDeliveryService]);
  
  useEffect(() => {
    resetAddress();
  }, [selectedDeliveryOption]);

  useEffect(() => {
    if (selectedPaymentOption) {
      setTotal({
        ...total,
        payment: selectedPaymentOption.total
      })
      setForm({
        ...form,
        paymentOption: selectedPaymentOption
      })
    }
  }, [selectedPaymentOption]);

  useEffect(() => {
    let form = {
      userid: userInfo.id
    }

    setAddress({
      name: null,
      email: null,
      phone: null,
    })
    if (userInfo.id) {
      setIsUser(true)
    }

    setGuestAddress(
      {
        name: null,
        address: null,
        addressB: null,
        email: null,
        phone: null,
        province: null,
        district: null,
        corregimiento: null,
        // zone: null,
        country: defaultCountry.name,
        note: null,
      }
    )

    loadDelivery();
    loadPayment();
    setForm(form);
  }, [userInfo])

  useEffect(() => {
    if (Object.keys(cart).length) {
      setForm({
        ...form,
        cart: cart,
      });
      setShowCheckout(true)
    }
  }, [cart])

  useEffect(() => {
    if (orderResult && Object.entries(orderResult).length) {
      emptyCart();
      setShowCheckout(false);
      setThankyou(true);
    }
  }, [orderResult])

  return (
    <LayoutTemplate>
     <div className={classes.root}>
      {
          showCheckout && (
            <>
            <Grid container className={classes.pageTitleContainer}>
              <Grid className={classes.pageTitle} item lg={12} xs={12}>
                <h1>{ t('checkout_title') }</h1>
              </Grid>
            </Grid>
            <Grid container className={classes.pageContenContainer}>
              <Grid item lg={8} xs={12}>
                <Grid container className={classes.subPageContainer}>
                  <Grid className={classes.contentSection} item lg={7} xs={12}>
                    <Grid container>
                      <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                        <RadioBox selected={form.delivery} onSelected={handleDeliveryOption} options={deliveryOptions} name="delivery" type="deliveryOption" title={t('delivery_options')} />
                      </Grid>
                      <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                        {
                          isUser ? (
                              <AddressSelection onSelected={handleAddressSelection} />
                            ) : showAddressLoader ? (
                              <ProgressBar />
                            ) : (
                              <ActionForm 
                                classes={{root: classes.formRoot, formItems: classes.formItems}}
                                formSection={{
                                  name: selectedDeliveryOption && selectedDeliveryOption.id == 1 ? t('delivery_option_pickup') :  t('delivery_option_delivery') ,
                                }} 
                                disableFields={disableFields}
                                resetPanamaSection={forceAddressRefresh}
                                forceRefresh={forceAddressRefresh}
                                onFormChange={handleFormChange}
                                ignoreForm={['province', 'district', 'corregimiento', 'email', 'note', 'addressB', 'zone', 'phone', 'country']}
                                entryForm={address} 
                                onSubmitAction={handleDeliveryForm}
                                showCancel={false}
                                type="dynamic"
                              />
                            )
                        }
                      </Grid>
                      {
                        showDeliveryServices && (
                          <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                            <RadioBox selected={selectedDeliveryService.id} onSelected={handleServiceOption} options={deliveryServices} name="deliveryOption" type="deliveryServiceList" title={t('delivery_service_options')} />
                          </Grid>                       
                        )
                      }
                      <Grid item lg={12} xs={12} className={classes.promoCodeMain}>
                        <PromotionalCode onApply={handlePromoCode} />
                      </Grid>
                      {
                        paymentOptions && (
                          <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                            <RadioBox selected={form.payment} onSelected={handlePaymentOption} options={paymentOptions} name="payment" type="payment" title={t('payment_options')} />
                          </Grid>                       
                        )
                      }
                      {/* credit card */}
                      <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                          <CreditCard onChange={handleCreditCardFormChange} />
                      </Grid>
                      {/* end of credit card */}
                      <Grid item className={classes.itemSection} lg={12} xs={12}>
                        <Button onClick={handlePlaceOrder} className={`mainButton ${classes.processBtn}`}>
                            { 
                              showPlaceOrderLoader ? (
                                <CircularProgress color='inherit' />
                              ) : (
                                t('place_your_order')
                              )
                            }
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.itemSection} lg={5} xs={12}>
                     {
                       loadCartTotal()
                     }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            </>
          )
        }
        {
          showThankyou && orderResult && (
            <>
            <Grid container className={classes.pageTitleContainer}>
              <Grid className={classes.orderResultPageTitle} item lg={12} xs={12}>
                <div><Icons name="success" classes={{icon: classes.orderResultIcon}} /></div>
                <h1>Gracias!</h1>
              </Grid>
            </Grid>
            <Grid container className={classes.pageContenContainer}>
              <Grid item lg={6} xs={12} className={classes.orderResultItemCont}>
                <p>Hemos recibido su orden y su numero de confirmación es:<br/>
                <b>{orderResult.order_num}</b>,<br/>le enviamos a su correo electrónico los datos para realizar el pago de acuerdo al método seleccionado</p>
                <p>Recuerde realizar su pago dentro de las 24 horas, de lo contrario su orden será cancelada automáticamente</p>
                <p>
                  <a href="/" className={classes.linkStyle}>Regresar a la pagina principal</a>
                </p>
              </Grid>
            </Grid>
            </>
          )
        }
      </div>
      <Snackbar open={snack.open} severity={snack.severity} content={snack.text} />
    </LayoutTemplate>
  );
})

Home.protoTypes = {
  classes: T.object
}

const mapStateToProps = state => ({
  userInfo: state.user,
  cart: state.cart
}) // add reducer access to props
const mapDispatchToProps = {
  emptyCart: emptyCart
}

/**
 * This section is mandatory for next-18next translation to work, only inside /pages.
 * Use get ServerSideProps instead of getStaticProps because it's a dinamic route
 */
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'checkout', 'footer', 'forms', 'colors']),
  },
})

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home));