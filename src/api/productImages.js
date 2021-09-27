import Api from '@/services/api';

export const getImagesByProductId = async(id) => {
  const data = {
    id: id
  };

  return Api.get(`products`, data);
}