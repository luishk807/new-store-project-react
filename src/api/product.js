import Api from '../services/api';

export const sendQuestion = async(data) => {
  return Api.post(`/productquestions`, data);
}