import Api from '@/services/api';

export const createBrand = async(data) => {
  return Api.post(`brands`, data);
}

export const deleteBrandById = async(id) => {
  return Api.delete(`brands/${id}`);
}

export const getBrands = async(data) => {
  return Api.get(`brands`, data);
}

export const getBrandsById = async(id) => {
  return Api.get(`brands/${id}`);
}

export const getBrandByIds = async(ids) => {
  if (!ids) {
    return;
  }
  const data = {
    ids: ids
  }
  
  return Api.get(`brands/filter/bulk`, data);
}