import * as t from '../types';
import HYDRATE from 'next-redux-wrapper';
// reducers are your storages
// const main = (state, action) { }

const initialUser = {
  // default value
  id: null,
  first_name: null,
  last_name: null,
  password: null,
  email: null,
  mobile: null,
  userRole: null,
  phone: null,
  img: null,
  status: null,
  gender: null,
  date_of_birth: null,
}
const user = (state = initialUser, action) => {
  // check type of action
  switch(action.type){
    case HYDRATE:
      return {
        ...state,
        ...action.payload
      }
    case t.SET_USER:
      return {
        ...state,
          // payload is the values
          id: action.payload.id,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          password: action.payload.password,
          email: action.payload.email,
          mobile: action.payload.mobile,
          userRole: action.payload.userRole,
          phone: action.payload.phone,
          img: action.payload.img,
          status: action.payload.status,
          gender: action.payload.gender,
          date_of_birth: action.payload.date_of_birth,
      };
    case t.RESET_USER:
      return initialUser;
    default:
      // nothin happens, return same
      return {...state}
  }
};

export default user;