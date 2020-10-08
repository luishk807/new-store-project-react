import { FORM_SCHEMA, OPTIONS_DROP } from '../config';
import Api from '../services/api';

export const getImageUrlByType = (type) => {
  const testType = type.toLowerCase();
  console.log(testType)
  switch(testType){
    case 'brand':
      return `${process.env.IMAGE_URL}/brands`;
      break;
    default:
      return process.env.IMAGE_URL;
      break;
  }
}
export const validateForm = async(name = null, value = null, ignore = []) => {
  ignore.push('saved');
  if (ignore.indexOf(name) !== -1) {
      console.log(ignore, name)
      return true
  }
console.log("name", name)
  switch(FORM_SCHEMA[name]){
    case "textfield":
    case "textarea": {
      if(value && value.length > 0){
        return true
      }else{
        return false;
      }
      break;
    }
    case "number": {
      if(value){
        return true
      }else{
        return false;
      }
      break;
    }
    case "dropdown": {
      if(value && value.id){
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
      return await Api.get('/'+option.option);
  } else {
    const category = await Api.get('/categories');
    const vendor = await Api.get('/vendors');
    const brand = await Api.get('/brands');
    const status = await Api.get('/statuses');
    
    return {
      category,
      brand,
      vendor,
      status,
    }
  }
}