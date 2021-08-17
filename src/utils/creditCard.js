import { v4 as uuidv4 } from 'uuid';

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
  var str = "https://h.online-metrix.net/fp/tags.js?org_id=" + org_id + "&session_id=" + merchantID + sessionID + "&m=2";

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