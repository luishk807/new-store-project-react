import Cookies from 'js-cookie';

export const setCookie = (data) => {
  Cookies.set('authorization', data.data.authorization)
}

export const getCookie = () => {
  return Cookies.get('authorization');
}

export const removeCookie = () => {
  return Cookies.remove('authorization');
}

export const verifyCookie = () => {
  const cookie = getCookie();
  return !!cookie;
}