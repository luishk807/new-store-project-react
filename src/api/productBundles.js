import Api from '../services/api';

export const createProductBundle = async(data) => {
  return Api.post(`product-bundles`, data);
}

export const deleteProductBundleById = async(id) => {
  return Api.delete(`product-bundles/${id}`);
}

export const getProductBundles = async(data) => {
  return Api.get(`product-bundles`, data);
}

export const getProductBundlesById = async(id) => {
  return Api.get(`product-bundles/${id}`);
}

export const getProductBundlesByIds = async(ids) => {
  if (!ids) {
    return;
  }
  
  const data = {
    ids: ids
  }
  
  return Api.get(`product-bundles/filters/bulk`, data);
}

export const getProductBundlesByProductItemId = async(id) => {
  return Api.get(`product-bundles/product-item/${id}`);
}

export const getActiveProductBundlesByProductItemId = async(id) => {
  return Api.get(`product-bundles/product-item/active/${id}`);
}