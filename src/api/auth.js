import Api from '../services/api';
import { removeCookie, setCookie, getCookie } from '../utils/cookie';
import Snackbar from '../components/common/Snackbar';

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

export const logout = () => {
  removeCookie();
  window.location.href="/admin"
}

export const verifyAuth = () => {
  const cookie = getCookie();
  console.log('cookie',cookie)
  return !!cookie;
}