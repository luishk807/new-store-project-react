import Api from '../services/api';

export const getMainSliders = async(data) => {
  return Api.get(`banners`, data);
}