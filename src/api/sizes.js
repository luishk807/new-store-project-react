import Api from '../services/api';

export const createSize = async(data) => {
  return Api.post(`product-sizes`, data);
}

export const deleteSizeById = async(id) => {
  return Api.delete(`product-sizes/${id}`);
}

export const getSizes = async(data) => {
  return Api.get(`product-sizes`, data);
}

export const getSizesById = async(id) => {
  return Api.get(`product-sizes/${id}`);
}

export const getSizesByProductId = async(id) => {
  return Api.get(`product-sizes/product/${id}`);
}
