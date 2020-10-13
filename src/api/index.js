import Api from '../services/api';

export const getItems = (section) => {
  return Api.get(`/${section}`);
}

export const getItemById = (section, id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  return Api.get(`/${section}`, data);
}

export const deleteItem = (section, id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`/${section}/${id}`, {}, config);
}

export const saveItem = (section, id, data) => {
  if (!Object.keys(data).length) {
    return;
  }
  const form = 'image' in data ? {
    ...data,
    'image': data.image.files
  } : {
    ...data
  }

  return Api.save(`/${section}/${id}`, form);
}

export const addItem = (section, data) => {
  if (!Object.keys(data).length) {
    return;
  }

  const form = 'image' in data ? {
    ...data,
    'image': data.image.files
  } : {
    ...data
  }

  return Api.post(`/${section}`, form);
}