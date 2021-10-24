import * as t from '@/redux/types';
import HYDRATE from 'next-redux-wrapper';
// reducers are your storages
// const main = (state, action) { }
const vendors = (state = [], action) => {
  // check type of action
  switch(action.type){
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      }
    case t.SET_VENDORS:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        email: action.payload.email,
        mobile: action.payload.mobile,
        img: action.payload.img,
        phone: action.payload.phone,
        status: action.payload.status,
        position: action.payload.position,
        userId: action.payload.userId,
        user: action.payload.vendorUser,
      };
    default:
      // nothin happens, return same
      return {...state}
  }
};

export default vendors;