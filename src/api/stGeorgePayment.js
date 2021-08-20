// import Api from '../services/api';
import axios, { post, put } from 'axios';
import Api from '../services/api';
import { getIP} from '../utils';
import { formatFormDataRaw } from '../utils/products';
import { v4 as uuidv4 } from 'uuid';
import { cybs_dfprofiler, convertToSignatureDate } from '../utils/creditCard';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

export const getSignature = async(data) => {
  let dataToSign = {};
  const signedFieldNames = data["signed_field_names"].split(",");
  signedFieldNames.forEach(item => {
    dataToSign[item]=`${data[item]}`;
  })
  return Api.get(`st-george-bank`, dataToSign);
}

export const uniqid = (prefix = "", random = false) => {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
};

export const encryptSign = async(params) => {
  return signData(buildDataToSign(params), process.env.STGEORGE_SECREY_KEY);
}

export const signData = (data, secretKey = null) => {
   // return base64_encode(hash_hmac('sha256', $data, $secretKey, true));
   return Base64.stringify(sha256(data, secretKey));
}

export const buildDataToSign = (params) => {
  let dataToSign = [];
  const signedFieldNames = params["signed_field_names"].split(",");
  signedFieldNames.forEach(item => {
    dataToSign.push(`${item} = ${params[item]}`);
  })

  return commaSeparate(dataToSign);
}

export const commaSeparate = (dataToSign) => {
  return dataToSign.join(',');
}

export const processPaymentCard = async(data) => {
  const myIP = await getIP();
  let referenceNum = new Date().toISOString(); // user numero de orden - recomendado
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Set-Cookie': uuidv4()
  }
  data['access_key'] = process.env.STGEORGE_ACCESS_KEY;
  data['profile_id'] = process.env.STGEORGE_PROFILE_ID;
  data['transaction_uuid'] = referenceNum;
  data['merchant_defined_data2'] = "Avenidaz.com";
  data['merchant_defined_data3'] = "https://www.avenidaz.com";
  data['tax_indicator'] = "Y";
  data['unsigned_field_names'] = 'card_type,card_number,card_expiry_date,card_cvn';
  data['signed_date_time'] = convertToSignatureDate(new Date());
  data['customer_ip_address'] = myIP;
  data['reference_number'] = referenceNum;
  data['user_po'] = referenceNum;
  data['override_custom_receipt_page'] = "https://www.avenidaz.com/stgeorgeprocess.js";
  data['locale'] = 'es-co';
  data['device_fingerprint_raw'] = 'true';
  data['transaction_type'] = "sale";
  data['currency'] = "USD";
  const encrypt = await encryptSign(data);
  data['signature'] = encrypt;
  const cleanForm = formatFormDataRaw(data);

  console.log("cleaning", cleanForm)
  const apiUrl = process.env.STGEORGE_URL;
  const request = post(apiUrl, cleanForm, {
    headers: headers
  })
  // const request = post(apiUrl, data)
  return request;
}