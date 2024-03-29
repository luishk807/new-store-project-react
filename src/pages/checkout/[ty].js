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
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { defaultCountry } from 'config';
import CartBox from '@/components/cart/Block';
import LayoutTemplate from '@/common/Layout/LayoutTemplate';
import ConfirmationBlock from '@/common/ConfirmationBlock';
import Snackbar from '@/common/Snackbar';
import AddressSelection from '@/components/address/AddressSelection';
import RadioBox from '@/common/RadioBox';
import PromotionalCode from '@/components/PromotionalCode';
import { validateForm, handleFormResponse } from '@/utils/form';
import { returnDefaultOption, getAddressFields } from 'src/utils';
import { emptyCart } from '@/redux/actions/main'
import { getDeliveryServiceGroupCostByDeliveryOption } from '@/api/deliveryServiceGroupCosts';
import { processOrderByUser } from '@/api/orders';
import { getDeliveryOptions } from '@/api/deliveryOptions';
import { getProductItemByIds } from '@/api/productItems';
import { getActivePaymentOptions } from '@/api/paymentOptions';
import { isLoggedIn } from '@/utils/auth';


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
  }
});


const Home = React.memo(({userInfo, classes, cart, emptyCart}) => {
  const router = useRouter()
  const [showThankyou, setThankyou] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPlaceOrderLoader, setShowPlaceOrderLoader] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null)
  const [selectedDeliveryService, setSelectedDeliveryService] = useState(null)
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [deliveryServices, setDeliveryServices] = useState([])
  const [forceAddressRefresh, setForceAddressRefresh] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState(null)
  const [form, setForm] = useState(null);
  const [showDeliveryServices, setShowDeliveryServices] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [address, setAddress] = useState({});
  const [orderResult, setOrderResult] = useState(null);
  const [selectedPromotionCode, setSelectedPromotionCode] = useState(null);
  const [total, setTotal] = useState({});
  const [snack, setSnack] = useState({
    severity: 'success',
    open: false,
    text: '',
  });
  const { t } = useTranslation('checkout')

  const handleAddressFormSubmit = (getForm) => {
    console.log("heyeee",getForm)
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

  const handleAddressFormChange = async(add) => {
    if (add && add.key && 'val' in add) {
      if (add.key && add.key === "zone") {
        setSelectedZone(add.val)
      }
      setAddress({
        ...address,
        [add.key]: add.val
      })
    }
  }

  const handleAddressSelection = async(addr) => {
    let fetchedAddress = {};
    fetchedAddress['name'] = addr.name;
    fetchedAddress['addressB'] = addr.addressB;
    fetchedAddress['address'] = addr.address;
    fetchedAddress['email'] = addr.email;
    fetchedAddress['phone'] = addr.phone;
    fetchedAddress['note'] = addr.note;
    fetchedAddress['province'] = addr.addressProvince && addr.addressProvince.name ? addr.addressProvince.name : addr.province ? addr.province : null;
    fetchedAddress['district'] = addr.addressDistrict && addr.addressDistrict.name ? addr.addressDistrict.name : addr.district ? addr.district : null;
    fetchedAddress['corregimiento'] = addr.addressCorregimiento && addr.addressCorregimiento.iso ? addr.addressCorregimiento.iso : addr.district ? addr.corregimiento : null;
    // fetchedAddress['zone'] = addr.addressZone && addr.addressZone.name ? addr.addressZone.name : addr.zone ? addr.zone : null;
    fetchedAddress['country'] = addr.addressCountry  && addr.addressCountry.name ? addr.addressCountry.name : addr.district ? addr.country : null;

    setAddress(fetchedAddress)
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
    let ignoreFields = ['address', 'cart'];
    // let saveAddress = false;
    let isUserPickUp = false;
    const copyFormCheck = Object.assign({}, form);
    ignoreFields = ['cart', 'delivery'];
    copyFormCheck['paymentOption'] = selectedPaymentOption;
    copyFormCheck['deliveryOption'] = selectedDeliveryOption;
    copyFormCheck['deliveryService'] = selectedDeliveryService;

    let useAddress = getAddressFields(selectedDeliveryOption?.id, address);

    if (selectedDeliveryOption.id != 1) {
      isUserPickUp = false;
      ignoreFields = ignoreFields.concat(['addressB', 'zone', 'note']);
      if (!selectedDeliveryService) {
        ignoreFields = ignoreFields.concat(['deliveryService']);
      }
     // saveAddress = true;
      for(const key in useAddress) {
        copyFormCheck[key] = useAddress[key];
      }
    } else {
      ignoreFields = ignoreFields.concat(['deliveryService']);
      isUserPickUp = true;
      let ship_name = useAddress?.name;
      let ship_email = useAddress?.email;
      let ship_phone = useAddress?.phone;
      if (!useAddress.name && isUser) {
        ship_name = `${userInfo?.first_name} ${userInfo?.last_name}`;
      }
      if (!useAddress.email && isUser) {
        ship_email = userInfo?.email;
      }
      if (!useAddress.phone && isUser) {
        ship_phone = userInfo?.phone;
      }
      copyFormCheck['name'] = ship_name
      copyFormCheck['email'] = ship_email;
      copyFormCheck['phone'] = ship_phone;
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
      setShowPlaceOrderLoader(true);
      const confirm = await processOrderByUser(formSubmit)
      if (confirm && confirm.data && confirm.data.data) {
        setOrderResult(confirm.data.data);
      }
      setShowCheckout(false);
      const resp = handleFormResponse(confirm);
      setSnack(resp);
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
    setShowDeliveryServices(false);

    if (selectedDeliveryOption) {
      if (selectedDeliveryOption.id == 1) {
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
        setForceAddressRefresh(selectedDeliveryOption?.id)
      } else {
        loadServices(selectedDeliveryOption)
        setForceAddressRefresh(selectedDeliveryOption?.id)
      }
    }
    let useAddress = getAddressFields(selectedDeliveryOption?.id);
    setAddress(useAddress)
  }, [selectedDeliveryOption])

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
    const isLogged = isLoggedIn();

    if (isLogged) {
      setIsUser(true)
    }

    loadDelivery();
    loadPayment();
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
                        <AddressSelection 
                          onSelected={handleAddressSelection} 
                          classes={{root: classes.formRoot}}
                          defaultFormSection={{
                            name: selectedDeliveryOption && selectedDeliveryOption.id == 1 ? t('delivery_option_pickup') :  t('delivery_option_delivery') ,
                          }} 
                          selectedDeliveryOption={selectedDeliveryOption}
                          resetPanamaSection={forceAddressRefresh}
                          forceRefresh={forceAddressRefresh}
                          onFormChange={handleAddressFormChange}
                          onSubmitAction={handleAddressFormSubmit}
                          defaultShowCancel={false}
                          defaultType={isUser ? null : 'dynamic'}
                        />
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
            <ConfirmationBlock
              type="order_confirm"
              data={orderResult.order_num}
              url="/"
            />
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