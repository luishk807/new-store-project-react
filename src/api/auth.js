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
  localStorage.clear();
  return true
}

export const verifyAuth = () => {
  let {token, userRoleId} = getCookie();
  return !!token && userRoleId == 1;
}

export const verifyUser = () => {
  let {token, userRoleId} = getCookie();
  return !!token;
}