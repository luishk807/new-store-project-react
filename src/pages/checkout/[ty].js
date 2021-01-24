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
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { defaultCountry } from '../../../config';
import { emptyCart } from '../../redux/actions/main'
import CartBox from '../../components/CartBlock';
import Icons from '../../components/common/Icons';
import LayoutTemplate from '../../components/common/Layout/LayoutTemplate';
import ActionForm from '../../components/common/Form/Action/Add';
import Snackbar from '../../components/common/Snackbar';
import { formatNumber } from '../../utils';
import { validateForm, handleFormResponse } from '../../utils/form';
import { processOrderByUser } from '../../api/orders';
import { getDeliveryOptions } from '../../api/deliveryOptions';
import { getAddresses } from '../../api/addresses';
import Api from '../../services/api';
import AddressSelection from '../../components/address/AddressSelection';
import RadioBox from '../../components/common/RadioBox';

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

  addressBox: {
    padding: 10,
    margin: '10px 0px',
  }
});


const Home = ({userInfo, classes, cart, emptyCart}) => {
  const router = useRouter()
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [form, setForm] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [address, setAddress] = useState({});
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

  const handleDeliveryOption = async(val) => {
    await setTotal({
      ...total,
      delivery: val[0].total
    })
    await setForm({
      ...form,
      delivery: val[0].id
    })
  }

  const handleFormChange = async(add) => {
    setGuestAddress({
      ...guestAddress,
      [add.key]: typeof add.val === "object" ? add.val.name : add.val
    })
  }

  const handleAddressSelection = async(evt) => {
    await setAddress(evt)
  }

  const handleCartTotal = async(evt) => {
    setTotal(evt);
  }

  const handlePlaceOrder = async() => {
    let errorFound = false;
    let key = '';
    
    for (var i in form) {
      errorFound = await validateForm(i, form[i], ['address', 'cart']);
      key = i;
    }
    if (!errorFound) {
      setSnack({
        severity: 'error',
        open: true,
        text: `Unable to process order, ${i} is required`
      })
    } else {
      const formSubmit = Object.assign({}, form);
      const useAddress = isUser ? Object.assign({}, address) : Object.assign({}, guestAddress)
      const cart = formSubmit.cart;
      formSubmit['shipping_name'] = useAddress.name;
      formSubmit['shipping_address'] = useAddress.address;
      formSubmit['shipping_corregimiento'] = useAddress.corregimiento;
      formSubmit['shipping_district'] = useAddress.district;
      formSubmit['shipping_phone'] = useAddress.phone;
      formSubmit['shipping_province'] = useAddress.province;
      formSubmit['shipping_country'] = useAddress.country;
      formSubmit['shipping_email'] = useAddress.email;
      formSubmit['cart'] = JSON.stringify(cart);
      formSubmit['subtotal'] = total.subtotal;
      formSubmit['tax'] = total.taxes;
      formSubmit['grandTotal'] = total.grandTotal;
      formSubmit['delivery'] = total.delivery;
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
    setDeliveryOptions(data)
  }

  useEffect(() => {
    let form = {
      userid: userInfo.id,
      delivery: '1',
      cart: cart,
    }
    const initialAddress = {
      name: null,
      address: null,
      email: null,
      phone: null,
      province: null,
      district: null,
      corregimiento: null,
      country: defaultCountry,
    }
    
    setAddress({
      name: null,
      address: null,
      email: null,
      phone: null,
      province: null,
      district: null,
      corregimiento: null,
      country: defaultCountry,
    })

    setGuestAddress(
      {
        name: null,
        address: null,
        email: null,
        phone: null,
        province: null,
        district: null,
        corregimiento: null,
        country: defaultCountry.name,
      }
    )

    if (userInfo.id) {
      setIsUser(true)
    }

    loadDelivery();
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
                        {
                          isUser ? (
                            <AddressSelection onSelected={handleAddressSelection} />
                          ) : (
                            <ActionForm 
                              classes={{root: classes.formRoot}}
                              formSection={{
                                name: 'Direccion de entrega',
                              }} 
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
                      <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                        <RadioBox selected={form.delivery} onSelected={handleDeliveryOption} options={deliveryOptions} name="delivery" title="Opciones de Entrega" />
                      </Grid>
                      <Grid item lg={12} xs={12} className={classes.contentBoxSection}>
                        <div className={classes.contentBoxSectionContainer}>
                          pago
                        </div>
                      </Grid>
                      <Grid item className={classes.itemSection} lg={12} xs={12}>
                        <Button onClick={handlePlaceOrder} className={`mainButton`}>
                            Place Order
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className={classes.itemSection} lg={5} xs={12}>
                    <CartBox deliveryOption={total.delivery} onCartTotal={handleCartTotal} data={cart} />
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
}

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