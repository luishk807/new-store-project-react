export const FORM_TYPE = {
  text: 'textfield',
  drop: 'dropdown',
  number: 'number',
  file: 'file',
  email: 'email',
  pass: 'password',
  date: 'date',
  dateFull: 'datefull',
  rate: 'rate',
  color: 'color',
  textArea: 'textarea',
  linkItem: 'linkitem',
  imageUrl: 'imgurl',
  checkbox: 'checkbox',
  bool: 'boolean',
}

export const CATEGORY_ICONS = [
  {
    name: 'Special',
    value: 'special',
  },
  {
    name: 'Hogar',
    value: 'home',
  },
  {
    name: 'Otros',
    value: 'others',
  },
  {
    name: 'Navidad',
    value: 'christmas',
  },
  {
    name: 'Manualidades',
    value: 'manualidades',
  },
  {
    name: 'Envases',
    value: 'envases',
  },
  {
    name: 'Fiestas',
    value: 'fiestas',
  },
  {
    name: 'Covid',
    value: 'covid',
  },
  {
    name: 'Accesorios',
    value: 'accesorios',
  },
  {
    name: 'Car',
    value: 'car',
  },
  {
    name: 'Car',
    value: 'car',
  },
  {
    name: 'Mask',
    value: 'mask',
  },
  {
    name: 'Toy',
    value: 'toy',
  },
  {
    name: 'Health',
    value: 'health',
  },
  {
    name: 'Clothing',
    value: 'clothe',
  },
  {
    name: 'Garden',
    value: 'garden',
  },
  {
    name: 'Sport',
    value: 'sport',
  },
  {
    name: 'Fitness',
    value: 'fitness',
  },
  {
    name: 'Beauty',
    value: 'beauty',
  },
  {
    name: 'Furniture',
    value: 'furniture',
  },
  {
    name: 'Computer',
    value: 'computer',
  },
  {
    name: 'Appliance',
    value: 'appliance',
  },
  {
    name: 'Jewerly',
    value: 'jewerly',
  }, 
  {
    name: 'Baby',
    value: 'baby',
  },
  {
    name: 'Bag',
    value: 'bag',
  },
  {
    name: 'ClosedBag',
    value: 'closeBag',
  },
  {
    name: 'Ballons',
    value: 'ballons',
  },
  {
    name: 'OpenBox',
    value: 'openBox',
  },
  {
    name: 'GlassBottle',
    value: 'glassBottle',
  },
  {
    name: 'Basket',
    value: 'basket',
  },
  {
    name: 'Ribbon',
    value: 'ribbon',
  },
  {
    name: 'LifeSaver',
    value: 'lifeSaver',
  },
  {
    name: 'Cosmetic',
    value: 'cosmetic',
  },
  {
    name: 'BoxRibbon',
    value: 'boxRibbon',
  },
  {
    name: 'Paw',
    value: 'paw',
  }
]

export const defaultCountry = {
  id: 165,
  name: 'Panama'
}

export const defaultPanama = {
  province: {
    id: 8,
    name: 'Panama'
  }, 
  district: {
    id: 49,
    name: 'Panama'
  }
}


export const RateLabels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export const canceled_status = [7, 8, 9];

