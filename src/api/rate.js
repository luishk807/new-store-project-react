import Api from '../services/api';

export const saveProductRate = async(data) => {
  return Api.post(`productrates`, data);
}

export const getProductRates = async(data) => {
  return Api.get(`productrates`, data);
}

export const getAllProductRatesById = async(data) => {
  return Api.get(`productallrates`, data);
}