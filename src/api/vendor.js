import Api from '../services/api';

export const getVendorByUserId = async(data) => {
  return Api.get(`vendoruser`, data);
}