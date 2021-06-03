import Api from '../services/api';

export const createPaymentOption = async(data) => {
  return Api.post(`payment-options`, data);
}

export const savePaymentOption = async(data) => {
  return Api.put(`payment-options`, data);
}

export const deletePaymentOptionById = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`payment-options/${id}`, {}, config);
}

export const getPaymentOptionById = async(id) => {
  return Api.get(`payment-options/${id}`);
}

export const getPaymentOptions = async(data) => {
  return Api.get(`payment-options`, data);
}
export const getActivePaymentOptions = async(data) => {
  return Api.get(`payment-options/active-payments`);
}