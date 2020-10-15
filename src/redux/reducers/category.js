import * as t from '../types';
import HYDRATE from 'next-redux-wrapper';
// reducers are your storages
// const main = (state, action) { }
const category = (state = {
    // default value
    id: null,
    name: null,
    icon: null,
    status: null,
}, action) => {
  // check type of action
  switch(action.type){
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      }
    case t.SET_CATEGORY:
      return {
        ...state,
          // payload is the values
          id: action.payload.id,
          name: action.payload.name,
          status: action.payload.status,
      };
    default:
      // nothin happens, return same
      return {...state}
  }
};

export default category;