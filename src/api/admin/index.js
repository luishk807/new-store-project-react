import Api from '../../services/api';

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
  const form = {
    ...data,
    'image': data.image.files
  }
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.save(`/${section}/${id}`, form, config);
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

  const config = {
    'Content-Type': 'application/json',
    'Content-Length': Object.keys(data).length
  }
  return Api.post(`/${section}`, form, config);
}