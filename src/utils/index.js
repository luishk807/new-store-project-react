import { getImageUrlByType } from './form';
import { noImageUrl } from '../../config';

export const removeCharacter = (str) => {
  return str.replace(/_/g, ' ')
}

export const formatNumber = (x) => x ? Number.parseFloat(x).toFixed(2) : 0.00;

export const getImage = (product) => {
  const imageUrl = getImageUrlByType('product');
  return product.productImages && product.productImages.length ? <img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} alt={`${product.name}`} /> : <img className={`img-fluid`} src={`${noImageUrl.img}`} alt={`${noImageUrl.alt}`} />;
}

export const getCartTotal = (obj) => {
  let subtotal = 0;
  let taxes = 0;
  let grandTotal = 0;
  let delivery = obj.delivery ? parseFloat(obj.delivery) : 0;
  let cart = obj.cart;
  if (cart) {
    Object.keys(cart).forEach((key, index) => {
      subtotal += cart[key].retailPrice * cart[key].quantity;
    })
  }

  taxes = subtotal * 0.08;

  grandTotal = taxes + subtotal + delivery;

  return {
    'subtotal': formatNumber(subtotal),
    'delivery': formatNumber(delivery),
    'taxes': formatNumber(taxes),
    'grandTotal': formatNumber(grandTotal)
  }
}

export const calculateRate = (data) => {
  let total = 0;
  data.rates.forEach((data) => {
    total += parseFloat(data.rate);
  })
  total = total / data.rates.length;
  
  return parseFloat(total);
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getRatingAvg = (data) => {
  if (!data || (typeof data === "object" && !Object.keys(data).length)) {
    return 0;
  }
  let totalAvg = 0;
  let length = 0;
  data.forEach((item) => {
    const rateFloat = parseFloat(item.rate);
    if (rateFloat) {
      length++;
    }
    totalAvg += rateFloat;
  })
  return parseFloat(totalAvg / length).toFixed(1);
}

export const getCatSearch = (data) => {
  return encodeURI(`/searchResult?cat=${data.id}&catn=${data.name}`);
}