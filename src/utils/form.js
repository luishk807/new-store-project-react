import { FORM_SCHEMA, CATEGORY_ICONS } from '../config';
import { ADMIN_SECTIONS } from '../constants/admin';
import Api from '../services/api';

export const getImageUrlByType = (type) => {
  const testType = type.toLowerCase();

  switch(testType){
    case 'brand':
      return `${process.env.IMAGE_URL}/brands`;
      break;
    case 'vendor':
      return `${process.env.IMAGE_URL}/vendors`;
      break;
    default:
      return process.env.IMAGE_URL;
      break;
  }
}

export const validateForm = async(name = null, value = null, ignore = []) => {
  ignore.push('saved');
  if (ignore.indexOf(name) !== -1) {
      return true
  }

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
      return await Api.get('/'+option.option);
  } else {
    const category = await Api.get(`/${ADMIN_SECTIONS.category.url}`);
    const position = await Api.get(`/${ADMIN_SECTIONS.workRole.url}`);
    const vendor = await Api.get(`/${ADMIN_SECTIONS.vendor.url}`);
    const brand = await Api.get(`/${ADMIN_SECTIONS.brand.url}`);
    const status = await Api.get(`/${ADMIN_SECTIONS.status.url}`);

    const icon = await CATEGORY_ICONS;
    console.log(position)
    return {
      category,
      brand,
      vendor,
      status,
      position,
      icon,
    }
  }
}