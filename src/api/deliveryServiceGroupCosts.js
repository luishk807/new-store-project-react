import Api from '../services/api';

export const getDeliveryServiceGroupCosts = async() => {
  return Api.get(`delivery-service-group-costs`);
}

export const getDeliveryServiceGroupCostById = async(id) => {
  return Api.get(`delivery-service-group-costs/${id}`);
}

export const getDeliveryServiceGroupCostByFilter = async(data) => {
  return Api.get(`delivery-service-group-costs/filter/search/cost`, data);
}

export const getDeliveryServiceGroupCostByDeliveryOption = async(id) => {
  return Api.get(`delivery-service-group-costs/option/${id}/cost`);
}

export const deleteDeliveryServiceCostGroupById = async(id) => {
  return Api.delete(`delivery-service-group-costs/${id}`);
}