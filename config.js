
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

export const FORM_SCHEMA = {
  name: FORM_TYPE.text,
  status: FORM_TYPE.drop,
  title: FORM_TYPE.text,
  rate: FORM_TYPE.rate,
  comment: FORM_TYPE.textArea,
  icon: FORM_TYPE.drop,
  password: FORM_TYPE.pass,
  email: FORM_TYPE.email,
  user: FORM_TYPE.drop,
  first_name: FORM_TYPE.text,
  position: FORM_TYPE.drop,
  state: FORM_TYPE.text,
  last_name: FORM_TYPE.text,
  stock: FORM_TYPE.number,
  amount: FORM_TYPE.number,
  category: FORM_TYPE.drop,
  brand: FORM_TYPE.drop,
  zip: FORM_TYPE.text,
  city: FORM_TYPE.text,
  date_of_birth: FORM_TYPE.date,
  model: FORM_TYPE.text,
  gender: FORM_TYPE.drop,
  code: FORM_TYPE.text,
  description: FORM_TYPE.textArea,
  vendor: FORM_TYPE.drop,
  image: FORM_TYPE.file,
  address: FORM_TYPE.text,
  province: FORM_TYPE.text,
  mobile: FORM_TYPE.text,
  phone: FORM_TYPE.text,
  country: FORM_TYPE.drop,
  township: FORM_TYPE.text,
  userRole: FORM_TYPE.drop,
  bannerType: FORM_TYPE.drop,
  products: FORM_TYPE.linkItem,
}

export const noImageUrl = '/images/no-image.jpg';