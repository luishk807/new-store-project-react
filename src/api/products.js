import Api from '../services/api';

export const getProducts = async() => {
  return Api.get(`products`, data);
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