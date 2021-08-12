import axios from 'axios';
import { getImageUrlByType } from './form';
import { noImageUrl } from '../../config';
import { getProductItemByIds } from '../api/productItems';
import { getProductById } from '../api/products';
import { getThumbnail } from '../utils/helpers/image'

export const removeCharacter = (str) => {
  return str ? str.replace(/_/g, ' ') : str
}

export const formatNumber = (x) => x ? Number.parseFloat(x).toFixed(2) : 0.00;

export const getIP = async () => {
  const res = await axios.get('https://geolocation-db.com/json/');
  return res.data.IPv4
}

export const getCartTotalItems = (cart, item = null) => {
  if (cart && cart.length) {
    if (item) {
      let getItems = null;
      if (item.bundle) {
        getItems = cart.filter(cartItem => cartItem.id == item.id && cartItem.productColor == item.productColor && cartItem.productSize == item.productSize && (cartItem.bundle && cartItem.bundle.id == item.bundle.id));
      } else {
        getItems = cart.filter(cartItem => cartItem.id == item.id && cartItem.productColor == item.productColor && cartItem.productSize == item.productSize);
      }
      if (getItems && getItems.length) {
        return getItems.map(item => item.quantity).reduce((prev, curr) => prev + curr)
      }
    } else {
      return cart.map(item => item.quantity).reduce((prev, curr) => prev + curr)
    }
  } else {
    return cart
  }
}
export const getDeliveryInfo = (order) => {
  let delivery = null;
  if (order.deliveryOptionId && order.deliveryOptionId === '1') {
    const info = [];
    if (isNull(order.shipping_name)) {
      info.push(order.shipping_name);
    }
    if (isNull(order.shipping_email)) {
      info.push(`Email: ${order.shipping_email}`);
    }
    if (isNull(order.shipping_phone)) {
      info.push(`Phone: ${order.shipping_phone}`);
    }
    delivery = {
      'title': 'Pick Up Info',
      'translate_key': 'pick_up',
      'info': info
    }
  } else {
    const info = [];
    if (isNull(order.shipping_name)) {
      info.push(order.shipping_name);
    }
    if (isNull(order.shipping_address)) {
      info.push(order.shipping_address);
    }
    let provDistrict = '';
    if (isNull(order.shipping_province)) {
      provDistrict += order.shipping_province;
    }
    if (isNull(order.shipping_corregimiento)) {
      provDistrict += order.shipping_corregimiento;
    }
    if (isNull(order.shipping_district)) {
      provDistrict += order.shipping_district;
    }
    if (provDistrict) {
      info.push(provDistrict);
    }
    if (isNull(order.shipping_zone)) {
      info.push(order.shipping_zone);
    }
    if (isNull(order.shipping_country)) {
      info.push(order.shipping_country);
    }
    if (isNull(order.shipping_email)) {
      info.push(`Email: ${order.shipping_email}`);
    }
    if (isNull(order.shipping_phone)) {
      info.push(`Phone: ${order.shipping_phone}`);
    }
    if (isNull(order.shipping_note)) {
      info.push(`Note: ${order.shipping_note}`);
    }
    delivery = {
      'title': 'Shipping Address',
      'translate_key': 'shipping_address',
      'info': info
    }
  }
  return delivery
}
export const isNull = (str) => {
  return !str || typeof str === 'undefined' || typeof str === 'null' || str == 'undefined' || str == 'null' ? null : str;
}
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


export const getImageAsync = async(product) => {
  const imageUrl = getImageUrlByType('product');
  if (product.productImages && product.productImages.length) {
    return product.productImages[0];
  } else if (product.productProductItems && product.productProductItems.length) {
    const ids = product.productProductItems.map(item => {
      return Number(item.id);
    })

    if (ids && ids.length) {
      const itemFetch = await getProductItemByIds(ids)
      if (itemFetch) {
        const imageSort = itemFetch.filter((item, index) => {
          if (item.productImages && item.productImages.length) {
            return item.item.productImages[0]
          }
        })
        if (imageSort && imageSort.length) {
          return imageSort[0];
        }
      }
    }
  } else if (product.product) {
    const itemFetch = await getProductById(product.product)
    if (itemFetch && itemFetch.productImages && itemFetch.productImages.length) {
      return itemFetch.productImages[0]
    }
  }
}

