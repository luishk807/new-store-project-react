// import Api from '../services/api';
import axios, { post, put } from 'axios';
import { getIP } from '../utils';

export const uniqid = (prefix = "", random = false) => {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
};

export const processPaymentCard = async(data) => {
  const myIP = await getIP();
  data['access_key'] = process.env.STGEORGE_ACCESS_KEY;
  data['profile_id'] = process.env.STGEORGE_PROFILE_ID;
  data['transaction_uuid'] = uniqid();
  data['signed_field_names'] = 'transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_cod, override_custom_receipt_page, merchant_defined_data2, merchant_defined_data3, user_po, line_item_count, device_fingerprint_id, customer_ip_address, tax_indicator';
  data['merchant_defined_data2'] = "Avenidaz.com";
  data['merchant_defined_data3'] = "https://www.avenidaz.com";
  data['user_po'] = 582364797;
  data['tax_indicator'] = "Y";
  data['unsigned_field_names'] = 'card_type,card_number,card_expiry_date';
  data['signed_date_time'] = new Date().toISOString();
  data['customer_ip_address'] = myIP;
  data['override_custom_receipt_page'] = "https://www.avenidaz.com/stgeorgeprocess.js";
  data['locale'] = 'es-co';
  const apiUrl = process.env.STGEORGE_URL;
  const request = post(apiUrl, data)
  return request;
}