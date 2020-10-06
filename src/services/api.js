import axios, { post, put} from 'axios';
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

    const fetchConfig = {
      method: method,
      url: apiUrl,
      headers: {
        ...(config || {}),
      },
    };

    //TODO: make sure image filefize is valid
    //TODO: make sure image file type is valid
    //TODO : make sure numbe of images is valid
    if(method === "POST") {
      const cleanForm = formatFormData(body)
      const request = post(apiUrl, cleanForm, config)
      return request;
    } else if(method === "PUT") {
      const cleanForm = formatFormData(body)
      const request = put(apiUrl, cleanForm, config)
      return request;
    } else{
      const cleanForm = formatForm(body)
      fetchConfig.params = cleanForm;
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