import Api from '../services/api';
import { removeCookie, setCookie, getCookie } from '../utils/cookie';

export const login = async(data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const config = {
    'Content-Type': 'application/json',
  }
  const result = await Api.post(`/login`, data, config);
  if (result) {
    setCookie(result)
  }
  return result;
}

export const adminLogin = async(data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const config = {
    'Content-Type': 'application/json',
  }
  const result = await Api.post(`/adminlogin`, data, config);
  if (result) {
    setCookie(result)
  }
  return result;
}

export const logout = () => {
  removeCookie();
  return true
}

export const verifyAdmin = () => {
  const cookie = getCookie();
  console.log('cookie',cookie)
  return !!cookie;
}

export const verifyAuth = () => {
  const cookie = getCookie();
  console.log('cookie',cookie)
  return !!cookie;
}