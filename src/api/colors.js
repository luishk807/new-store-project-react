import Api from '../services/api';

export const createColor = async(data) => {
  return Api.post(`colors`, data);
}

export const deleteColorById = async(id) => {
  return Api.delete(`colors/${id}`);
}

export const getColors = async(data) => {
  return Api.get(`colors`, data);
}

export const getColorsById = async(id) => {
  return Api.get(`colors/${id}`);
}