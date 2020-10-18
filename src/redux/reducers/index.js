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
} from '../actions/main';

// for thunk usage

const loadMain = () => async(dispatch, getState) => {
  let cookie = null;
  try{
    cookie = decodeCookie();
    if (cookie && !getState().user.id) {
      const users = await getItemById(ADMIN_SECTIONS.user.url, cookie.id);
      if (users[0]) {
        dispatch(setUser(users[0]))
      }
  
      // const categories = await getItems(ADMIN_SECTIONS.category.url);
      // if (categories) {
      //   dispatch(setCategories(categories))
      // }
  
      // const countries = await getItems(ADMIN_SECTIONS.country.url);
      // if (countries) {
      //   dispatch(setCountries(countries))
      // }
  
      // const brands = await getItems(ADMIN_SECTIONS.brand.url);
      // if (brands) {
      //   dispatch(setBrands(brands))
      // }
  
      // const icons = await CATEGORY_ICONS;
      // if (icons) {
      //   dispatch(setIcons(icons))
      // }
  
      // const genders = await getItems(ADMIN_SECTIONS.gender.url);
      // if (genders) {
      //   dispatch(setGenders(genders))
      // }
  
      // const workRoles = await getItems(ADMIN_SECTIONS.workRole.url);
      // if (workRoles) {
      //   dispatch(setWorkRoles(workRoles))
      // }
  
      // const vendors = await getItems(ADMIN_SECTIONS.vendor.url);
      // if (vendors) {
      //   dispatch(setVendors(vendors))
      // }
  
      // const statuses = await getItems(ADMIN_SECTIONS.status.url);
      // if (statuses) {
      //   dispatch(setStatuses(statuses))
      // }
  
      // const stores = await getItems(ADMIN_SECTIONS.store.url);
      // if (stores) {
      //   dispatch(setStores(stores))
      // }
      
    }
  } catch (err){
    console.log("ejjj")
    dispatch(resetUser());
  }
}

export default loadMain;