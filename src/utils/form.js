import { FORM_SCHEMA, CATEGORY_ICONS } from '../../config';
import { ADMIN_SECTIONS } from '../constants/admin';
import Api from '../services/api';

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
    default:
      return process.env.IMAGE_URL;
      break;
  }
}

export const handleFormResponse = (resp) => {
  console.log('res', resp)
  if (!resp) {
    return {
      severity: 'success',
      open: false,
      text: '',
    }
  }
  if (resp) {
    return {
      severity: 'success',
      open: true,
      text: 'Answer submitted',
    }
  } else {    
    return {
      severity: 'error',
      open: true,
      text: `ERROR: ${resp.message}`,
    }
  }
}
export const validateForm = async(name = null, value = null, ignore = []) => {
  ignore.push('saved');
  if (ignore.indexOf(name) !== -1) {
      return true
  }
  console.log('validate', FORM_SCHEMA[name], value)
  switch(FORM_SCHEMA[name]){
    case "textfield":
    case "password":
    case "date":
    case "textarea": {
      if(value && value.length > 0){
        console.log("it's good")
        return true
      }else{
        return false;
      }
      break;
    }
    case "email": {
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      
      if(value && expression.test(String(value).toLowerCase())){
        return true
      }else{
        return false;
      }
      break;
    }
    case "number":
    case "rate": {
      if(value){
        return true
      }else{
        return false;
      }
      break;
    }
    case "dropdown": {
      if(value && (value.id || value.name)){
        return true
      }
      return false;
      break;
    }
    case "file": {
      if(value.files && value.files.length){
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

export const loadMainOptions = async(option = null) => {
  if (option) {
      return await Api.get(option.option);
  } else {
    const category = await Api.get(`${ADMIN_SECTIONS.category.url}`);
    const position = await Api.get(`${ADMIN_SECTIONS.workRole.url}`);
    const vendor = await Api.get(`${ADMIN_SECTIONS.vendor.url}`);
    const brand = await Api.get(`${ADMIN_SECTIONS.brand.url}`);
    const status = await Api.get(`${ADMIN_SECTIONS.status.url}`);
    
    const gender = await Api.get(`genders`);
    const country = await Api.get(`countries`);
    const userRole = await Api.get(`userroles`);
    const icon = await CATEGORY_ICONS;
    return {
      category,
      brand,
      vendor,
      status,
      country,
      position,
      userRole,
      icon,
      gender,
    }
  }
}