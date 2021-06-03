import { config } from '../../../config'
import axios from 'axios'

const apiProductBaseUrl = config.backEndUrl + config.apiBaseUrl + '/product'
const apiBaseUrl = config.backEndUrl + config.apiBaseUrl + '/stock'

export const getStock = ({ productId, variantId }) => {
    let url = apiProductBaseUrl
    if (productId && !variantId) {
        url += `/${productId}/stock`
    } else {
        url += `/variant/${variantId}/stock`
    }
    return axios.get(url)
}

export const getAllStocks = (params) => {
    return axios.get(`${apiBaseUrl}?skip=${params.skip}&take=${params.take}`)
}

export const addStockEntry = async (stockEntry) => {
    if (stockEntry) {
        try {
            const results = await axios.post(`${apiBaseUrl}/entry`, stockEntry)
            return results
        } catch (err) {
            console.log(err)
        }
    }
    return { error: 'No stock entry provided to add' }
}

export const uploadStockImport = async (file) => {
    if (file) {
        const formData = new FormData()
        formData.append('import', file)
        try {
            const results = await axios.post(`${apiBaseUrl}/import`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
            return results
        } catch (err) {
            console.log(err)
        }
    }
}
