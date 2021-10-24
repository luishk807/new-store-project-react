import Api from '@/services/api';

export const saveCategories = async(data) => {
  return Api.post(`categories`, data);
}

export const updateCategory = async(data) => {
  return Api.save(`categories`, data);
}

export const setPriority = async(id) => {
  return Api.save(`categories/${id}/priority`);
}

export const deleteCategeoryByUserId = async(data) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`categories/${data.product}`, {}, config);
}

export const deleteCategoryById = async(id) => {
  return Api.delete(`categories/${id}`);
}

export const getCategories = async(data) => {
  return Api.get(`categories`, data);
}


export const getAllCategories = async(data) => {
  return Api.get(`categories`, data);
}
