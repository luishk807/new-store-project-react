import Api from '../services/api';
import { verifyCookie } from '../utils/cookie';

export const getOrderByUser = async(data) => {
  if (!verifyCookie()) {
    return;
  }
  return Api.get(`orders`, data);
}