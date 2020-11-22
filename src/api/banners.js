import Api from '../services/api';

export const getMainSliders = async(data) => {
  return Api.get(`banners`, data);
}

export const getAnswers = async(data) => {
  return Api.get(`productanswers`, data);
}

export const getAnswerById = async(data) => {
  return Api.get(`productanswers`, data);
}