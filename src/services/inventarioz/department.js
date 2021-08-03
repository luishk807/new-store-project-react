import { config } from 'config'
import axios from 'axios'

const apiBaseUrl = config.backEndUrl + config.apiBaseUrl + '/department'

export const getDepartments = async () => {
    const results = await axios.get(`${apiBaseUrl}`)
    return results
}

export const saveDepartment = async (value) => {
    const results = await axios.post(`${apiBaseUrl}`, value)
    return results
}
