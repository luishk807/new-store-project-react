import { getImageUrlByType } from './form';
import { noImageUrl, defaultCountry, defaultPanama } from 'config';
import { getProductItemByIds } from '@/api/productItems';
import { getProductById } from '@/api/products';
import { getThumbnail } from '@/utils/helpers/image'

export const removeCharacter = (str) => {
  return str ? str.replace(/_/g, ' ') : str
}

export const getAddressFields = (opt, dFields = null) => {
  const delivery_option = opt ? +opt : null;

  let fields = {
    name: null,
    email: null,
    phone: null,
  }

  if (delivery_option !== 1) {
    fields = {
      name: null,
      email: null,
      phone: null,
      address: null,
      addressB: null,
      province: null,
      district: null,
      corregimiento: null,
      // zone: null,
      country: defaultCountry,
      note: null,
    }
    if (delivery_option == 2) {
      fields.province = defaultPanama.province;
      fields.district = defaultPanama.district;
    } else {
      fields.province = null;
      fields.district = null;
    }
  }

  let newField = {};
  if (dFields) {
    for(const key in fields) {
      let found = false;
      for(const key_b in dFields) {
        if (key == key_b) {
          newField[key] = dFields[key_b];
          found = true;
        }
      }
      if (!found) {
        
        newField[key] = fields[key];
      }
    }
  } else {
    newField = fields;
  }
  return newField;
}

export const formatNumber = (x) => x ? Number.parseFloat(x).toFixed(2) : 0.00;

export const checkOrderAddressIsEmpty = (userAddress) => {
  return userAddress.shipping_address || userAddress.shipping_city || userAddress.shipping_corregimiento || userAddress.shipping_country || userAddress.shipping_district || userAddress.shipping_email || userAddress.shipping_name || userAddress.shipping_note || userAddress.shipping_phone || userAddress.shipping_province || userAddress.shipping_township || userAddress.shipping_zip || userAddress.shipping_zone;
}

export const cleanUserAddress = (userAddress) => {

  let address = [];

  address.push(userAddress.shipping_name);
  address.push(userAddress.shipping_address);
  address.push(userAddress.shipping_city);
  address.push(userAddress.shipping_province);
  address.push(userAddress.shipping_district);
  address.push(userAddress.shipping_country);
  address.push(userAddress.shipping_zone);
  address.push(userAddress.shipping_township);
  address.push(userAddress.shipping_zip);
  address.push(userAddress.shipping_note);
  address.push(userAddress.shipping_corregimiento);
  address.push(userAddress.shipping_email);
  address.push(userAddress.shipping_phone);

  const cleanArry = address.filter(a => a);
  
  return cleanArry.join("<br/>");
}

export const getCartTotalItems = (cart, item = null) => {
  if (cart && cart.length) {
    if (item) {
      let getItems = null;
      if (item.bundle) {
        getItems = cart.filter(cartItem => cartItem.id == item.id && cartItem.productColor == item.productColor && cartItem.productSize == item.productSize && cartItem.bundle && cartItem.bundle.id == item.bundle.id);
      } else {
        getItems = cart.filter(cartItem => cartItem.id == item.id && cartItem.productColor == item.productColor && !item.bundle && !cartItem.bundle && cartItem.productSize == item.productSize);
      }
      if (getItems && getItems.length) {
        const totalx = getItems.map(item => item.quantity).reduce((prev, curr) => prev + curr)
        return totalx
      }
    } else {
      return cart.map(item => item.quantity).reduce((prev, curr) => prev + curr)
    }
  } else {
    return cart
  }
}

export const getCartItemIndex = (cart, item) => {
  let keyFound = null;

  if (cart && Object.keys(cart).length) 
  {
    for(let key = 0; key < Object.keys(cart).length; key++) {
      if(cart[key].id == item.id) {
        if (cart[key].bundle && item.bundle && item.bundle.id == cart[key].bundle.id) {
          keyFound = key
          break;
        } else if (!item.bundle && !cart[key].bundle) {
          keyFound = key
          break;
        }
      }
    }
  }
  return keyFound;
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

  taxes = newSubtotal * (Number(process.env.COUNTRY_TAX) / 100);

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

export const getCartItemById = (cart, item) => {
  let getCartItem = null
  if (cart && Object.keys(cart).length) {
    Object.keys(cart).forEach(c => {
       if (cart[c].id == item.id) {
         getCartItem = cart[c];
       }
     })
   }

   return getCartItem
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

export const isEmpty = (str) => {
  return !str || str === 'null';
};

export const getCatSearch = (data) => {
  const catUrl = !isEmpty(data.altUrl) ? data.altUrl : `?cat=${data.id}&catn=${data.name}`;
  return encodeURI(`/searchResult${catUrl}`);
}

export function removeDuplicatesByProperty(inputArray, propertyName) {
  if (Array.isArray(inputArray)) {
    const uniqueValues = [];
    const returnArray = [];
    inputArray.forEach((value) => {
      // If the value is not there
      if (!uniqueValues.includes(value[propertyName])) {
        returnArray.push(value);
        uniqueValues.push(value[propertyName])
      }
    });
    return returnArray;
  }
  return inputArray;
}


export const getFormatAddressText = (data) => {

  let address = '';

  if (data.shipping_name) {
    address +=  `${data.shipping_name}\n`;
  }
  if (data.shipping_address) {
    address += `${data.shipping_address}\n`;
  }
  if (data.shipping_province) {
    address += `${data.shipping_province}\n`;
  }
  if (data.shipping_corregimiento) {
    address += `${data.shipping_corregimiento}\n`;
  }
  if (data.shipping_district) {
    address += `${data.shipping_district}\n`;
  }
  if (data.shipping_country) {
    address += `${data.shipping_country}\n`;
  }
  if (data.shipping_address) {
    address += `${data.shipping_address}\n`;
  }

  if (data.shipping_note) {
    address += `Note: ${data.shipping_note}\n`;
  }

  if (data.shipping_email) {
    address += `Email: ${data.shipping_email}\n`;
  }
  if (data.shipping_phone) {
    address += `Phone: ${data.shipping_phone}\n`;
  }

  return address;
}