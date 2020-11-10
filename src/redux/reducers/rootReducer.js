import { combineReducers } from 'redux';
import user from './user';
import categories from './categories';
import brands from './brands';
import vendors from './vendors';
import genders from './genders';
import workRoles from './workRoles';
import countries from './countries';
import icons from './icons';
import loadMain  from './';
import cart  from './cart';

// to combine all reducers 
const rootReducer = combineReducers({
  // add all the reducers here
  user: user,
  cart: cart,
  // categories: categories,
  // loadMain: loadMain,
  // brands: brands,
  vendor: vendors,
  // genders: genders,
  // workRoles: workRoles, 
  // countries: countries, 
  // icons: icons,
})

export default rootReducer;