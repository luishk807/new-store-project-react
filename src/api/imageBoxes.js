import Api from '../services/api';

export const getMainSliders = async(data) => {
  return Api.get(`image-boxes`, data);
}

export const getImageBoxes = async() => {
  return Api.get(`image-boxes`);
}

export const deleteImageBox = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`image-boxes/${id}`, {}, config);
}

export const getImageBoxesByName = async(name) => {
  if (!name) {
    return;
  }
  const data = {
    name: name
  }
  return Api.get(`image-boxes`, data);
}

export const getImageBoxesByKey = async(key) => {
  return Api.get(`image-boxes/${key}/key`);
}

export const getActiveImageBoxesByKey = async(key) => {
  return Api.get(`image-boxes/${key}/active/key`);
}

export const getImageBoxesByType = async(type) => {
  if (!type) {
    return;
  }
  const data = {
    type: type
  }
  return Api.get(`image-boxes`, data);
}