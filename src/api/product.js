import Api from '../services/api';

export const sendQuestion = async(data) => {
  return Api.post(`productquestions`, data);
}

export const sendAnswer = async(data) => {
  return Api.post(`productanswers`, data);
}

export const getAnswers = async(data) => {
  return Api.get(`productanswers`, data);
}

export const getAnswerById = async(data) => {
  return Api.get(`productanswers`, data);
}

export const getQuestions = async(data) => {
  return Api.get(`productquestions`, data);
}

export const getQuestionById = async(data) => {
  return Api.get(`productquestions`, data);
}

