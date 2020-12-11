import Api from '../services/api';

export const getMainSliders = async(data) => {
  return Api.get(`banners`, data);
}

export const getBannnerById = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }

  return Api.get(`banners`, data);
}