export const formatForm = (form) => {
  const currentForm = form;
  for (var i in form){
    if (typeof form[i] === "object") {
      if (i == "image") {
        currentForm[i] = form[i].map((data) => data.name)
      } else {
        currentForm[i] = form[i].id
      }
    }
  }
  return currentForm;
}