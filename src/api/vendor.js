import Api from '@/services/api';
import { verifyCookie } from '@/utils/cookie';

export const getVendorByUserId = async(data) => {
  if (!verifyCookie()) {
    return;
  }
  return Api.get(`vendors/user`, data);
}