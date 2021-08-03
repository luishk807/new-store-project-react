import Api from '@/services/api';

export const getSweetBoxProducts = async(data) => {
  return Api.get(`sweet-box-products`, data);
}

export const deleteSweetBoxProductById = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`sweet-box-products/${id}`, {}, config);
}

export const getSweetBoxProductById = async(id) => {
  return Api.get(`sweet-box-products/${id}`);
}

export const saveSweetBoxProductByProductIds = async(id, ids) => {
  if (!ids) {
    return;
  }
  const data = {
    items: ids
  }
  return Api.post(`sweet-box-products/${id}`, data);
}