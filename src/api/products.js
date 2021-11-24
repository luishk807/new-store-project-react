import Api from '@/services/api';
import { verifyCookie } from '@/utils/cookie';

export const getProducts = async(data) => {
  return Api.get(`products`, data);
}

export const getAdminProducts = async(data) => {
  return Api.get(`products`, data);
}

export const getAllProducts = async() => {
  return Api.get(`products`);
}

export const searchProducts = async(str) => {
  const data = {
    search: str,
  }

  return Api.get(`products/search`, data);
}

export const getProductByCategory = async(cat) => {
  return Api.get(`products/cat/${cat}`);
}

export const searchProductsByFilter = async(filter) => {
  return Api.get(`products/search`, filter);
}

export const getProductById = async(id, filter = null) => {  
  return Api.get(`products/${id}`, filter);
}

export const getAdminProductById = async(id) => {  
  return Api.get(`products/full-detail/${id}`);
}

export const getAdminProductByIds = async(ids, page = null) => {  
  if (!ids) {
    return;
  }
  const data = {
    ids: ids,
    page: page
  }
  
  return Api.get(`products/bulk/full-detail`,data);
}

export const getProductBySlug = async(id, filter = null) => {
  return Api.get(`products/k/${id}`, filter);
}

export const getProductByIds = async(ids, page = null) => {
  if (!ids) {
    return;
  }
  const data = {
    ids: ids,
    page: page
  }
  
  return Api.get(`products/bulk`, data);
}

export const createProduct = async(data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const form = 'image' in data ? {
    ...data,
    'image': data.image.files
  } : {
    ...data
  }

  return Api.post(`products`, form);
}

export const saveProduct = async(data, id) => {
  if (!Object.keys(data).length) {
    return;
  }
  const form = 'image' in data ? {
    ...data,
    'image': data.image.files
  } : {
    ...data
  }

  return Api.save(`products/${id}`, form);
}

export const deleteProduct = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`products/${id}`, {}, config);
}


export const getProductsByVendor = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  
  return Api.get(`productsvendor`, data);
}

export const importProducts = async (data) => {
  if (!verifyCookie()) {
    return;
  }
  if (!Object.keys(data).length) {
    return;
  }
  return Api.rawPost('products/import', data, {});
}
