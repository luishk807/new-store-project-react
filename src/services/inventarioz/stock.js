import { config } from '../../../config'
import axios from 'axios'

const apiBaseUrl = config.backEndUrl + config.apiBaseUrl + '/product'

export const getStock = ({ productId, variantId }) => {
    let url = apiBaseUrl
    if (productId && !variantId) {
        url += `/${productId}/stock`
    } else {
        url += `/variant/${variantId}/stock`
    }
    return axios.get(url)
}
