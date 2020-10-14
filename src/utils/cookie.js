import Cookies from 'js-cookie';
import jwt from 'jwt-decode' // import dependency

export const setCookie = (data) => {
  Cookies.set('authorization', data.data.authorization)
}

export const getCookie = () => {
  return Cookies.get('authorization');
}

export const removeCookie = () => {
  return Cookies.remove('authorization');
}

export const decodeCookie = () => {
  const cookie = Cookies.get('authorization');
  return jwt(cookie); // decode your token here
}

export const verifyCookie = () => {
  const cookie = getCookie();
  return !!cookie;
}