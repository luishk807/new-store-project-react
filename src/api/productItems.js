import Api from '../services/api';
import { verifyCookie } from '../utils/cookie';

export const getAllProductItems = async() => {
  return Api.get(`product-items`);
}

export const getAllProductItemsByProductId = async(id) => {
  return Api.get(`product-items/product/${id}`);
}

export const getProductItemById = async(id) => {
  return Api.get(`product-items/${id}`);
}

export const getProductItemByIds = async(ids) => {
  if (!ids) {
    return;
  }
  const data = {
    ids: ids
  }
  
  return Api.get(`product-items`, data);
}

export const saveProductItem = async(data, id) => {
  if (!Object.keys(data).length) {
    return;
  }
  const form = 'image' in data ? {
    ...data,
    'image': data.image.files
  } : {
    ...data
  }

  return Api.save(`product-items/${id}`, form);
}

export const createProductItem = async(data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const form = 'image' in data ? {
    ...data,
    'image': data.image.files
  } : {
    ...data
  }

  return Api.post(`product-items`, form);
}

export const deleteProductItemByID = async(id) => {
  return Api.delete(`product-items/${id}`);
}