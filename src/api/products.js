import Api from '../services/api';
import { verifyCookie } from '../utils/cookie';

export const getProducts = async(data) => {
  return Api.get(`products`, data);
}

export const searchProducts = async(str) => {
  const data = {
    search: str,
  }

  return Api.get(`products`, data);
}

export const getProductByCategory = async(cat) => {
  const filter = {
    'category': cat
  }

  return Api.get(`products`, filter);
}

export const searchProductsByFilter = async(filter) => {
  return Api.get(`products`, filter);
}

export const getProductById = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  
  return Api.get(`products`, data);
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
  return Api.delete(`${section}/${id}`, {}, config);
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
  console.log('importProducts');
  console.log(data);

  return Api.rawPost('products/import', data, {});
}
