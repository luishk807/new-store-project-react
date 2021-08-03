import Api from '@/services/api';
import { removeCookie, setCookie, getCookie } from '@/utils/cookie';
import { config } from 'config';

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

export const requestResetPassword = async(form) => {
  const data = {
    email: form.email
  }
  return await Api.rawPost(`login/reset/request/password`, data);
}

export const resetPassword = async(data) => {
  return await Api.rawPost(`login/reset/password`, data);
}

export const logout = () => {
  removeCookie();
  return true
}

export const verifyAuth = () => {
  let {token, userRole} = getCookie();
  const conv_userRole = Number(userRole)
  return !!token && config.adminRoles.includes(conv_userRole);
}

export const verifyUser = () => {
  let { token } = getCookie();
  return !!token;
}