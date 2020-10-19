export const removeCharacter = (str) => {
  return str.replace(/_/g, ' ')
}

export const formatNumber = (x) => Number.parseFloat(x).toFixed(2);

export const getCartTotal = (cart) => {
  let subtotal = 0;
  let taxes = 0;
  let grandTotal = 0;
  let delivery = 0;

  if (cart) {
    Object.keys(cart).forEach((key, index) => {
      subtotal += cart[key].amount * cart[key].quantity;
    })
    //console.log("hey", data)
  }

  taxes = subtotal * 0.08;

  grandTotal = taxes + subtotal;

  return {
    'subtotal': formatNumber(subtotal),
    'delivery': formatNumber(delivery),
    'taxes': formatNumber(taxes),
    'grandTotal': formatNumber(grandTotal)
  }
}