import Api from '../services/api';

export const getSections = async (section) => {
  const response = await Api.get(section);
  return response;
};

export const getItems = (section) => {
  return Api.get(`${section}`);
}

export const getBasicUser = (data) => {
  return Api.get(`basic/user`, data);
}

export const getBasicAdmin = (data) => {
  return Api.get(`basic/admin`, data);
}

export const getItemById = (section, id) => {
  if (!id) {
    return;
  }
  const data = {
    id: id
  }
  
  return Api.get(`${section}`, data);
}

export const getItemByFkId = (section, fk, id) => {
  if (!id) {
    return;
  }
  let data = {}
  
  switch(fk){
    case 'address':
      data = {
        'user': id
      }
      break;
    case 'productsvendor':
      data = {
        'vendor': id
      }
      break;
    case 'sweetbox':
      data = {
        'sweetbox': id
      }
      break;
    case 'imageBox':
      data = {
        'imageBox': id
      }
      break;
    default:
    
  }
  return Api.get(`${section}`, data);
}

export const deleteItem = (section, id) => {
  const config = {
    'cotent-Type': 'application/x-www-form-urlencoded'
  }
  return Api.delete(`${section}/${id}`, {}, config);
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

  return Api.save(`${section}/${id}`, form);
}

export const addItem = (section, data) => {
  if (!Object.keys(data).length) {
    return;
  }

  let form = null;
  
  if ('image' in data) {
    form = {
      ...data,
      'image': data.image.files
    }
  } else if ('imageBox' in data) {
    form = {
      ...data,
      'image': data.imageBox
    }
  } else {
    form = {
      ...data
    }
  }
  
  return Api.post(`${section}`, form);
}

export const postItem = (section, data) => {
  if (!Object.keys(data).length) {
    return;
  }

  let form = null;
  
  if ('image' in data) {
    form = {
      ...data,
      'image': data.image.files
    }
  } else if ('imageBox' in data) {
    form = {
      ...data,
      'image': data.imageBox
    }
  } else {
    form = {
      ...data
    }
  }
  
  return Api.post(`${section}`, form);
}
