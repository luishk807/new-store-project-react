import Api from '@/services/api';
import { verifyCookie } from '@/utils/cookie';

export const getVendorByUserId = async(data) => {
  if (!verifyCookie()) {
    return;
  }
  return Api.get(`vendors/user`, data);
}

export const createVendor = async(data) => {
  return Api.post(`vendors`, data);
}

export const deleteVendorById = async(id) => {
  return Api.delete(`vendors/${id}`);
}

export const getVendors = async(data) => {
  return Api.get(`vendors`, data);
}

export const getVendorById = async(id) => {
  return Api.get(`vendors/${id}`);
}

export const getVendorByIds = async(ids) => {
  if (!ids) {
    return;
  }
  const data = {
    ids: ids
  }
  
  return Api.get(`vendors/filter/bulk`, data);
}