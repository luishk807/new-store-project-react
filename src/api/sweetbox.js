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

export const getSweetBoxById = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  return Api.get(`sweet-boxes`, data);
}