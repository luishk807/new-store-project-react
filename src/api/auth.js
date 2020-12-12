import Api from '../services/api';
import { removeCookie, setCookie, getCookie } from '../utils/cookie';

const contentTypeJson = { 'Content-Type': 'application/json' };

export const login = async(data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const result = await Api.rawPost(`login`, data, contentTypeJson);
  if (result) {
    setCookie(result)
  }
  return result;
}

export const adminLogin = async(data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const result = await Api.rawPost(`adminlogin`, data, contentTypeJson);

  if (result) {
    setCookie(result)
  }
  return result;
}

export const logout = () => {
  removeCookie();
  return true
}

export const verifyAuth = () => {
  let {token, userRole} = getCookie();
  return !!token && userRole == 1;
}

export const verifyUser = () => {
  let { token } = getCookie();
  return !!token;
}