
export const FORM_TYPE = {
  text: 'textfield',
  drop: 'dropdown',
  number: 'number',
  file: 'file',
  textArea: 'textarea',
}

export const OPTIONS_DROP = {
  STATUS: {
    key: 'status',
    option: 'statuses'
  },
  BRAND: {
    key: 'brand',
    option: 'brands',
  },
  CATEGORY: {
    key: 'category',
    option: 'categories',
  },
  VENDOR: {
    key: 'vendor',
    option: 'vendors',
  }
}
export const FORM_SCHEMA = {
  name: FORM_TYPE.text,
  status: FORM_TYPE.drop,
  email: FORM_TYPE.text,
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