export const getImageBaseOnly = (product) => {
  const imageUrl = getImageUrlByType('product');
  
  let image = <img className={`img-fluid`} src={`${noImageUrl.img}`} alt={`${noImageUrl.alt}`} />

  if (product.productImages && product.productImages.length) {
    image = <img className={`img-fluid`} src={`${imageUrl}/${product.productImages[0].img_url}`} alt={`${product.name}`} />;
  }
  return image;
}

export const getImageBaseThumbnail =  (product) => {
  const imageUrl = getImageUrlByType('product');
  
  let image = <img className={`img-fluid`} src={`${noImageUrl.img}`} alt={`${noImageUrl.alt}`} />

  if (product.productImages && product.productImages.length) {
    image = <img className={`img-fluid`} src={`${imageUrl}/${getThumbnail(product.productImages[0])}`} alt={`${product.name}`} />;
  }
  return image;
}

export const getSortPriceRange = (obj) => {
  if (!obj || !obj.productProductItems) {
    return obj;
  }
  const range = obj.productProductItems.sort((a, b) => parseFloat(a.retailPrice) > parseFloat(b.retailPrice) ? 1 : -1);

  if (range.length > 1 && (range[0].retailPrice !== range[range.length - 1].retailPrice)) {
    return `USD $${range[0].retailPrice} - $${range[range.length - 1].retailPrice}`;
  } else if (range.length > 0) {
    return `USD $${range[0].retailPrice}`;
  } else {
    return `Invalid Price`;
  }
}

export const sortOptions = (obj, neddle = null) => {
  if (neddle) {
    return obj.sort((a, b) => parseFloat(a[neddle]) > parseFloat(b[neddle]) ? 1 : -1);
  } else {
    return obj;
  }
}

export const returnDefaultOption = (obj) => {
  let getItem = null;

  const findByDefault = obj.filter(item => item.default)[0];

  if (findByDefault) {
    getItem = findByDefault[0];
  }
  
  if (!getItem) {
    const findByPos = sortOptions(obj, 'position');
    if (findByPos) {
      getItem = findByPos[0];
    }
  }

  if (!getItem) {
    getItem = obj[0];
  }

  return getItem;
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

export const getTotal = (obj) => {
  let total = 0;

  if (!isNaN(obj.quantity) && !isNaN(obj.retailPrice)) {
    total = obj.quantity * obj.retailPrice;
  }

  return `$${total.toFixed(2)}`;
}

export const getCartTotal = (obj) => {
  let subtotal = 0;
  let taxes = 0;
  let grandTotal = 0;
  let savedGrandTotal = 0;
  let coupon = !obj.coupon || obj.coupon === -1 ? 0 : parseFloat(obj.coupon);
  let delivery = !obj.delivery || obj.delivery === -1 ? 0 : parseFloat(obj.delivery);
  let originalTotal = 0;
  let cart = obj.cart;
  if (cart) {
    Object.keys(cart).forEach((key, index) => {
      subtotal += cart[key].retailPrice * cart[key].quantity;
      originalTotal += cart[key].originalPrice * cart[key].quantity;
    })
  }

  let couponTotal = 0;

  if (coupon) {
    couponTotal = ((coupon / 100) * subtotal);
  }

  let newSubtotal = subtotal - couponTotal;

  taxes = newSubtotal * 0.07;

  grandTotal = taxes + newSubtotal + delivery;

  savedGrandTotal = isNaN(originalTotal) ? null : originalTotal - newSubtotal;

  if (coupon && !isNaN(savedGrandTotal)) {
    savedGrandTotal = savedGrandTotal + couponTotal;
  }

  return {
    'subtotal': formatNumber(subtotal),
    'delivery': formatNumber(delivery),
    'taxes': formatNumber(taxes),
    'coupon': formatNumber(couponTotal),
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