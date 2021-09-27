import Api from '@/services/api';

export const getDeliveryServiceCosts = async() => {
  return Api.get(`delivery-service-costs`);
}

export const getDeliveryServiceCostById = async(id) => {
  return Api.get(`delivery-service-costs/${id}`);
}

export const getDeliveryServiceCostByFilter = async(data) => {
  return Api.get(`delivery-service-costs/filter/search/cost`, data);
}

export const deleteDeliveryServiceCostById = async(id) => {
  return Api.delete(`delivery-service-costs/${id}`);
}