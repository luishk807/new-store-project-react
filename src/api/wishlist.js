import Api from '../services/api';

export const saveWishlist = async(data) => {
  return Api.post(`/wishlists`, data);
}

export const deleteWishlistByUserId = async(data) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`/userwishlists/${data.product}`, {}, config);
}

export const getWishlistsByProductId = async(data) => {
  return Api.get(`/wishlists`, data);
}

export const getWishlistByUserId = async(data) => {
  return Api.get(`/userwishlists`, data);
}