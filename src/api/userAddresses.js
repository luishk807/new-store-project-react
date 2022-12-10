import Api from '@/services/api';

export const createUserAddressByUserId = async(id) => {
  return Api.post(`user-addresses/user/${id}`);
}

export const getAllUserAddressesByUser = async(id) => {
  return Api.get(`user-addresses/user/${id}`);
}

export const deleteUserAddressById = async(id) => {
  if (!id) {
    return;
  }

  return Api.delete(`user-addresses/${id}`);
}

export const getActiveUserAddressById = async(id) => {
  if (!id) {
    return;
  }

  return Api.get(`user-addresses/${id}`);
}

export const getUserAddressById = async(id) => {
  if (!id) {
    return;
  }

  return Api.get(`user-addresses/admin/${id}`);
}