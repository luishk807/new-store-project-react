import Api from '../services/api';

export const sendAnswer = async(data) => {
  return Api.post(`productanswers`, data);
}

export const getAnswers = async(data) => {
  return Api.get(`productanswers`, data);
}

export const getAnswerById = async(data) => {
  return Api.get(`productanswers`, data);
}