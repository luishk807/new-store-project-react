import Api from '@/services/api';

export const getQuestions = async(data) => {
  return Api.get(`productquestions`, data);
}

export const getQuestionById = async(data) => {
  return Api.get(`productquestions`, data);
}

export const sendQuestion = async(data) => {
  return Api.post(`productquestions`, data);
}