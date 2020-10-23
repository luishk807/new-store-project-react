import Api from '../services/api';

export const saveRate = async(data) => {
  return Api.post(`/productrates`, data);
}

export const getRates = async(data) => {
  return Api.get(`/productrates`, data);
}