import Api from '../services/api';

export const getMainSliders = async(data) => {
  return Api.get(`banners`, data);
}

export const getBanners = async() => {
  return Api.get(`banners`);
}

export const deleteBanner = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`banners/${id}`, {}, config);
}

export const getBannnerByName = async(name) => {
  if (!name) {
    return;
  }
  const data = {
    name: name
  }
  return Api.get(`banners`, data);
}

export const getBannnerByType = async(type) => {
  if (!type) {
    return;
  }
  const data = {
    type: type
  }
  return Api.get(`banners`, data);
}