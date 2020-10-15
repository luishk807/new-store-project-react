import * as t from '../types';
import HYDRATE from 'next-redux-wrapper';
import { decodeCookie } from '../../utils/cookie';
import { verifyAut } from '../../utils/cookie';
import { getItemById } from '../../api';
import { ADMIN_SECTIONS } from '../../constants/admin';
import { setUser } from '../actions/main';
// reducers are your storages
// const main = (state, action) { }
const user = (state = {
    // default value
    id: null,
    first_name: 'guest',
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
}, action) => {
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
    default:
      // nothin happens, return same
      return {...state}
  }
};

// for thunk usage
export const saveUsers = () => async(dispatch, getState) => {
  const users = getState().user;
  await fetch("http://localhost:8080/user",{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(users),
  })
  console.log("success")
}

export const loadUsers = () => async(dispatch, getState) => {
  const cookie = decodeCookie();
  if (cookie && !getState().user.id) {
    const users = await getItemById(ADMIN_SECTIONS.user.url, cookie.id);
    dispatch(setUser(users[0]))
  }
}

export default user;