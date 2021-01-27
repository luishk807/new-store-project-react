import { config } from '../../../config'
import axios from 'axios'

const apiBaseUrl = config.backEndUrl + config.apiBaseUrl + '/supplier'

export const getSuppliers = async () => {
    const results = await axios.get(`${apiBaseUrl}`)
    return results
}

export const getSupplierById = async (id) => {
    const results = await axios.get(`${apiBaseUrl}/${id}`)
    return results
}

export const addSupplier = async (value) => {
    const results = await axios.post(`${apiBaseUrl}`, value)
    return results
}
