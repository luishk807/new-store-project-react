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
  const local = await localStorage.getItem('user')
  if (getState().user.id) {
    return;
  }

  if (local) {
    const localJson =  JSON.parse(local);
    dispatch(setUser(localJson))
  } else {
    try{
      cookie = decodeCookie();
      if (cookie && !getState().user.id) {
        const users = await getItemById(ADMIN_SECTIONS.user.url, cookie.id);
        if (users[0]) {
          localStorage.setItem('user',  JSON.stringify(users[0]))
          dispatch(setUser(users[0]))
        }
      }
    } catch (err){
      dispatch(resetUser());
      localStorage.removeItem('user');
    }
  }

}

export default loadMain;