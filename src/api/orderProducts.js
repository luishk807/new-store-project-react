import Api from '../services/api';
import { verifyCookie } from '../utils/cookie';

export const getProductsByOrderId = async(id) => {
  if (!verifyCookie()) {
    return;
  }
  const data = {
    order: id
  }
  return Api.get(`order-products`, data);
}
