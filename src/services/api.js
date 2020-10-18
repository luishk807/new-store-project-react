import axios, { post, put} from 'axios';
import { getCookie } from '../utils/cookie';

import { formatForm, formatFormData } from '../utils/products';

export default class Api {
  static baseUrl = process.env.BACKEND_URL+'/api';

  static get(url, param, config, format = "json") {
    return Api.request("GET", url, param, config, format);
  }

  static post(url, param, config, format = "json") {
    return Api.request("POST", url, param, config, format);
  }

  static delete(url, param, config, format = "json") {
    return Api.request("DELETE", url, param, config, format);
  }

  static save(url, param, config, format = "json") {
    return Api.request("PUT", url, param, config, format);
  }

  static request(method, url, body, config = {}, format = "json") {
    let apiUrl = url; 

    if (apiUrl.indexOf('http') !== 0) {
      apiUrl = `${config.baseUrl || Api.baseUrl || ''}${apiUrl}`;
    }

    console.log("shmitig", apiUrl, ' and ', body)
    const cookie = getCookie();
    const token = cookie && cookie.token ? cookie.token : null;
    if(method === "POST") {
      console.log('post')
      const cleanForm = formatFormData(body)
      const request = post(apiUrl, cleanForm, { headers: {'Authorization': `Basic ${token}`}})
      return request;
    } else if(method === "PUT") {
      const cleanForm = formatFormData(body)
      const request = put(apiUrl, cleanForm, { headers: {'Authorization': `Basic ${token}`}})
      return request;
    } else{
      const cleanForm = formatForm(body)
      config = {
        ...config,
        'Authorization': `token ${token}`
      }
      const fetchConfig = {
        method: method,
        url: apiUrl,
        params: cleanForm,
        headers: {
          ...(config || {}),
        },
      };
      const request = axios(fetchConfig).then((data) => {
        // console.log('result data', data)
         return data.data;
       }).catch((e) => {
         throw e;
       })
       return request;
    }
  }
}