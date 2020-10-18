import * as t from '../types';
import HYDRATE from 'next-redux-wrapper';
// reducers are your storages
// const main = (state, action) { }
const cart = (state = [], action) => {
  // check type of action
  switch(action.type){
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      }
    case t.ADD_CART:
      return {
        ...state,
          // payload is the values
          'data':action.payload,
      };
    case t.DELETE_CART:
      return {
        ...state,
          // payload is the values
          'data':action.payload,
      };
    case t.UPDATE_CART:
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

export default cart;