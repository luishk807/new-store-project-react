import Cookies from 'js-cookie';
import jwt from 'jwt-decode' // import dependency

export const setCookie = (data) => {
  Cookies.set('authorization', { 
    token: data.data.authorization, 
    userRoleId: data.data.user.userRoleId }
  , { expires: 1 })
}

export const getCookie = () => {
  let cookie = { token: null, userRole: null }
  try {
    const test = Cookies.get('authorization');
    cookie = JSON.parse(test);
    if (cookie && cookie.token) {
      cookie = JSON.parse(cookie);
    }
  } catch(err) {}
  return cookie;
}

export const removeCookie = () => {
  return Cookies.remove('authorization');
}

export const decodeCookie = () => {
  try{
    const cookie = Cookies.get('authorization');
    return jwt(cookie); // decode your token here
  }catch(err){
    return null
  }
}

export const verifyCookie = () => {
  const { token } = getCookie();
  return !!cookie;
}