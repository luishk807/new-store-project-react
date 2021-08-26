import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

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

export const encryptSign = async(params) => {
  const dataComma = buildDataToSign(params);
  console.log("dataCOmma", dataComma)
  return signData(dataComma, "2fd54ee1a04f43f584350fed975d64ef509b4455ed6e429eb4215b32929f844bc5ceb23a6c1c49fc8409e306bbce922e76c9cff0a7924b6bbe0abed63c13e54a13eee3e8eaf84a91849a2f6848d83523e3d8fbf79b3a437288055b81d4830a5f1ddb14df6a164d1383b0a30331b5a4336669ecd6f6a248108bc139ed96fa8fa8");
}

export const signData = (data, secretKey = null) => {
   // return base64_encode(hash_hmac('sha256', $data, $secretKey, true));
  // return Base64.stringify(sha256(data, secretKey));
  return getSignaureTest(data)
}


export const getSignaureTest = (formData) => {
  console.log("formData",formData)
  // var signature = $('<input/>').attr('id', 'signature').attr('type', 'hidden').attr('name', 'signature');
 return CryptoJS.HmacSHA256(formData, "2fd54ee1a04f43f584350fed975d64ef509b4455ed6e429eb4215b32929f844bc5ceb23a6c1c49fc8409e306bbce922e76c9cff0a7924b6bbe0abed63c13e54a13eee3e8eaf84a91849a2f6848d83523e3d8fbf79b3a437288055b81d4830a5f1ddb14df6a164d1383b0a30331b5a4336669ecd6f6a248108bc139ed96fa8fa8").toString(CryptoJS.enc.Base64);
  //prepend the signature field to the form 
  //$('#payment_form').prepend(signature);
}

export const buildDataToSign = (params) => {
  let dataToSign = [];
  const signedFieldNames = params["signed_field_names"].split(",");
  signedFieldNames.forEach(item => {
    dataToSign.push(`${item}=${params[item]}`);
  })

  return commaSeparate(dataToSign);
}

export const commaSeparate = (dataToSign) => {
  return dataToSign.join(',');
}


export const convertToSignatureDate = (d) => {
  const [ isoDate ] = d.toISOString().split(".");

  return `${isoDate}Z`;
}

export const uniqid = (prefix = "", random = false) => {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
  return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}`:""}`;
};


// Información de identificación del dispositivo  
// Ejecución del javascrips cybs_dfprofiler   parametos de entrada (merchantID =tc_pa_0xxxxxxxxx, environment =live/test) en la página de pago
// Valor de retorno colocar en el campo device_fingerprint_id  y enviar cifrado como los demás campos 
// se usa en el momento que presiona el boton de pagar para regrear el device fingerprint
export const cybs_dfprofiler = (merchantID, environment) => {
  if (environment.toLowerCase() == 'live') {
    var org_id = 'k8vif92e';
  } else {
    var org_id = '1snn5n9w';
  }

  var sessionID =   new Date().getTime();
  var str = `https://h.online-metrix.net/fp/tags.js?org_id=${org_id}&session_id=${merchantID}${sessionID}&m=2`;

  // var paragraphTM = document.createElement("p");
  // str = "background:url(https://h.online-metrix.net/fp/clear.png?org_id=" + org_id + "&session_id=" + merchantID + sessionID + "&m=1)";
   

  // paragraphTM.styleSheets = str;
  // paragraphTM.height = "0";
  // paragraphTM.width = "0";
  // paragraphTM.hidden = "true";

  // document.body.appendChild(paragraphTM);

  // var img = document.createElement("img");

  // str = "https://h.online-metrix.net/fp/clear.png?org_id=" + org_id + "&session_id=" + merchantID + sessionID + "&m=2";
  // img.src = str;
   
  // document.body.appendChild(img);
   

  // var tmscript = document.createElement("script");
  // tmscript.src = "https://h.online-metrix.net/fp/check.js?org_id=" + org_id + "&session_id=" + merchantID + sessionID;
  // tmscript.type = "text/javascript";

  // document.body.appendChild(tmscript);

  // var objectTM = document.createElement("object");
  // objectTM.data = "https://h.online-metrix.net/fp/fp.swf?org_id=" + org_id + "&session_id=" + merchantID + sessionID;
  // objectTM.width = "1";
  // objectTM.height = "1";
  // objectTM.id = "thm_fp";

  // var param = document.createElement("param");
  // param.name = "movie";
  // param.value = "https://h.online-metrix.net/fp/fp.swf?org_id=" + org_id + "&session_id=" + merchantID + sessionID;
  // objectTM.appendChild(param);
  // str = "https://h.online-metrix.net/fp/tags.js?org_id=" + org_id + "&session_id=" + merchantID + sessionID + "";
  // document.body.appendChild(objectTM);
  // return sessionID;
    return str;
} 