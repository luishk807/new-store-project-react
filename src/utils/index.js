import { getImageUrlByType } from './form';
import { noImageUrl } from '../../config';
import { getProductItemByIds } from '../api/productItems';

export const removeCharacter = (str) => {
  return str.replace(/_/g, ' ')
}

export const formatNumber = (x) => x ? Number.parseFloat(x).toFixed(2) : 0.00;

export const getImage = (product) => {
  const imageUrl = getImageUrlByType('product');
  
  let image = <img className={`img-fluid`} src={`${noImageUrl.img}`} alt={`${noImageUrl.alt}`} />

  if (product.productImages && product.productImages.length) {
    image = <img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} alt={`${product.name}`} />;
  } else if (product.productProductItems && product.productProductItems.length) {
    const ids = product.productProductItems.map(item => {
      return Number(item.id);
    })

    if (ids && ids.length) {
      getProductItemByIds(ids).then((prod, index) => {
        image = prod.filter((item, index) => {
          if (item.productImages && item.productImages.length) {
            return item.item.productImages[0]
          }
        })
        if (image && image.length) {
          image = <img className={`img-fluid`} src={`${imageUrl}/${image[0].img_url}`} alt={`${product.name}`} />
        }
      });
    }
  }
  return image;
}

export const getImageBaseOnly = (product) => {
  const imageUrl = getImageUrlByType('product');
  
  let image = <img className={`img-fluid`} src={`${noImageUrl.img}`} alt={`${noImageUrl.alt}`} />

  if (product.productImages && product.productImages.length) {
    image = <img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} alt={`${product.name}`} />;
  }
  return image;
}

export const isImageAval = (product) => {
  const imageUrl = getImageUrlByType('product');
  
  let image = false;

  if (product.productImages && product.productImages.length) {
    image = true;
  } else if (product.productProductItems && product.productProductItems.length) {
    const ids = product.productProductItems.map(item => {
      return Number(item.id);
    })

    if (ids && ids.length) {
      getProductItemByIds(ids).then((prod, index) => {
        image = prod.filter((item, index) => {
          if (item.productImages && item.productImages.length) {
            return item.item.productImages[0]
          }
        })
        if (image && image.length) {
          image = true;
        }
      });
    }
  }
  return image;
}

export const getCartTotal = (obj) => {
  let subtotal = 0;
  let taxes = 0;
  let grandTotal = 0;
  let savedGrandTotal = 0;
  let delivery = obj.delivery ? parseFloat(obj.delivery) : 0;
  let originalTotal = 0;
  let cart = obj.cart;
  if (cart) {
    Object.keys(cart).forEach((key, index) => {
      subtotal += cart[key].retailPrice * cart[key].quantity;
      originalTotal += cart[key].originalPrice * cart[key].quantity;
    })
  }

  taxes = subtotal * 0.07;

  grandTotal = taxes + subtotal + delivery;

  savedGrandTotal = originalTotal - subtotal;

  return {
    'subtotal': formatNumber(subtotal),
    'delivery': formatNumber(delivery),
    'taxes': formatNumber(taxes),
    'saved': formatNumber(savedGrandTotal),
    'grandTotal': formatNumber(grandTotal)
  }
}

export const isAroundTime = (date1, date2) => {
  const today = new Date();
  const dStartDate = new Date(date1);
  const dEndDate = new Date(date2);

  return today.getTime() > dStartDate.getTime() && today.getTime() < dEndDate.getTime();
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