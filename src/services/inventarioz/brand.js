import { config } from 'config'
import axios from 'axios'

const apiBaseUrl = config.backEndUrl + config.apiBaseUrl + '/brand'

export const getBrands = async () => {
    const results = await axios.get(`${apiBaseUrl}`)
    return results
}

export const saveBrand = async (value) => {
    const results = await axios.post(`${apiBaseUrl}`, value)
    return results
}
