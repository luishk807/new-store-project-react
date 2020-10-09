import Api from '../../services/api';

export const getCategories = () => {
  return Api.get('/categories');
}

export const getCategoryById = (id) => {
  if (!id) {
    return;
  }

  const data = {
    id: id
  }
  return Api.get('/categories', data);
}

export const deleteCategory = (id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`/categories/${id}`, {}, config);
}

export const saveCategory = (id, data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.save(`/categories/${id}`, data, config);
}

export const addCategory = (data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const config = {
    'Content-Type': 'application/json',
    'Content-Length': Object.keys(data).length
  }
  return Api.post('/categories', data, config);
}