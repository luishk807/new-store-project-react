
export const FORM_TYPE = {
  text: 'textfield',
  drop: 'dropdown',
  number: 'number',
  file: 'file',
  email: 'email',
  pass: 'password',
  date: 'date',
  rate: 'rate',
  textArea: 'textarea',
  linkItem: 'linkitem',
  imageUrl: 'imgurl',
  checkbox: 'checkbox',
}

export const CATEGORY_ICONS = [
  {
    name: 'Car',
    value: 'car',
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
  },  {
    name: 'Baby',
    value: 'baby',
  }
]

export const defaultCountry = {
  id: 165,
  name: 'Panama'
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
    label: 'Name'
  },
  status: {
    type: FORM_TYPE.drop,
    label: 'Status',
  },
  title: {
    type: FORM_TYPE.text,
    label: 'Title',
  },
  subject: {
    type: FORM_TYPE.text,
    label: 'Subject',
  },
  rate: {
    type: FORM_TYPE.rate,
    label: 'Rate',
  },
  comment: {
    type: FORM_TYPE.textArea,
    label: 'Comment',
  },
  icon: {
    type: FORM_TYPE.drop,
    label: 'Icon',
  },
  password: {
    type: FORM_TYPE.pass,
    label: 'Password',
  },
  email: {
    type: FORM_TYPE.email,
    label: 'Email',
  },
  user: {
    type: FORM_TYPE.drop,
    label: 'Username',
  },
  first_name: {
    type: FORM_TYPE.text,
    label: 'First name',
  },
  position: {
    type: FORM_TYPE.drop,
    label: 'Position',
  },
  state: {
    type: FORM_TYPE.text,
    label: 'State',
  },
  last_name: {
    type: FORM_TYPE.text,
    label: 'Last Name',
  },
  stock: {
    type: FORM_TYPE.number,
    label: 'Stock',
  },
  amount: {
    type: FORM_TYPE.number,
    label: 'Amount',
  },
  tax: {
    type: FORM_TYPE.number,
    label: 'Tax',
  },
  subtotal: {
    type: FORM_TYPE.number,
    label: 'Subtotal',
  },
  grandtotal: {
    type: FORM_TYPE.number,
    label: 'Grand Total',
  },
  category: {
    type: FORM_TYPE.drop,
    label: 'Category',
  },
  brand: {
    type: FORM_TYPE.drop,
    label: 'Brand',
  },
  zip: {
    type: FORM_TYPE.text,
    label: 'Zip code',
  },
  city: {
    type: FORM_TYPE.text,
    label: 'City',
  },
  date_of_birth: {
    type: FORM_TYPE.date,
    label: 'Birth of date',
  },
  model: {
    type: FORM_TYPE.text,
    label: 'Product Model',
  },
  gender: {
    type: FORM_TYPE.drop,
    label: 'Gender',
  },
  code: {
    type: FORM_TYPE.text,
    label: 'Product Code',
  },
  description: {
    type: FORM_TYPE.textArea,
    label: 'Description',
  },
  message: {
    type: FORM_TYPE.textArea,
    label: 'Message',
  },
  vendor: {
    type: FORM_TYPE.drop,
    label: 'Vendor',
  },
  image: {
    type: FORM_TYPE.file,
    label: 'Image',
  },
  address: {
    type: FORM_TYPE.text,
    label: 'Address',
  },
  province: {
    type: FORM_TYPE.drop,
    label: 'Province',
  },
  district: {
    type: FORM_TYPE.drop,
    label: 'District',
  },
  corregimiento: {
    type: FORM_TYPE.drop,
    label: 'Corregimiento',
  },
  mobile: {
    type: FORM_TYPE.text,
    label: 'Mobile',
  },
  phone: {
    type: FORM_TYPE.text,
    label: 'Phone',
  },
  country: {
    type: FORM_TYPE.drop,
    label: 'Country',
  },
  township: {
    type: FORM_TYPE.text,
    label: 'Township',
  },
  userRole: {
    type: FORM_TYPE.drop,
    label: 'Roles',
  },
  imageBoxType: {
    type: FORM_TYPE.drop,
    label: 'Image box type',
  },
  products: {
    type: FORM_TYPE.linkItem,
    label: 'Products',
  },
  imageBoxes: {
    type: FORM_TYPE.linkItem,
    label: 'Image boxes',
  },
  sweetBoxType: {
    type: FORM_TYPE.drop,
    label: 'Sweet box type',
  },
  imageBox: {
    type: FORM_TYPE.imageUrl,
    label: 'Image box',
  },
  order: {
    type: FORM_TYPE.text,
    label: 'Order number',
  },
  orderCancelReason: {
    type: FORM_TYPE.drop,
    label: 'Order cancel reason',
  },
  selected: {
    type: FORM_TYPE.checkbox,
    label: 'Selected'
  },
  orderCancelReason: {
    type: FORM_TYPE.drop,
    label: 'Order cancel reason'
  },
  deliveryOption: {
    type: FORM_TYPE.drop,
    label: 'Delivery Options'
  },
  orderStatus: {
    type: FORM_TYPE.drop,
    label: 'Status'
  },
  cart: {
    type: FORM_TYPE.text,
    label: 'Cart',
  },
  shipping_address: {
    type: FORM_TYPE.text,
    label: 'Shipping Address',
  },
  shipping_corregimiento: {
    type: FORM_TYPE.text,
    label: 'Shipping corregimiento',
  },
  shipping_country: {
    type: FORM_TYPE.text,
    label: 'Shipping country',
  },
  shipping_district: {
    type: FORM_TYPE.text,
    label: 'Shipping district',
  },
  shipping_email: {
    type: FORM_TYPE.email,
    label: 'Shipping email',
  },
  shipping_name: {
    type: FORM_TYPE.text,
    label: 'Shipping name',
  },
  shipping_phone: {
    type: FORM_TYPE.text,
    label: 'Shipping phone',
  },
  shipping_province: {
    type: FORM_TYPE.text,
    label: 'Shipping province',
  },
  deliveryId: {
    type: FORM_TYPE.text,
    label: 'Delivery',
  },
  delivery: {
    type: FORM_TYPE.text,
    label: 'Delivery option',
  },
  userid: {
    type: FORM_TYPE.text,
    label: 'User',
  },
}

export const noImageUrl = {
  img: '/images/no-image.jpg',
  alt: 'no image',
}

export const ALLOW_FIELDS = ['saved', 'id', 'items'];

export const config = {
  backEndUrl: process.env.BACKEND_URL,
  apiBaseUrl: process.env.API_BASE_URL
}
