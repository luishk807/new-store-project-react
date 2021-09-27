import Api from '@/services/api';

export const saveDeliveryOption = async(data) => {
  return Api.post(`delivery-options`, data);
}

export const deleteDeliveryOptionById = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`delivery-options/${id}`, {}, config);
}

export const getDeliveryOptions = async(data) => {
  return Api.get(`delivery-options`, data);
}

export const getDeliveryOptionById = async(id) => {
  return Api.get(`delivery-options/${id}`);
}

