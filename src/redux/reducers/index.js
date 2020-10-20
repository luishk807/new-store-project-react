import * as t from '../types';
import { decodeCookie } from '../../utils/cookie';
import { getItemById, getItems } from '../../api';
import { ADMIN_SECTIONS } from '../../constants/admin';
import { CATEGORY_ICONS } from '../../config';
import { 
  setUser,
  resetUser,
  setStatuses,
  setCategories, 
  setBrands, 
  setStores,
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
    return;
  }

  if (userLocal) {
    const userJson =  JSON.parse(userLocal);
    dispatch(setUser(userJson))
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
    dispatch(updateCart(cartJson))
  }
}

export default loadMain;