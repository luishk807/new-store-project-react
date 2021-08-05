import { config } from 'config'
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
    return results
}

export const saveProductNoVariant = async (product) => {
    const results = await axios.post(`${apiBaseUrl}`, product)
    return results
}

export const saveProduct = async (product) => {
    const results = await axios.post(`${apiBaseUrl}`, product)
    return results
}

export const saveProductVariant = async (product) => {
    const results = await axios.post(`${apiBaseUrl}`, product)
    return results
}

export const searchProduct = async (query) => {
    const results = await axios.get(`${apiBaseUrl}?q=${query}`)
    return results
}

export const getProduct = (productId) => {
    return axios.get(`${apiBaseUrl}/${productId}`)
}

export const getNoVariant = (product) => {
    if (product) {
        if (product.product_variant && product.product_variant.length) {
            let noVariant = null
            for (let n=0; n<product.product_variant.length; ++n) {
                const pv = product.product_variant[n]
                if (pv.option_id === null && pv.option_value_id === null) {
                    noVariant = pv
                    break
                }
            }
            return noVariant
        }
    }
    return null
}

export const removeProductVariant = async (id) => {
    const results = await axios.delete(`${apiBaseUrl}/variant/${id}`)
    return results
}
