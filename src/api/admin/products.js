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


export const addProduct = (data) => {
  if (!Object.keys(data).length) {
    return;
  }
  const form = {
    ...data,
    'image': data.image.files
  }
  const config = {
    'Content-Type': 'application/json',
    // 'Content-Length': Object.keys(data).length
  }
  return Api.post('/products', form, config);
}