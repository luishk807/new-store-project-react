import { config } from '../../../config'
import axios from 'axios'

const apiBaseUrl = config.backEndUrl + config.apiBaseUrl + '/client'

export const searchClient = async (query) => {
    const results = await axios.get(`${apiBaseUrl}?q=${query}`)
    return results
}

export const getClient = (id) => {
    return axios.get(`${apiBaseUrl}/${id}`)
}

export const saveClient = async (client) => {
    const results = await axios.post(`${apiBaseUrl}`, client)
    return results
}
