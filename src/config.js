
export const FORM_TYPE = {
  text: 'textfield',
  drop: 'dropdown',
  number: 'number',
  file: 'file',
  textArea: 'textarea',
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

export const FORM_SCHEMA = {
  name: FORM_TYPE.text,
  status: FORM_TYPE.drop,
  icon: FORM_TYPE.drop,
  password: FORM_TYPE.text,
  email: FORM_TYPE.text,
  first_name: FORM_TYPE.text,
  position: FORM_TYPE.drop,
  last_name: FORM_TYPE.text,
  stock: FORM_TYPE.number,
  amount: FORM_TYPE.number,
  category: FORM_TYPE.drop,
  brand: FORM_TYPE.drop,
  model: FORM_TYPE.text,
  code: FORM_TYPE.text,
  description: FORM_TYPE.textArea,
  vendor: FORM_TYPE.drop,
  image: FORM_TYPE.file,
}