export const FORM_SCHEMA = {
  name: {
    type: FORM_TYPE.text,
    label: 'Name',
    tKey: "name"
  },
  status: {
    type: FORM_TYPE.drop,
    label: 'Status',
    tKey: "status"
  },
  title: {
    type: FORM_TYPE.text,
    label: 'Title',
    tKey: "title"
  },
  subject: {
    type: FORM_TYPE.text,
    label: 'Subject',
    tKey: "subject"
  },
  rate: {
    type: FORM_TYPE.rate,
    label: 'Rate',
    tKey: "rate"
  },
  comment: {
    type: FORM_TYPE.textArea,
    label: 'Comment',
    tKey: "comment"
  },
  icon: {
    type: FORM_TYPE.drop,
    label: 'Icon',
    tKey: "icon"
  },
  password: {
    type: FORM_TYPE.pass,
    label: 'Password',
    tKey: "password"
  },
  repassword: {
    type: FORM_TYPE.pass,
    label: 'Re-type Password',
    tKey: "repassword"
  },
  email: {
    type: FORM_TYPE.email,
    label: 'Email',
    tKey: "email"
  },
  user: {
    type: FORM_TYPE.drop,
    label: 'Username',
    tKey: "user"
  },
  first_name: {
    type: FORM_TYPE.text,
    label: 'First name',
    tKey: "first_name"
  },
  color: {
    type: FORM_TYPE.color,
    label: 'Color',
    tKey: "color"
  },
  position: {
    type: FORM_TYPE.drop,
    label: 'Position',
    tKey: "position"
  },
  state: {
    type: FORM_TYPE.text,
    label: 'State',
    tKey: "state"
  },
  last_name: {
    type: FORM_TYPE.text,
    label: 'Last Name',
    tKey: "last_name"
  },
  stock: {
    type: FORM_TYPE.number,
    label: 'Stock',
    tKey: "stock"
  },
  amount: {
    type: FORM_TYPE.number,
    label: 'Amount',
    tKey: "amount"
  },
  tax: {
    type: FORM_TYPE.number,
    label: 'Tax',
    tKey: "tax"
  },
  subtotal: {
    type: FORM_TYPE.number,
    label: 'Subtotal',
    tKey: "subtotal"
  },
  grandtotal: {
    type: FORM_TYPE.number,
    label: 'Grand Total',
    tKey: "grandtotal"
  },
  category: {
    type: FORM_TYPE.drop,
    label: 'Category',
    tKey: "category"
  },
  brand: {
    type: FORM_TYPE.drop,
    label: 'Brand',
    tKey: "brand"
  },
  zip: {
    type: FORM_TYPE.text,
    label: 'Zip code',
    tKey: "zip"
  },
  promoCode: {
    type: FORM_TYPE.text,
    label: 'Promotional Code',
    tKey: "promoCode"
  },
  city: {
    type: FORM_TYPE.text,
    label: 'City',
    tKey: "city"
  },
  date_of_birth: {
    type: FORM_TYPE.date,
    label: 'Birth of date',
    tKey: "date_of_birth"
  },
  model: {
    type: FORM_TYPE.text,
    label: 'Product Model',
    tKey: "model"
  },
  gender: {
    type: FORM_TYPE.drop,
    label: 'Gender',
    tKey: "gender"
  },
  sku: {
    type: FORM_TYPE.text,
    label: 'Product SKU',
    tKey: "sku"
  },
  description: {
    type: FORM_TYPE.textArea,
    label: 'Description',
    tKey: "description"
  },
  message: {
    type: FORM_TYPE.textArea,
    label: 'Message',
    tKey: "message"
  },
  note: {
    type: FORM_TYPE.textArea,
    label: 'Note',
    tKey: "note"
  },
  vendor: {
    type: FORM_TYPE.drop,
    label: 'Vendor',
    tKey: "vendor"
  },
  image: {
    type: FORM_TYPE.file,
    label: 'Image',
    tKey: "image"
  },
  address: {
    type: FORM_TYPE.text,
    label: 'Address',
    tKey: "address"
  },
  addressB: {
    type: FORM_TYPE.text,
    label: 'Address 2',
    tKey: "addressB"
  },
  province: {
    type: FORM_TYPE.drop,
    label: 'Province',
    tKey: "province"
  },
  district: {
    type: FORM_TYPE.drop,
    label: 'District',
    tKey: "district"
  },
  corregimiento: {
    type: FORM_TYPE.drop,
    label: 'Corregimiento',
    tKey: "corregimiento"
  },
  productId: {
    type: FORM_TYPE.number,
    label: 'Product Id',
    tKey: "productId"
  },
  productItemId: {
    type: FORM_TYPE.number,
    label: 'Product Item Id',
  },
  colorId: {
    type: FORM_TYPE.number,
    label: 'Color Id',
    tKey: "colorId"
  },
  mobile: {
    type: FORM_TYPE.text,
    label: 'Mobile',
    tKey: "mobile"
  },
  useCustom: {
    type: FORM_TYPE.bool,
    label: 'Custom',
    tKey: "useCustom"
  },
  phone: {
    type: FORM_TYPE.text,
    label: 'Phone',
    tKey: "phone"
  },
  deliveryService: {
    type: FORM_TYPE.drop,
    label: 'Delivery service',
    tKey: "deliveryService"
  },
  country: {
    type: FORM_TYPE.drop,
    label: 'Country',
    tKey: "country"
  },
  township: {
    type: FORM_TYPE.text,
    label: 'Township',
    tKey: "township"
  },
  userRole: {
    type: FORM_TYPE.drop,
    label: 'Roles',
    tKey: "userRole"
  },
  imageBoxType: {
    type: FORM_TYPE.drop,
    label: 'Image box type',
    tKey: "imageBoxType"
  },
  paymentOption: {
    type: FORM_TYPE.drop,
    label: 'Payment option',
    tKey: "paymentOption"
  },
  products: {
    type: FORM_TYPE.linkItem,
    label: 'Products',
    tKey: "products"
  },
  imageBoxes: {
    type: FORM_TYPE.linkItem,
    label: 'Image boxes',
    tKey: "imageBoxes"
  },
  sweetBoxType: {
    type: FORM_TYPE.drop,
    label: 'Sweet box type',
    tKey: "sweetBoxType"
  },
  imageBox: {
    type: FORM_TYPE.imageUrl,
    label: 'Image box',
    tKey: "imageBox"
  },
  order: {
    type: FORM_TYPE.text,
    label: 'Order number',
    tKey: "order"
  },
  orderCancelReason: {
    type: FORM_TYPE.drop,
    label: 'Order cancel reason',
    tKey: "orderCancelReason"
  },
  selected: {
    type: FORM_TYPE.checkbox,
    label: 'Selected',
    tKey: "selected"
  },
  deliveryOption: {
    type: FORM_TYPE.drop,
    label: 'Delivery Options',
    tKey: "deliveryOption"
  },
  orderStatus: {
    type: FORM_TYPE.drop,
    label: 'Status',
    tKey: "orderStatus"
  },
  cart: {
    type: FORM_TYPE.text,
    label: 'Cart',
    tKey: "cart"
  },
  shipping_address: {
    type: FORM_TYPE.text,
    label: 'Shipping Address',
    tKey: "shipping_address"
  },
  shipping_corregimiento: {
    type: FORM_TYPE.text,
    label: 'Shipping corregimiento',
    tKey: "shipping_corregimiento"
  },
  shipping_country: {
    type: FORM_TYPE.text,
    label: 'Shipping country',
    tKey: "shipping_country"
  },
  shipping_district: {
    type: FORM_TYPE.text,
    label: 'Shipping district',
    tKey: "shipping_district"
  },
  shipping_email: {
    type: FORM_TYPE.email,
    label: 'Shipping email',
    tKey: "shipping_email"
  },
  shipping_name: {
    type: FORM_TYPE.text,
    label: 'Shipping name',
    tKey: "shipping_name"
  },
  shipping_phone: {
    type: FORM_TYPE.text,
    label: 'Shipping phone',
    tKey: "shipping_phone"
  },
  shipping_province: {
    type: FORM_TYPE.text,
    label: 'Shipping province',
    tKey: "shipping_province"
  },
  shipping_zone: {
    type: FORM_TYPE.text,
    label: 'Shipping zone',
    tKey: "shipping_zone"
  },
  shipping_note: {
    type: FORM_TYPE.text,
    label: 'Shipping note',
    tKey: "shipping_note"
  },
  deliveryId: {
    type: FORM_TYPE.text,
    label: 'Delivery',
    tKey: "deliveryId"
  },
  delivery: {
    type: FORM_TYPE.text,
    label: 'Delivery option',
    tKey: "delivery"
  },
  userid: {
    type: FORM_TYPE.text,
    label: 'User',
    tKey: "userid"
  },
  key: {
    type: FORM_TYPE.text,
    label: 'Key',
    tKey: "key"
  },
  flete: {
    type: FORM_TYPE.number,
    label: 'Flete',
    tKey: "flete"
  },
  deliveryServiceFee: {
    type: FORM_TYPE.number,
    label: 'Delivery Service Fee',
    tKey: "delivery_service_fee"
  },
  fleteTotal: {
    type: FORM_TYPE.number,
    label: 'Flete Total',
    tKey: "fleteTotal"
  },
  total: {
    type: FORM_TYPE.number,
    label: 'Total',
    tKey: "total"
  },
  maxItems: {
    type: FORM_TYPE.number,
    label: 'Max items',
    tKey: "maxItems"
  },
  billingCost: {
    type: FORM_TYPE.number,
    label: 'Billing Cost',
    tKey: "billingCost"
  },
  unitCost: {
    type: FORM_TYPE.number,
    label: 'Unit Cost',
    tKey: "unitCost"
  },
  unitPrice: {
    type: FORM_TYPE.number,
    label: 'Unit Price',
    tKey: "unitPrice"
  },
  finalUnitPrice: {
    type: FORM_TYPE.number,
    label: 'Final Unit Price',
    tKey: "finalUnitPrice"
  },
  retailPrice: {
    type: FORM_TYPE.number,
    label: 'Retail Price',
    tKey: "retail_price"
  },
  profitPercentage: {
    type: FORM_TYPE.number,
    label: 'Profit Percentage',
    tKey: "profitPercentage"
  },
  exp_date: {
    type: FORM_TYPE.dateFull,
    label: 'Expiration Date',
    tKey: "exp_date"
  },
  zone: {
    type: FORM_TYPE.drop,
    label: 'Zone',
    tKey: "zone"
  },
  productColor: {
    type: FORM_TYPE.drop,
    label: 'Color',
    tKey: "productColor"
  },
  productSize: {
    type: FORM_TYPE.drop,
    label: 'Size',
    tKey: "productSize"
  },
  price: {
    type: FORM_TYPE.number,
    label: 'Price',
    tKey: "price"
  },
  quantity: {
    type: FORM_TYPE.number,
    label: 'quantity',
    tKey: "quantity"
  },
  minQuantity: {
    type: FORM_TYPE.number,
    label: 'Minimun quantity',
    tKey: "min_quantity"
  },
  percentage: {
    type: FORM_TYPE.number,
    label: 'Percentage',
    tKey: "percentage"
  },
  startDate: {
    type: FORM_TYPE.dateFull,
    label: 'Start Date',
    tKey: "start_date"
  },
  useDate: {
    type: FORM_TYPE.bool,
    label: 'Enforce Date',
    tKey: "use_date"
  },
  endDate: {
    type: FORM_TYPE.dateFull,
    label: 'End Date',
    tKey: "end_date"
  }
}

export const noImageUrl = {
  img: '/images/no-image.jpg',
  svg: '/images/svg/noimage.svg',
  alt: 'no image',
}

export const statusAllowedCancellation = [1, 2];

export const LIMIT = 30;

export const IGNORE_FORM_FIELDS = ['useDate', 'saved'];

export const ALLOW_FIELDS = ['saved', 'id', 'items', 'totalSaved', 'paymentOptionId', 'deliveryOptionId', 'deliveryServiceId', 'promotionCodeId', 'promotionCode'];

export const config = {
  backEndUrl: process.env.BACKEND_URL,
  apiBaseUrl: process.env.API_BASE_URL,
  socialLinks: {
    instagram: 'https://www.instagram.com/avenida_z/',
    facebook: 'https://www.facebook.com/Avenida-Z-109937764211160',
    whatssap: 'https://wa.me/50767702400'
  },
  name: 'Avenida Z',
  phone: '6770-2400',
  whatssap: '6770-2400',
  emails: {
    email: 'info@avenidaz.com',
    sales: 'ventas@avenidaz.com',
  },
  web: 'www.avenidaz.com',
  address: 'Plaza Dorado'
}
