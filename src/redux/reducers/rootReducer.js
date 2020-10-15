import { combineReducers } from 'redux';
import user from './user';
import category from './category';

// to combine all reducers 
const rootReducer = combineReducers({
  // add all the reducers here
  user: user,
  category: category,
})

export default rootReducer;