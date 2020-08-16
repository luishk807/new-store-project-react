
export const FORM_TYPE = {
  text: 'textfield',
  drop: 'dropdown',
  file: 'file',
  textArea: 'textarea',
}

export const FORM_SCHEMA = {
  name: FORM_TYPE.text,
  email: FORM_TYPE.text,
  stock: FORM_TYPE.text,
  amount: FORM_TYPE.text,
  category: FORM_TYPE.drop,
  brand: FORM_TYPE.drop,
  model: FORM_TYPE.text,
  code: FORM_TYPE.text,
  description: FORM_TYPE.textArea,
  vendor: FORM_TYPE.drop,
  image: FORM_TYPE.file,
}