import Api from '../services/api';

export const getSweetBoxesByType = async(type) => {
  if (!type) {
    return;
  }
  const data = {
    type: type
  }
  return Api.get(`sweet-boxes`, data);
}

export const getAllSweetBoxes = async(data) => {
  return Api.get(`sweet-boxes`, data);
}

export const deleteSweetBox = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`sweet-boxes/${id}`, {}, config);
}

export const getActiveSweetBoxById = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  return Api.get(`sweet-boxes/status/${id}`);
}

export const getSweetBoxById = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  return Api.get(`sweet-boxes/${id}`);
}