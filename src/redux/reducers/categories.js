import * as t from '../types';
import HYDRATE from 'next-redux-wrapper';
// reducers are your storages
// const main = (state, action) { }
const categories = (state = [], action) => {
  // check type of action
  switch(action.type){
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      }
    case t.SET_CATEGORIES:
      return {
        ...state,
          // payload is the values
          'data':action.payload,
      };
    default:
      // nothin happens, return same
      return {...state}
  }
};

export default categories;