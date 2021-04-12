import { config } from '../../config'
import axios from 'axios'
import { getCookie } from '../utils/cookie'

const apiBaseUrl = config.backEndUrl + '/product-unified'

const getAuthorizationHeader = () => {
    const cookie = getCookie()
    const token = cookie && cookie.token ? cookie.token : null
    return {'Authorization': `Basic ${token}`}
}

export const search = async (query) => {
    const results = await axios.get(`${apiBaseUrl}?q=${query}`, { headers: { ...getAuthorizationHeader() } })
    return results
}
