import Api from '../services/api';
import { verifyCookie } from '../utils/cookie';

export const getOrderByUser = async(data) => {
  if (!verifyCookie()) {
    return;
  }
  return Api.get(`orders`, data);
}

export const getOrderById = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  return Api.get(`orders`, data);
}

export const saveOrder = async(data, id) => {
  if (!Object.keys(data).length) {
    return;
  }

  return Api.save(`orders/${id}`, data);
}

export const deleteOrderById = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`orders/${id}`, {}, config);
}

export const processOrderByUser = async(data) => {
  // if (!verifyCookie()) {
  //   return;
  // }
  return Api.post(`orders`, data);
}