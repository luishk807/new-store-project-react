import { FORM_SCHEMA } from '../config';
import { CategorySample } from '../constants/samples/admin/categories/CategorySample';
import { BrandsSample } from '../constants/samples/admin/brands/BrandsSample';
import { VendorSample } from '../constants/samples/admin/vendors/VendorSample';
import Api from '../services/api';

export const validateForm = async(name = null, value = null, ignore = []) => {
  ignore.push('saved');
  if (ignore.indexOf(name) !== -1) {
      console.log(ignore, name)
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

export const loadMainOptions = async() => {
  const categories = await Api.get('/categories');
  const vendors = await Api.get('/vendors');
  const brands = await Api.get('/brands');

  return {
    'category': categories,
    'brand': brands,
    'vendor': vendors,
  }
}