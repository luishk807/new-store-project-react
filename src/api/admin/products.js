import Api from '../../services/api';

export const getProducts = () => {
  return Api.get('/api/products');
}

export const getProductById = (id) => {
  if (!id) {
    return;
  }

  const data = {
    id: id
  }
  
  return Api.get('/products', data);
}

export const deleteProduct = (id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`/products/${id}`, {}, config);
}

export const saveProduct = (id, data) => {
  if (!Object.keys(data).length) {
    return;
  }
  const form = {
    ...data,
    'image': data.image.files
  }
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.save(`/products/${id}`, form, config);
}


export const addProduct = (data) => {
  if (!Object.keys(data).length) {
    return;
  }
  const form = {
    ...data,
    'image': data.image.files
  }
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.post('/products', form, config);
}