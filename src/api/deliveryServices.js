import Api from '../services/api';

export const saveDeliveryService = async(data) => {
  return Api.post(`delivery-services`, data);
}

export const deleteDeliveryServiceById = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`delivery-services/${id}`, {}, config);
}

export const getDeliveryServices = async(data) => {
  return Api.get(`delivery-services`, data);
}
