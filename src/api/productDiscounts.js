import Api from '../services/api';
import { verifyCookie } from '../utils/cookie';

export const getProductDiscountId = async(id) => {
  return Api.get(`product-discounts/${id}`);
}

export const getProductDiscountsByProductId = async(id) => {
  return Api.get(`product-discounts/product/${id}`);
}

export const getProductDiscountsByProductIds = async(ids) => {
  if (!ids) {
    return;
  }
  const data = {
    ids: ids
  }
  
  return Api.get(`product-discounts`, data);
}

export const createDiscount = async(data) => {
  return Api.post(`product-discounts`, data);
}

export const getProductDiscounts = async() => {
  return Api.get(`product-discounts`);
}

export const deleteProductDiscountsById = async(id) => {
  return Api.delete(`product-discounts/${id}`);
}