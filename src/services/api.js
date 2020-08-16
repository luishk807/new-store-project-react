import axios from 'axios';
import { formatForm } from '../utils/products';

const API_HOST_URL = process.env.BACKEND_URL;

export default class Api {
  static baseUrl = API_HOST_URL+'/api';

  static get(url, param, config, format = "json") {
    return Api.request("GET", url, param, config, format);
  }

  static post(url, param, config, format = "json") {
    return Api.request("POST", url, param, config, format);
  }

  static request(method, url, body, config = {}, format = "json") {
    let apiUrl = url; 

    if (apiUrl.indexOf('http') !== 0) {
      apiUrl = `${config.baseUrl || Api.baseUrl || ''}${apiUrl}`;
    }

    const fetchConfig = {
      method,
      url: apiUrl,
      headers: {
        ...(config || {}),
      },
    };
    const cleanForm = formatForm(body)
    fetchConfig.params = body;
    const request = axios(fetchConfig).then((data) => {
     // console.log('result data', data)
      return data.data;
    }).catch((e) => {
      throw e;
    })

    return request;
  }
}