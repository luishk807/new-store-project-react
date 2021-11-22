import Api from '@/services/api';
import { verifyCookie } from '@/utils/cookie';

export const getOrderProductsById = async(id) => {
  if (!verifyCookie()) {
    return;
  }
  const data = {
    order: id
  }
  return Api.get(`order-products/${id}`);
}

export const getOrderProductsByIds = async(ids) => {
  if (!ids) {
    return;
  }
  const data = {
    ids: ids
  }
  
  return Api.get(`order-products`, data);
}
