// import Api from '../services/api';
import axios, { post, put} from 'axios';

export const uniqid = (prefix = "", random = false) => {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
};

export const processPaymentCard = async(data) => {
  // <input type="hidden" name="access_key" value="<REPLACE WITH ACCESS KEY>">
  // <input type="hidden" name="profile_id" value="<REPLACE WITH PROFILE ID>">
  // <input type="hidden" name="transaction_uuid" value="<?php echo uniqid() ?>">
  // <input type="hidden" name="signed_field_names" value="access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code">
  // <input type="hidden" name="unsigned_field_names" value="card_type,card_number,card_expiry_date">
  // <input type="hidden" name="signed_date_time" value="<?php echo gmdate("Y-m-d\TH:i:s\Z"); ?>">
  // <input type="hidden" name="locale" value="en">
  
  data['access_key'] = process.env.STGEORGE_ACCESS_KEY;
  data['profile_id'] = process.env.STGEORGE_PROFILE_ID;
  data['transaction_uuid'] = uniqid();
  data['signed_field_names'] = 'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_cod';
  data['unsigned_field_names'] = 'card_type,card_number,card_expiry_date';
  data['signed_date_time'] = new Date().toISOString();
  data['locale'] = 'en';
  const apiUrl = process.env.STGEORGE_URL;
  const request = post(apiUrl, data)
  return request;
}