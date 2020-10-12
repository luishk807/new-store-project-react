import Api from '../services/api';
import cookieCutter from 'cookie-cutter';

export const login = (data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const config = {
    'Content-Type': 'application/json',
  }
  return Api.post(`/login`, data, config);
}