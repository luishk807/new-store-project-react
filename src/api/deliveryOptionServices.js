import Api from '@/services/api';

export const createDeliveryOptionService = async(data) => {
  return Api.post(`delivery-option-services`, data);
}

export const saveDeliveryOptionService = async(data) => {
  return Api.put(`delivery-option-services`, data);
}

export const deleteDeliveryOptionServiceById = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`delivery-option-services/${id}`, {}, config);
}

export const getDeliveryServicesByDeliveryOption = async(id) => {
  return Api.get(`delivery-option-services/delivery-option/${id}`);
}

export const getActiveDeliveryServicesByDeliveryOption = async(id) => {
  return Api.get(`delivery-option-services/a/delivery-option/${id}`);
}

export const getDeliveryOptionServiceById = async(id) => {
  return Api.get(`delivery-option-services/${id}`);
}

export const getDeliveryOptionServices = async(data) => {
  return Api.get(`delivery-option-services`, data);
}

export const getActiveDeliveryOptionServices = async(data) => {
  return Api.get(`delivery-option-services/ac-options`, data);
}
