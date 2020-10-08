import Api from '../../services/api';

export const getBrands = () => {
  return Api.get('/brands');
}

export const getBrandById = (id) => {
  if (!id) {
    return;
  }

  const data = {
    id: id
  }
  return Api.get('/brands', data);
}

export const deleteBrand = (id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`/brands/${id}`, {}, config);
}

export const saveBrand = (id, data) => {
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
  return Api.save(`/brands/${id}`, form, config);
}

export const addBrand = (data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const form = {
    ...data,
    'image': data.image.files
  }

  const config = {
    'Content-Type': 'application/json',
    'Content-Length': Object.keys(data).length
  }
  return Api.post('/brands', form, config);
}