import axios, { post, put} from 'axios';
import cookieCutter from 'cookie-cutter';

import { formatForm, formatFormData } from '../utils/products';
const API_HOST_URL = process.env.BACKEND_URL;

export default class Api {
  static baseUrl = API_HOST_URL+'/api';

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
    const authorization = cookieCutter.get('authorization')

    if(method === "POST" || method === "PUT") {
      const cleanForm = formatFormData(body)
      const request = put(apiUrl, cleanForm, { headers: {'Authorization': `Basic ${authorization}`}})
      return request;
    } else{
      const cleanForm = formatForm(body)
      config = {
        ...config,
        'Authorization': `token ${authorization}`
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