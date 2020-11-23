import Api from '../services/api';

export const getSweetBoxesByType = async(type) => {
  if (!type) {
    return;
  }
  const data = {
    type: type
  }
  return Api.get(`sweetboxes`, data);
}

export const getAllSweetBoxes = async(data) => {
  return Api.get(`sweetboxes`, data);
}

export const getSweetBoxById = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  return Api.get(`sweetboxes`, data);
}