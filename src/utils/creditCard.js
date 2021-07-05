import { FORM_SCHEMA, CATEGORY_ICONS, IGNORE_FORM_FIELDS } from '../../config';
import { ADMIN_SECTIONS } from '../constants/admin';
import { getSections, getBasicAdmin, getBasicUser } from '../api';

export const getCardType = (card) => {
  let type = null;

  if (isNaN(card)) {
    return null;
  }

  const checkCard = Number(card);

  if (checkCard.length === 15 && checkCard[0] === 1 && (checkCard[1] === 4 || checkCard[1] === 7)) {
    // amx
    type = 003;
  } else if(checkCard) {
    // visa
  } else if (checkCard) {
    // 
  }
  return type;

}