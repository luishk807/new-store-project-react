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
