// import Api from '../services/api';
import axios, { post, put} from 'axios';

export const processPaymentCard = async(data) => {
  const apiUrl = process.env.STGEORGE_URL;
  const request = post(apiUrl, data)
  return request;
}