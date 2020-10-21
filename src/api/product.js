import Api from '../services/api';

export const sendQuestion = async(data) => {
  return Api.post(`/productquestions`, data);
}

export const getQuestions = async(data) => {
  return Api.get(`/productquestions`, data);
}

