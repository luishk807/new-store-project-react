import Api from '../services/api';

export const saveWishlist = async(data) => {
  return Api.post(`/wishlists`, data);
}

export const getWishlistsByProductId = async(data) => {
  return Api.get(`/wishlists`, data);
}

export const getWishlistByUserId = async(data) => {
  return Api.get(`/userwishlists`, data);
}