import { FORM_SCHEMA } from '../../config';

export const formatForm = (form) => {
  const currentForm = form;
  for (var i in form){
    if (FORM_SCHEMA[i] == "file") {
      currentForm[i] = form[i].map((data) => data.name)
    } else if (FORM_SCHEMA[i] == "dropdown") {
      currentForm[i] = form[i].id
    } else {
      currentForm[i] = form[i]
    }
  }
  return currentForm;
}

export const formatFormData = (form) => {
  const currentForm = form;
  const formData = new FormData();
  for (var i in form){
    if (FORM_SCHEMA[i] === "file") {
      if (form[i] && form[i].length) {
        form[i].forEach((data) => {
          formData.append('image', data)
        })
      }
    } else if (FORM_SCHEMA[i] === "dropdown") {
      const dropValue = 'id' in form[i] ? form[i].id : form[i].value;
      formData.append(i,dropValue)
    } else if (i == "saved") {
      formData.append(i, JSON.stringify(form[i]))
    } else {
      formData.append(i,form[i])
    }
  }
  return formData;
}