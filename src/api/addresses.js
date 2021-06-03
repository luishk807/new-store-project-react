import Api from '../services/api';

export const saveAddress = async(data, id) => {
  return Api.post(`useraddresses/${id}`, data);
}

export const updateAddress = async(data, id) => {
  return Api.save(`useraddresses/${id}`, data);
}

export const createAddress = async(data) => {
  return Api.post(`useraddresses`, data);
}

export const deleteAddress = async(id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`useraddresses/${id}`, {}, config);
}

export const getAddresses = async(data) => {
  return Api.get(`useraddresses`, data);
}

export const getAddressesByUser = async(data) => {
  return Api.get(`useraddresses/addresses/user`, data);
}

export const getAddressById = async(id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  return Api.get(`useraddresses`, data);
}