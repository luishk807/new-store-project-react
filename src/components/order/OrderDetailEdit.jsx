import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import * as T from 'prop-types';
import {
  withStyles,
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import moment from 'moment';
import { useTranslation } from 'next-i18next'

import { canceled_status } from 'config';
import { 
  formatNumber, 
  returnDefaultOption, 
  checkOrderAddressIsEmpty,
} from 'src/utils';
import { checkDiscountPrice, checkBundlePrice, isOutOfStock } from 'src/utils/products';
import { getActivePaymentOptions } from '@/api/paymentOptions';
import { getDeliveryOptions } from '@/api/deliveryOptions';
import { getDeliveryServiceGroupCostByDeliveryOption } from '@/api/deliveryServiceGroupCosts';
import PromotionalCode from '@/components/PromotionalCode';
import AddressMainBox from '@/components/address/AddressMainBox';
import OrderItemEdit from './OrderItemEdit';

const styles = (theme) => ({
  root: {
    padding: 0,
  },
  orderContainer: {
    border: '1px solid rgba(0,0,0,.07)',
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      padding: 2,
      '&:not(last-child)': {
        borderTop: '1px solid rgba(0,0,0,.07)',
        border: 'none'
      },
      '&:last-child': {
        borderBottom: '1px solid rgba(0,0,0,.07)',
      }
    }
  },
  cancelReason: {
    border: '1px solid red',
    textAlign: 'center',
    color: 'red',
    fontSize: '1.5em',
    fontWeight: 'bold',
    padding: 15,
  },
  orderSummary: {
    borderBottom: '1px solid rgba(0,0,0,.05)',
    marginBottom: 10,
  },
  itemHeader: {
    borderBottom: '1px solid rgba(0,0,0,.05)',
    marginBottom: 10,
  },
  orderTotalSection: {
    borderTop: '1px solid rgba(0,0,0,.05)',
    marginTop: 10,
    paddingTop: 15,
  },
  orderTotalContainer: {
    justifyContent: 'flex-end',
  },
  orderTotalItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    textAlign: 'right',
  },
  orderFlexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  orderHeaderContainer: {
    display: 'flex',
    margin: '10px 0px',
    justifyContent: 'center'
  },
  orderHeaderSubTitle: {
    fontSize: '1em',
    color: 'grey',
  },
  orderHeaderItemClose: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'flex-end;',
    justifyContent: 'center',
    padding: 0,
  },
  orderHeaderItemTitle: {
    alignItems: 'start',
    justifyContent: 'center',
  },
  orderHeaderItem: {
    '& p': {
      [theme.breakpoints.down('sm')]: {
        lineHeight: 'normal',
      }
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center !important'
    }
  },
  orderHeaderItem1: {
    textAlign: 'left',
    padding: 5,
  },
  orderHeaderItem2: {
    textAlign: 'center',
    padding: 5,
  },
  orderHeaderItem3: {
    textAlign: 'center',
    padding: 5,
  },
  orderHeaderItem4: {
    textAlign: 'right',
    padding: 5,
  },
  orderSummaryItem1: {
    textAlign: 'left',
    padding: 5,
  },
  orderSummaryItem2: {
    textAlign: 'center',
    padding: 5,
  },
  orderSummaryItem3: {
    textAlign: 'right',
    padding: 5,
  },
  itemHeaderDelivery: {
    display: 'flex',
    justifyContent: 'left',
    '& p': {
      padding: 5
    },
  },
  itemHeaderCancel: {
    textAlign: 'right',
  },
  itemHeaderCannotCancel: {
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'green',
  },
  icon: {
    width: 24,
    height: 24,
    fill: '#000',
  },
  cancelStatus: {
    textAlign: 'center',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: 'red',
    border: '1px solid red',
    padding: '15px 0px',
    margin: '15px 0px',
  },
  deliveryServiceItemName: {
    padding: 5,
    textAlign: 'left'
  },
  couponFieldItemName: {
    padding: 5,
    textAlign: 'left'
  },
  couponFieldItemButton: {
    padding: 5,
    textAlign: 'right'
  },
  deliveryServiceItemAmount: {
    padding: 5,
    textAlign: 'right'
  },
  couponBtn: {
    padding: '15px 0px',
    margin:' 0px !important',
    display: 'flex',
    alignItems: 'center',
  },
  selectField: {
    display: 'flex'
  },
  orderSubTitle: {
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    margin: 5,
  }
});

