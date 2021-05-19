import Api from '../services/api';

export const createPromotionCode = async(data) => {
  return Api.post(`promotion-codes`, data);
}

export const savePromotionCode = async(data) => {
  return Api.put(`promotion-codes`, data);
}

export const deletePromotionCodeById = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`promotion-codes/${id}`, {}, config);
}

export const getPromotionCodeById = async(id) => {
  return Api.get(`promotion-codes/${id}`);
}

export const getActivePromotionCodeByCode = async(data) => {
  return Api.get(`promotion-codes/promo/search`, data);
}

export const getPromotionCodeByCode = async(data) => {
  return Api.get(`promotion-codes/search/admin`,data);
}

export const getActivePromotionCodes = async(data) => {
  return Api.get(`promotion-codes`, data);
}