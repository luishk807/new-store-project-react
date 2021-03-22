import Api from '../services/api';

export const createColor = async(data) => {
  return Api.post(`product-colors`, data);
}

export const deleteColorById = async(id) => {
  return Api.delete(`product-colors/${id}`);
}

export const getColors = async(data) => {
  return Api.get(`product-colors`, data);
}

export const getColorsById = async(id) => {
  return Api.get(`product-colors/${id}`);
}

export const getColorsByProductId = async(id) => {
  return Api.get(`product-colors/product/${id}`);
}

export const getColorByIds = async(ids) => {
  if (!ids) {
    return;
  }
  const data = {
    ids: ids
  }
  
  return Api.get(`product-colors/filters/bulk`, data);
}
