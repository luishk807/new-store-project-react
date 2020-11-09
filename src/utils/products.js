import { FORM_SCHEMA } from '../../config';

export const formatForm = (form) => {
  const currentForm = form;
  for (var i in form){
    if (FORM_SCHEMA[i] == "file") {
      currentForm[i] = form[i].map((data) => data.name)
    } else if (FORM_SCHEMA[i] == "dropdown") {
      const dropValue = form[i] && form[i].id ? form[i].id : form[i];
      currentForm[i] = dropValue;
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
      let dropValue = null;
      if (Object.keys(form[i]).length && form[i].id) {
        dropValue = form[i].id;
      } else if (form[i] && form[i].value) {
        dropValue = form[i].value;
      } else if (form[i]) {
        dropValue = form[i];
      }
      formData.append(i,dropValue)
    } else if (i == "saved") {
      formData.append(i, JSON.stringify(form[i]))
    } else {
      formData.append(i,form[i])
    }
  }
  return formData;
}