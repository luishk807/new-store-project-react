import * as t from '../types';
import { decodeCookie } from '../../utils/cookie';
import { getItemById, getItems } from '../../api';
import { ADMIN_SECTIONS } from '../../constants/admin';
import { CATEGORY_ICONS } from '../../../config';
import { getVendorByUserId } from '../../api/vendor';

import { 
  setUser,
  resetUser,
  setCategories, 
  setBrands, 
  setIcons,
  setGenders,
  setVendors,
  setCountries,
  setWorkRoles,
  addCart,
  deleteCart,
  updateCart
} from '../actions/main';

// for thunk usage

const loadMain = () => async(dispatch, getState) => {
  let cookie = null;
  const userLocal = await localStorage.getItem('user')
  if (getState().user.id) {
    cookie = decodeCookie();
    if (!cookie) {
      dispatch(resetUser());
      localStorage.removeItem('user');
    }
    return;
  }

  if (userLocal) {
    const userJson =  JSON.parse(userLocal);
    dispatch(setUser(userJson))
    const vendor = await getVendorByUserId({id: userJson.id});
    if (vendor) {
      dispatch(setVendors(vendor))
    }
  } else {
    try{
      cookie = decodeCookie();
      if (cookie && !getState().user.id) {
        const users = await getItemById(ADMIN_SECTIONS.user.url, cookie.id);
        if (users) {
          localStorage.setItem('user',  JSON.stringify(users))
          dispatch(setUser(users))
        }
      }
    } catch (err){
      dispatch(resetUser());
      localStorage.removeItem('user');
    }
  }
  //localStorage.removeItem('cart')
  let cartLocal = await localStorage.getItem('cart');
  if (cartLocal && !Object.keys(getState().cart).length) {
    const cartJson =  JSON.parse(cartLocal);
    if (!Object.keys(cartJson).length || !cartJson) {
      localStorage.removeItem('cart');
    } else {
      dispatch(updateCart(cartJson))
    }
  }
}

export default loadMain;