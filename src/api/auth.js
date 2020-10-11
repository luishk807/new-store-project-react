import Api from '../services/api';

export const login = (data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const config = {
    'Content-Type': 'application/json',
    'Content-Length': Object.keys(data).length
  }
  return Api.post(`/login`, data, config);
}