import Api from '@/services/api';

export const createUser = async(data) => {
  return Api.post(`users`, data);
}

export const deleteUserById = async(id) => {
  return Api.delete(`users/${id}`);
}

export const getUsers = async(data) => {
  return Api.get(`users/all/users`, data);
}

export const getUsersById = async(id) => {
  return Api.get(`users/${id}`);
}

export const getUserByIds = async(ids) => {
  if (!ids) {
    return;
  }
  const data = {
    ids: ids
  }
  
  return Api.get(`users/filter/bulk`, data);
}