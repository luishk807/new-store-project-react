import { config } from '../../../config'
import axios from 'axios'

const apiBaseUrl = config.backEndUrl + config.apiBaseUrl + '/category'

export const getCategories = async () => {
    const results = await axios.get(`${apiBaseUrl}`)
    return results
}

export const saveCategory = async (value) => {
    const results = await axios.post(`${apiBaseUrl}`, value)
    return results
}