const OrderDetailEdit = ({classes, order, onRemoveDelivery, isAdmin = false, onOrderChange}) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [showTotalSaved, setShowTotalSaved] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState(null);
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [deliveryServices, setDeliveryServices] = useState([])
  const [products, setProducts] = useState([]);
  const [selectedDeliveryService, setSelectedDeliveryService] = useState(null)
  const [showDeliveryServices, setShowDeliveryServices] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [savedUserAddress, setSavedUserAddress] = useState(null);
  const [forceAddressUpdate, setForceAddressUpdate] = useState(false);
  const [showCouponDiscount, setShowCouponDiscount] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const [total, setTotal] = useState({
    subtotal: 0,
    tax: 0,
    delivery: 0,
    grandtotal: 0,
    totalSaved:0,
    coupon: 0
  });

  const { t } = useTranslation(['common', 'order', 'checkout'])

  const handleUpdatedProduct = async(recvProducts) => {
    setProducts(recvProducts)
  }

  const handleAddressMainAction = (e) => {
    setSavedUserAddress({
      shipping_name: e.shipping_name,
      shipping_address: e.shipping_address,
      shipping_addressB: e.shipping_addressB,
      shipping_province: e.shipping_province,
      shipping_township: e.shipping_township,
      shipping_corregimiento: e.shipping_corregimiento,
      shipping_district: e.shipping_district,
      shipping_zone: e.shipping_zone,
      shipping_city: e.shipping_city,
      shipping_country: e.shipping_country,
      shipping_zip: e.shipping_zip,
      shipping_note: e.shipping_note,
      shipping_email: e.shipping_email,
      shipping_phone: e.shipping_phone,
    })
  }

  const handlePromoCode = async(e) => {
    setSelectedCoupon(e)
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    switch(name) {
      case 'payment_method': {
          const foundPayment = paymentOptions.filter(item => item.id === value);
          if (foundPayment && foundPayment.length) {
            setSelectedPaymentOption(foundPayment[0]);
          }
        break;
      }
      case 'delivery_method': {
          const foundDelivery = deliveryOptions.filter(item => item.id === value);
          if (foundDelivery && foundDelivery.length) {
            setSelectedDeliveryOption(foundDelivery[0]);
          }
        break;
      }
    }
  }

  const handleRevertAddress = () => {
    setSavedUserAddress({
      shipping_name: order.shipping_name,
      shipping_address: order.shipping_address,
      shipping_addressB: order.shipping_addressB,
      shipping_province: order.shipping_province,
      shipping_township: order.shipping_township,
      shipping_corregimiento: order.shipping_corregimiento,
      shipping_district: order.shipping_district,
      shipping_zone: order.shipping_zone,
      shipping_city: order.shipping_city,
      shipping_country: order.shipping_country,
      shipping_zip: order.shipping_zip,
      shipping_note: order.shipping_note,
      shipping_email: order.shipping_email,
      shipping_phone: order.shipping_phone,
    });
  }

  const handleServiceOption = async(val) => {
 
    const { value, name } = val.target;
    const findDeliveryService = deliveryServices.filter(item => item.id === value);
    const deliveryFee = findDeliveryService[0].amount;
    const grandtotal = formatNumber(Number(total.subtotal) + Number(total.tax) + Number(deliveryFee));
    if (findDeliveryService) {
      if (findDeliveryService && deliveryFee) {
        setTotal({
          ...total,
          delivery: Number(deliveryFee),
          grandtotal: grandtotal
        })
      } else {
        setTotal({
          ...total,
          delivery: Number(total.delivery),
          grandtotal: grandtotal
        })
      }
      setSelectedDeliveryService(findDeliveryService[0])
      if (findDeliveryService[0] && findDeliveryService[0].id) {
        setOrderDetail({
          ...orderDetail,
          'deliveryServiceFee': findDeliveryService[0]
        })
      }
    }
  }

  const loadDelivery = async() => {
    const data = await getDeliveryOptions();
    if (data) {
      setDeliveryOptions(data);
      let loadDefault = null;
      if (order && order.deliveryOptionId) {
        loadDefault = data.filter(item => item.id == order.deliveryOptionId)[0];
      } else {
        loadDefault = returnDefaultOption(data);
      }
      if (loadDefault) {
        setSelectedDeliveryOption(loadDefault);
      }
    } else {
      setDeliveryOptions([]);
    }
  }

  const loadDeliveryServices = useCallback(async() => {
    if (selectedDeliveryOption) {
      const data = await getDeliveryServiceGroupCostByDeliveryOption(selectedDeliveryOption.id);
      if (data) {
        const getServices = data
        setDeliveryServices(getServices);
        let foundService = null
        const loadDefault = returnDefaultOption(getServices);
        if (order.deliveryServiceGroupCostId) {
          foundService = getServices.filter(item => item.id == order.deliveryServiceGroupCostId)[0];
          setSelectedDeliveryService(foundService);
        }
        if (loadDefault && !foundService) {
          setSelectedDeliveryService(loadDefault);
        }
      } else {
        setDeliveryServices([]);
      }
    }
  }, [selectedDeliveryOption])

  const loadPayment = useCallback(async() => {
    const data = await getActivePaymentOptions();
    if (data) {
      setPaymentOptions(data);
      let loadDefault = null;
      if (order && order.paymentOptionId) {
        loadDefault = data.filter(item => item.id == order.paymentOptionId)[0];
      } else {
        loadDefault = returnDefaultOption(data);
      }
      if (loadDefault) {
        setSelectedPaymentOption(loadDefault);
      }
    } else {
      setPaymentOptions(null);
    }
  }, [paymentOptions])

  useEffect(() => {
    setForceAddressUpdate(!forceAddressUpdate);

    setOrderDetail({
      ...orderDetail,
      address: savedUserAddress,
    })
  }, [savedUserAddress])

  
  useEffect(() => {
    let subtotal = 0;
    let grandtotal = 0;
    let originalTotal = 0;
    let tax = 0;
    let savedGrandTotal = 0;
    let delivery = total.delivery ? Number(total.delivery) : 0;

    if (products && products.length) {
      products.forEach(item => {
        subtotal += (Number(item.quantity) * Number(item.selectedItem.retailPrice));
        originalTotal += item.selectedItem.originalPrice ? Number(item.selectedItem.originalPrice) * Number(item.quantity) : Number(item.selectedItem.retailPrice) * Number(item.quantity);
      })

      const coupontotal = selectedCoupon ? formatNumber((Number(selectedCoupon.percentage) / 100) * subtotal) : null;
  
      let newSubtotal = Number(subtotal) - Number(coupontotal);
    
      tax = newSubtotal * (Number(process.env.COUNTRY_TAX) / 100);
    
      grandtotal = Number(tax + newSubtotal + delivery);

      savedGrandTotal = isNaN(originalTotal) ? null : Number(originalTotal) - Number(newSubtotal);

      if (coupontotal && !isNaN(savedGrandTotal)) {
        savedGrandTotal = Number(savedGrandTotal) + Number(coupontotal);
      }
  
      if (savedGrandTotal) {
        setShowTotalSaved(true);
      } else {
        setShowTotalSaved(false)
      }
  
      if (!originalTotal) {
        originalTotal = Number(subtotal)
      }
      setTotal({
        ...total,
        subtotal: Number(originalTotal),
        coupon: Number(coupontotal),
        tax: Number(tax),
        grandtotal: Number(grandtotal),
        totalSaved: Number(savedGrandTotal),
      });

    } else {
      setTotal({
        ...total,
        subtotal: 0,
        coupon: 0,
        tax: 0,
        grandtotal: 0,
        totalSaved: 0
      });
    }
  }, [products, total.delivery, selectedCoupon])

  useEffect(() => {
    const totalSaved = Number(order.totalSaved);
    const showSaved = totalSaved && totalSaved > 0 ? true : false;
    setShowTotalSaved(showSaved);
  }, []);

  useEffect(() => {
    if (order && order.orderStatuses) {
      const status = parseInt(order.orderStatuses.id);
      if (canceled_status.indexOf(status) > -1) {
        setIsCancelled(true);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedDeliveryOption) {
      if (selectedDeliveryOption.deliveryOptionDeliveryServiceGroupCost && !selectedDeliveryOption.deliveryOptionDeliveryServiceGroupCost.length) {
        setShowDeliveryServices(false);
        setSelectedDeliveryService(null)
      } else {
        loadDeliveryServices();
      }
    }
    setOrderDetail({
      ...orderDetail,
      deliveryServiceOption: selectedDeliveryOption
    })
  }, [selectedDeliveryOption]);
  
  useEffect(() => {
    setOrderDetail({
      ...orderDetail,
      deliveryServiceFee: selectedDeliveryService
    })
    if (selectedDeliveryService) {
      setShowDeliveryServices(true);
    }
    if (selectedDeliveryService && selectedDeliveryService.amount) {
      setTotal({
        ...total,
        delivery: Number(selectedDeliveryService.amount)
      })
    } else {
      setTotal({
        ...total,
        delivery: formatNumber(0)
      })
    }
  }, [selectedDeliveryService]);
  
  useEffect(() => {
    if (selectedCoupon) {
      setShowCouponDiscount(true)
    } else {
      setShowCouponDiscount(false)
    }
  }, [selectedCoupon]);

  useEffect(() => {
    setOrderDetail({
      ...orderDetail,
      products: products,
      total: total,
      coupon: selectedCoupon
    })
  }, [total]);

  useEffect(() => {
    onOrderChange(orderDetail)
  }, [orderDetail]);

  useEffect(() => {
    loadDelivery();
    loadPayment();
    setOrderDetail({
      ...orderDetail,
      total: {
        subtotal: Number(order.subtotal),
        tax: Number(order.tax),
        delivery: Number(order.delivery),
        grandtotal: Number(order.grandtotal),
        totalSaved: Number(order.totalSaved),
      },
      coupon: Number(order.coupon) || null
    })

    setTotal({
      subtotal: Number(order.subtotal),
      tax: Number(order.tax),
      delivery: Number(order.delivery),
      grandtotal: Number(order.grandtotal),
      totalSaved: Number(order.totalSaved),
      coupon: Number(order.coupon) || null
    });

    const showUserAdress = checkOrderAddressIsEmpty(order);

    if (showUserAdress) {
      handleRevertAddress();
    }
  }, [])

  const taxableCheckboxLabel = { inputProps: { 'aria-label': 'Taxable' } };
  const [taxableChecked, setTaxableChecked] = useState(order.taxable);
  const handleTaxableChange = (e) => {
    const taxable = e.target.checked;
    order.taxable = taxable;
    setTaxableChecked(taxable);
  };

  return orderDetail && (
    <Grid item lg={12} xs={12} className={classes.root}>
      <Grid container className={classes.orderContainer}>
        {
          isCancelled && (
            <Grid item lg={12} xs={12} className={classes.cancelReason}>
              <p>{ t('reason') }:</p>
              { order.orderCancelReasons && `${order.orderCancelReasons.name}` }
            </Grid>
          )
        }
        {
          isCancelled && (
            <Grid item lg={12} xs={12}>
              <div className={classes.cancelStatus}>{order.orderStatuses.name}</div>
            </Grid>
          )
        }
        <Grid item lg={12} xs={12} className={classes.itemHeader}>
          <Grid container className={classes.orderHeaderContainer}>
            <Grid item lg={6} xs={12} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem1}`}>
              <span className={classes.orderHeaderSubTitle}>{ t('common:date') }</span>
              <span>{moment(order.createdAt).format('MMMM D, YYYY')}</span>
            </Grid>
            <Grid item lg={6} xs={12} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem4}`}>
              <span className={classes.orderHeaderSubTitle}>{ t('order:order_number') }</span>
              <span>{order.order_number}</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12} className={classes.itemHeader}>
          <PromotionalCode couponId={order.promotionCodeId} classes={{title: classes.orderSubTitle}} onApply={handlePromoCode} />
        </Grid>
        {
          order.deliveryServiceFee && (
            <Grid item lg={12} xs={12} className={classes.itemHeader}>
              <Grid container className={classes.orderHeaderContainer}>
                <Grid item lg={11} xs={11} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem1} ${classes.orderHeaderItemTitle}`}>
                  <span className={classes.orderHeaderSubTitle}>{ t('order:delivery_service') }</span>
                </Grid>
                <Grid item lg={1} xs={1} className={`${classes.orderFlexColumn} ${classes.orderHeaderItem} ${classes.orderHeaderItem1} ${classes.orderHeaderItemClose}`}>
                  <Button className={`secondButtonSmall`} onClick={onRemoveDelivery}>&#10005;</Button>
                </Grid>
                <Grid item lg={8} xs={8} className={classes.deliveryServiceItemName}>
                  <span>N/A</span>
                </Grid>
                <Grid item lg={4} xs={4} className={classes.deliveryServiceItemAmount}>
                  <span>${ order.deliveryServiceFee }</span>
                </Grid>
              </Grid>
            </Grid>
          )
        }
        {
          selectedDeliveryOption && (
            <Grid item lg={12} xs={12}  className={classes.itemHeader}>
              <Grid container className={classes.orderHeaderContainer}>
                <Grid item lg={12} xs={12} className={classes.orderSubTitle}>
                { t('common:delivery_method') }
                </Grid>
                <Grid item lg={12} xs={12}>
                  <FormControl variant="outlined" className={classes.selectField}>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      name="delivery_method"
                      value={selectedDeliveryOption && selectedDeliveryOption.id || 1}
                      onChange={handleChange}
                    >
                      {
                        deliveryOptions && deliveryOptions.map((delivery, indx) => {
                          return (
                            <MenuItem value={delivery.id} key={indx}>{delivery.name}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          )
        }
        {
          showDeliveryServices && (
            <Grid item lg={12} xs={12}  className={classes.itemHeader}>
              <Grid container className={classes.orderHeaderContainer}>
                <Grid item lg={12} xs={12} className={classes.orderSubTitle}>
                { t('checkout:delivery_service_options') }
                </Grid>
                <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                    <FormControl variant="outlined" className={classes.selectField}>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={selectedDeliveryService ? selectedDeliveryService.id : ''}
                        name="deliveryOption"
                        onChange={handleServiceOption}
                      >
                        {
                          deliveryServices && deliveryServices.map((delivery, indx) => {
                            return (
                              <MenuItem value={delivery.id} key={indx}>{delivery.name}</MenuItem>
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                </Grid>
              </Grid>    
            </Grid>             
          )
        }
        <Grid item lg={12} xs={12} className={classes.itemHeader}>
          <AddressMainBox onAddressSubmit={handleAddressMainAction} onHandleRevert={handleRevertAddress} updateAddress={forceAddressUpdate} showTitle={false} deliveryOption={selectedDeliveryOption} classes={{subTitle: classes.orderSubTitle}} initialAddress={savedUserAddress} userId={order.userId} />
        </Grid>
        {
          paymentOptions && (
            <Grid item lg={12} xs={12}  className={classes.itemHeader}>
                <Grid container className={classes.orderHeaderContainer}>
                  <Grid item lg={12} xs={12} className={classes.orderSubTitle}>
                  { t('common:payment_method') }
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <FormControl variant="outlined" className={classes.selectField}>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={paymentOptions[0].id}
                        name="payment_method"
                        onChange={handleChange}
                      >
                        {
                          paymentOptions && paymentOptions.map((payment, indx) => {
                            return (
                              <MenuItem value={payment.id} key={indx}>{payment.name}</MenuItem>
                            )
                          })
                        }
                        
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
            </Grid>
          )
        }

        <Grid item lg={12} xs={12} className={classes.itemProduct}>
          <OrderItemEdit onUpdateProduct={handleUpdatedProduct} order={order} isAdmin={isAdmin} />
        </Grid>
        <Grid item lg={12} xs={12} className={classes.orderTotalSection}>
          <Grid container className={classes.orderTotalContainer}>
            <Grid item lg={5} className={classes.orderTotalItem}>
                <Grid container>
                  <Grid item lg={12} xs={12}>
                    <Grid container>
                      <Grid item lg={6} xs={6}>
                        { t('common:subtotal') }
                      </Grid>
                      <Grid item lg={6} xs={6}>
                        ${formatNumber(total.subtotal)}
                      </Grid>
                    </Grid>
                  </Grid>
                  
                  {
                    showCouponDiscount && (
                      <Grid item lg={12} xs={12}>
                        <Grid container>
                          <Grid item lg={6} xs={6}>
                            { t('common:discount_with_coupon') }
                          </Grid>
                          <Grid item lg={6} xs={6}>
                            - ${formatNumber(total.coupon)}
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  }
  
                  <Grid item lg={12} xs={12}>
                    <Grid container>
                      <Grid item lg={6} xs={6}>
                        { t('common:tax') } 7%
                      </Grid>
                      <Grid item lg={6} xs={6}>
                        ${formatNumber(total.tax)}
                      </Grid>
                    </Grid>
                  </Grid>
  
                  <Grid item lg={12} xs={12}>
                    <Grid container>
                      <Grid item lg={6} xs={6}>
                        { t('common:delivery') }
                      </Grid>
                      <Grid item lg={6} xs={6}>
                        ${formatNumber(total.delivery)}
                      </Grid>
                    </Grid>
                  </Grid>
  
                  <Grid item lg={12} xs={12}>
                    <Grid container>
                      <Grid item lg={6} xs={6}>
                        { t('common:grand_total') }
                      </Grid>
                      <Grid item lg={6} xs={6}>
                        <b>${formatNumber(total.grandtotal)}</b>
                      </Grid>
                    </Grid>
                  </Grid>
                  {
                    showTotalSaved && (
                      <Grid item lg={12} xs={12}>
                        <Grid container>
                          <Grid item lg={6} xs={6}>
                            { t('common:message:you_saved') }
                          </Grid>
                          <Grid item lg={6} xs={6}>
                            - ${formatNumber(total.totalSaved)}
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  }
                </Grid>

                <Grid container>
                  <Grid item lg={12} xs={12}>
                      <Grid container>
                        <Grid item lg={6} xs={6}>
                          { t('common:taxable') }
                        </Grid>
                        <Grid item lg={6} xs={6}>
                          <Checkbox {...taxableCheckboxLabel} value="true" onChange={handleTaxableChange} checked={taxableChecked} />
                        </Grid>
                      </Grid>
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
 
OrderDetailEdit.protoTypes = {
  classes: T.object,
  order: T.object,
  isAdmin: T.bool,
  onRemoveDelivery: T.func,
  onOrderChange: T.func
}

export default withStyles(styles)(OrderDetailEdit);