import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { defaultCountry, defaultPanama } from '../../../config';
import CartBox from '../../components/CartBlock';
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import ActionForm from '../../components/common/Form/Action/Add';
import Snackbar from '../../components/common/Snackbar';
import AddressSelection from '../../components/address/AddressSelection';
import RadioBox from '../../components/common/RadioBox';
import ProgressBar from '../../components/common/ProgressBar';
import { validateForm, handleFormResponse } from '../../utils/form';
import { returnDefaultOption } from '../../utils';
import { getDeliveryServiceCostByFilter } from '../../api/deliveryServiceCosts';
import { getActiveDeliveryServicesByDeliveryOption } from '../../api/deliveryOptionServices';
import { processOrderByUser } from '../../api/orders';
import { getDeliveryOptions } from '../../api/deliveryOptions';
import { getActivePaymentOptions } from '../../api/paymentOptions';
import { emptyCart } from '../../redux/actions/main'

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
  pageTitleContainer: {},
  pageContenContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
});


const Home = React.memo(({userInfo, classes, cart, emptyCart}) => {
  const router = useRouter()
  const [showPlaceOrderLoader, setShowPlaceOrderLoader] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null)
  const [selectedDeliveryService, setSelectedDeliveryService] = useState(null)
  const [selectedZone, setSelectedZone] = useState(null)
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
  const [total, setTotal] = useState({});
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });

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
    setSelectedDeliveryService(val[0])
    if (val[0] && val[0].id) {
      setForm({
        ...form,
        'deliveryService': val[0].id
      })
    }
  }

  const handleDeliveryOption = async(val) => {
    await setTotal({
      ...total,
      delivery: val[0].deliveryOptionDeliveryServiceOptions && val[0].deliveryOptionDeliveryServiceOptions.length ? 0 : val[0].total
    })
    await setForm({
      ...form,
      delivery: val[0].id
    })
    setSelectedDeliveryOption(val[0])
  }

  const handlePaymentOption = (val) => {
    setSelectedPaymentOption(val[0]);
  }

  const getDeliveryCost = async() => {
    if (selectedZone && form.delivery == 3 && form.deliveryService) {
      const foundPrice = await getDeliveryServiceCostByFilter(selectedZone.id, form.deliveryService)
      if (foundPrice) {
        await setTotal({
          ...total,
          delivery: foundPrice.amount
        })
      } else {
        setTotal({
          ...total,
          delivery: 0
        })
      }
    }
  }

  const handleFormChange = async(add) => {
    if (add && add.key && 'val' in add) {
      console.log(add)
      if (add.key && add.key === "zone") {
        setSelectedZone(add.val)
      }
      setGuestAddress({
        ...guestAddress,
        [add.key]: add.val
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
    fetchedAddress.zone = evt.addressZone && evt.addressZone.name ? evt.addressZone.name : evt.zone ? evt.zone : null;
    fetchedAddress.country = evt.addressCountry  && evt.addressCountry.name ? evt.addressCountry.name : evt.district ? evt.country : null;

    if (fetchedAddress.zone) {
      setSelectedZone(fetchedAddress.zone)
    }

    await setAddress(fetchedAddress)
  }

  const handleCartTotal = async(evt) => {
    setTotal(evt);
  }

  const handlePlaceOrder = async() => {
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
    if (form.delivery == 2 || form.delivery == 3) {
      ignoreFields = ignoreFields.concat(['addressB', 'zone', 'note']);
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

    for (var i in copyFormCheck) {
      if (errorFound) {
        errorFound = await validateForm(i, copyFormCheck[i], ignoreFields);
        key = i;
      } else {
        break;
      }
    }

    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to process order, ${key} is required`
      })
    } else {
      const formSubmit = Object.assign({}, form);
      const cart = formSubmit.cart;
      let country = copyFormCheck.country;
      if (typeof country !== "string") {
        country = copyFormCheck.name;
      }

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
      formSubmit['deliveryOption'] = selectedDeliveryOption ? selectedDeliveryOption.name : null;
      formSubmit['deliveryOptionId'] = selectedDeliveryOption ? selectedDeliveryOption.id : null;
      formSubmit['paymentOption'] = selectedPaymentOption ? selectedPaymentOption.name : null;
      formSubmit['paymentOptionId'] = selectedPaymentOption ? selectedPaymentOption.id : null;
      formSubmit['delivery'] = total.delivery;
      formSubmit['deliveryService'] = !isUserPickUp && selectedDeliveryService ? selectedDeliveryService.name : null;
      formSubmit['deliveryServiceId'] = !isUserPickUp && selectedDeliveryService ? selectedDeliveryService.id : null;

      setShowPlaceOrderLoader(true);
      const confirm = await processOrderByUser(formSubmit)
      const resp = handleFormResponse(confirm);
      setSnack(resp);
      setTimeout(() => {
        handleCancel() 
      }, 1000);
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
      const data = await getActiveDeliveryServicesByDeliveryOption(serviceOption.id);
      if (data) {
        const getServices = data.map(item => {
          return item.deliveryOptionServiceDeliveryService;
        })
        setDeliveryServices(getServices);
        const loadDefault = returnDefaultOption(getServices);
        if (loadDefault) {
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
    return <CartBox deliveryOption={total.delivery} onCartTotal={handleCartTotal} data={cart} />
  }, [total.delivery, cart])
  
  const resetAddress = useCallback(() => {
    setShowAddressLoader(true);
    if (selectedDeliveryOption) {
      loadServices(selectedDeliveryOption)
      if (selectedDeliveryOption.id == 1) {

        if (!isUser) {
          setAddress({
            name: null,
            // address: null,
            email: null,
            phone: null,
          })
        }
        setForm({
          ...form,
          'deliveryService': null
        })
        setShowDeliveryServices(false);
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
          zone: null,
          country: defaultCountry,
          note: null,
        }
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
        setForm({
          ...form,
          'deliveryService': 1
        })
        setShowDeliveryServices(true);
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
    resetAddress();
  }, [selectedDeliveryOption]);

  useEffect(() => {
    getDeliveryCost();
  }, [selectedZone, selectedDeliveryService]);

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
      userid: userInfo.id,
      delivery: '1',
      cart: cart,
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
        zone: null,
        country: defaultCountry.name,
        note: null,
      }
    )

    loadDelivery();
    // loadServices();
    loadPayment();
    setForm(form);
  }, [userInfo, cart])

  return (
    <LayoutTemplate>
     <div className={classes.root}>
      {
          form && (
            <>
            <Grid container className={classes.pageTitleContainer}>
              <Grid className={classes.pageTitle} item lg={12} xs={12}>
                <h1>Checkout</h1>
              </Grid>
            </Grid>
            <Grid container className={classes.pageContenContainer}>
              <Grid item lg={8}>
                <Grid container className={classes.subPageContainer}>
                  <Grid className={classes.contentSection} item lg={7} xs={12}>
                    <Grid container>
                      <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                        <RadioBox selected={form.delivery} onSelected={handleDeliveryOption} options={deliveryOptions} name="delivery" type="deliveryOption" title="Opciones de Entrega" />
                      </Grid>
                      <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                        {
                          isUser ? (
                              <AddressSelection onSelected={handleAddressSelection} />
                            ) : showAddressLoader ? (
                              <ProgressBar />
                            ) : (
                              <ActionForm 
                                classes={{root: classes.formRoot}}
                                formSection={{
                                  name: 'Direccion de entrega',
                                }} 
                                disableFields={disableFields}
                                resetPanamaSection={forceAddressRefresh}
                                forceRefresh={forceAddressRefresh}
                                onFormChange={handleFormChange}
                                ignoreForm={['email']}
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
                            <RadioBox selected={form.deliveryService} onSelected={handleServiceOption} options={deliveryServices} name="deliveryOption" type="deliveryService" title="Opciones de Service de Envio" />
                          </Grid>                       
                        )
                      }
                      {
                        paymentOptions && (
                          <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                            <RadioBox selected={form.payment} onSelected={handlePaymentOption} options={paymentOptions} name="payment" type="payment" title="Opciones de Pago" />
                          </Grid>                       
                        )
                      }
                      <Grid item className={classes.itemSection} lg={12} xs={12}>
                        <Button onClick={handlePlaceOrder} className={`mainButton ${classes.processBtn}`}>
                            { 
                              showPlaceOrderLoader ? (
                                <CircularProgress color='inherit' />
                              ) : (
                                `Place your order`
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
      </div>
      <Snackbar open={snack.open} severity={snack.severity} onClose={() => setSnack({...snack, open: false})} content={snack.text} />
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
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home));