import Api from '../../services/api';

export const getBrands = () => {
  return Api.get('/api/brands');
}

export const getBrandById = (id) => {
  if (!id) {
    return;
  }

  const data = {
    id: id
  }
  return Api.get('/api/brands', data);
}


export const addBrand = (data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const config = {
    'Content-Type': 'application/json',
    'Content-Length': Object.keys(data).length
  }
  return Api.post('/api/brands', data, config);
}