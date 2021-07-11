export const getCardType = (card) => {
  let type = null;

  if (isNaN(card)) {
    return null;
  }

  const checkCard = String(card);
  
  if (checkCard.length === 15 && checkCard[0] === 3 && ['4','7'].indexOf(checkCard[1]) > 0) {
    // amx
    type = {
      name: 'American Express',
      id: '003'
    };
  } else if(checkCard.length <= 19 && checkCard[0] === '4') {
    // visa
    type =  {
      name: 'Visa',
      id: '001'
    };
  } else if (checkCard.length === 14 && checkCard[0] === '3' && ['0','6','8','9'].indexOf(checkCard[1]) > 0) {
    // dinner
    type =  {
      name: 'Diners Club',
      id: '005'
    };
  } else if (checkCard.length === 16 && (
    (checkCard[0] === '5' && Number(checkCard[1]) >= 1 && Number(checkCard[1]) <= 5) || 
    (checkCard[0] === 2 && Number(checkCard[1]) >= 2 && Number(checkCard[1]) <= 7)
    )
  ) {
    // mastercard
    type =  {
      name: 'Mastercard',
      id: '002'
    };
  } else if (checkCard.length === 16 && (
    Number(checkCard.substring(0,6)) === 601174 || 
    (Number(checkCard.substring(0,6)) >= 601100  && Number(checkCard.substring(0,6)) <= 601109) ||
    (Number(checkCard.substring(0,6)) >= 601120  && Number(checkCard.substring(0,6)) <= 601149) || 
    (Number(checkCard.substring(0,6)) >= 601177  && Number(checkCard.substring(0,6)) <= 601179) || 
    (Number(checkCard.substring(0,6)) >= 601186  && Number(checkCard.substring(0,6)) <= 601199) || 
    (Number(checkCard.substring(0,6)) >= 644000  && Number(checkCard.substring(0,6)) <= 659999)
  )) {
    // discover
    type =  {
      name: 'Discover',
      id: '004'
    };
  }
  return type;

}