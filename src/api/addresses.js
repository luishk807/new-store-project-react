import Api from '@/services/api';

export const saveAddress = async(data, id) => {
  return Api.post(`user-addresses/${id}`, data);
}

export const updateAddress = async(data, id) => {
  return Api.save(`user-addresses/${id}`, data);
}

export const setUserFavAddress = async(id) => {
  return Api.save(`user-addresses/favorite/${id}/address`);
}

export const createAddress = async(data) => {
  return Api.post(`user-addresses`, data);
}

export const deleteAddress = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`user-addresses/${id}`, {}, config);
}

export const getAddresses = async(data) => {
  return Api.get(`user-addresses`, data);
}

export const getAddressByUserId = async(id) => {
  return Api.get(`user-addresses/addresses/user/${id}`);
}

export const getAddressesByUser = async(data) => {
  return Api.get(`user-addresses/addresses/user`, data);
}

export const getAddressById = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  return Api.get(`user-addresses`, data);
}