import Api from '@/services/api';
import { verifyCookie } from '@/utils/cookie';

export const getOrderActivitiesByOrderid = async(id) => {
  return Api.get(`order-activities/${id}`);
}
