import { config } from '../../../config'
import axios from 'axios'

const apiBaseUrl = config.backEndUrl + config.apiBaseUrl + '/product'

export const getOptions = async () => {
    const results = await axios.get(`${apiBaseUrl}/options`)
    return results
}

export const saveOption = async (option) => {
    const results = await axios.post(`${apiBaseUrl}/options`, option)
    return results
}

export const removeOption = async (option) => {
    const results = await axios.delete(`${apiBaseUrl}/options`, option)
    return results
}

export const saveOptionValue = async (optionValue) => {
    const results = await axios.post(`${apiBaseUrl}/options-value`, optionValue)
    console.log(results)
    return results
}
