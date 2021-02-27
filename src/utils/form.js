import { FORM_SCHEMA, CATEGORY_ICONS } from '../../config';
import { ADMIN_SECTIONS } from '../constants/admin';
import Api from '../services/api';
import { getSections, getBasicAdmin, getBasicUser } from '../api';

export const getImageUrlByType = (type) => {
  if (!type) {
    return process.env.IMAGE_URL;
  }

  const testType = type.toLowerCase();

  switch(testType){
    case 'brand':
      return `${process.env.IMAGE_URL}/brands`;
      break;
    case 'vendor':
      return `${process.env.IMAGE_URL}/vendors`;
      break;
    case 'user':
      return `${process.env.IMAGE_URL}/users`;
      break;
    case 'image box':
        return `${process.env.IMAGE_URL}/slideImages`;
        break;
    default:
      return process.env.IMAGE_URL;
      break;
  }
}

export const handleFormResponse = (resp) => {
  const {status, message} = resp && resp.data ? resp.data : resp;
  if (status) {
    return {
      severity: 'success',
      open: true,
      text: message,
    }
  } else {    
    return {
      severity: 'error',
      open: true,
      text: `ERROR: ${message}`,
    }
  }
}
export const validateForm = async(name = null, value = null, ignore = []) => {
  ignore.push('saved');
  if (ignore.indexOf(name) !== -1) {
      return true
  }
  switch(FORM_SCHEMA[name].type){
    case "textfield":
    case "password":
    case "date":
    case "color":
    case "textarea": {
      if (value && value.length > 0) {
        return true
      } else{
        return false;
      }
      break;
    }
    case "imgurl": {
      let result = true;
      if(value && value.length > 0){
        value.forEach((item) => {
          if (result) {
            if (!Object.keys(item.values).length && !item.url) {
              result = false;
            } else if ((!Object.keys(item.values).length && item.url) || (Object.keys(item.values).length && !item.url)) {
              result = false;
            }
          }
        })
      }
      return result
      break;
    }
    case "email": {
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      
      if(value && expression.test(String(value).toLowerCase())){
        return true
      } else{
        return false;
      }
      break;
    }
    case "number":
    case "rate": {
      if (value) {
        return true
      } else {
        return false;
      }
      break;
    }
    case "dropdown": {
      if (value && (value.id || value.name)) {
        return true
      }
      return false;
      break;
    }
    case "file": {
      if (value.files && value.files.length) {
        return true
      }
      return false;
      break;
    }
    default: {
      return false;
    }
  }
}

export const loadMainOptions = async(isAdmin = false, params={}) => {
  let data = {}
  const icon = await CATEGORY_ICONS;
  if (isAdmin) {
    data = await getBasicAdmin(params);
  } else {
    data = await getBasicUser(params);
  }
  data['icon'] = icon;
  return data;
}