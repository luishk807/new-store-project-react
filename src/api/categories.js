import Api from '../services/api';

export const saveCategirues = async(data) => {
  return Api.post(`categories`, data);
}

export const deleteCategeoryByUserId = async(data) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`categories/${data.product}`, {}, config);
}

export const getCategories = async(data) => {
  return Api.get(`categories`, data);
}
