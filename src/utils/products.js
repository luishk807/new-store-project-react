import { FORM_SCHEMA, ALLOW_FIELDS } from '../../config';
import { isAroundTime } from '../utils';

export const formatForm = (form) => {
  const currentForm = form;
  for (var i in form){
    if (FORM_SCHEMA[i]) {
      if (FORM_SCHEMA[i].type == "file") {
        currentForm[i] = form[i].map((data) => data.name)
      } else if (FORM_SCHEMA[i].type == "imgurl") {
        currentForm[i] = form[i].map((data) => data.name)
      } else if (FORM_SCHEMA[i].type == "dropdown") {
        const dropValue = form[i] && form[i].id ? form[i].id : form[i];
        currentForm[i] = dropValue;
      } else {
        currentForm[i] = form[i]
      }
    }
  }

  return currentForm;
}

export const checkDiscountPrice = async(product, selectedItem, quantity) => {
  const currProduct = Object.assign({}, selectedItem);

  if (!product || !selectedItem || !quantity) {
    return;
  }
  const originalItem = product.productProductItems.filter(item => item.id === selectedItem.id)[0];

  currProduct['quantity'] = quantity;
  currProduct['retailPrice'] = originalItem.retailPrice;
  currProduct['discount'] = null;
  
  if (product.productProductDiscount && product.productProductDiscount.length) {
    let found = null;
    product.productProductDiscount.forEach((deal) => {
      if (parseInt(quantity) >= parseInt(deal.minQuantity)) {
        if (deal.useDate && deal.startDate && deal.endDate) {
          if (isAroundTime(deal.startDate, deal.endDate)) {
            found = deal;
          }
        } else {
          found = deal;
        }
      }
      if (found) {
          const newTotal = originalItem.retailPrice - (originalItem.retailPrice * found.percentage);
          currProduct['retailPrice'] = newTotal.toFixed(2);
          currProduct['originalPrice'] = originalItem.retailPrice;
          currProduct['discount'] = found;
          currProduct['save_percentage'] =  found.percentage;
          currProduct['save_percentag_show'] =  `${found.percentage * 100}%`
          currProduct['save_price'] =  (originalItem.retailPrice - newTotal).toFixed(2)
      } else {
          currProduct['discount'] = null;
          currProduct['save_percentage'] =  0;
          currProduct['save_percentag_show'] =  '';
          currProduct['save_price'] =  0
      }
    })
  }
  return currProduct;
}

export const checkBundlePrice = async(product, selectedItem, quantity) => {
  const currProduct = Object.assign({}, selectedItem);

  if (!product || !selectedItem || !quantity) {
    return;
  }
  
  currProduct['quantity'] = quantity;
  
  return currProduct;
}

export const setBundleDiscount = async(product, selectedItem, bundle) => {
  const currProduct = Object.assign({}, selectedItem);

  const originalItem = product.productProductItems.filter(item => item.id === selectedItem.id)[0];

  currProduct['retailPrice'] = originalItem.retailPrice;
  currProduct['discount'] = null;

  if (bundle) {
      const newTotal = Number(bundle.retailPrice);
      const originPrice = originalItem.retailPrice * Number(bundle.quantity);
      currProduct['retailPrice'] = newTotal.toFixed(2);
      currProduct['originalPrice'] = originPrice.toFixed(2);
      currProduct['bundle'] = bundle;
      currProduct['save_price'] =  (originPrice - newTotal).toFixed(2)

  } else {
    currProduct['bundle'] = null;
    currProduct['save_price'] = 0;
    currProduct['originalPrice'] = null;
  }
  return currProduct;
}

export const formatFormData = (form) => {
  const currentForm = form;
  const formData = new FormData();
  for (var i in form){
    if (FORM_SCHEMA[i]) {
      if (FORM_SCHEMA[i].type === "file") {
        if (form[i] && form[i].length) {
          form[i].forEach((data) => {
            formData.append('image', data)
          })
        }
      } else if (FORM_SCHEMA[i].type === "imgurl") {
        if (form[i] && form[i].length) {
          form[i].forEach((data) => {
            let item = data.values;
            item['url'] = data.url
            formData.append('imageData', JSON.stringify(item))
            formData.append('image', item)
          })
        }
      } else if (FORM_SCHEMA[i].type === "dropdown") {
        let dropValue = null;
        if (form[i] && Object.keys(form[i]).length && form[i].id) {
          dropValue = form[i].id;
        } else if (form[i] && form[i].value) {
          dropValue = form[i].value;
        } else if (form[i]) {
          dropValue = form[i];
        }
        formData.append(i,dropValue)
      } else {
        formData.append(i,form[i])
      }
    } else if (ALLOW_FIELDS.includes(i)) {
      if (typeof form[i] === "object") {
        formData.append(i, JSON.stringify(form[i]))
      } else {
        formData.append(i, form[i])
      }
    }
  }
  return formData;
}