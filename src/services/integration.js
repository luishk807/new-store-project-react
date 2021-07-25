import axios from 'axios'
import { config } from '../../config'
import { getAuthorizationHeader } from '../utils/auth'

const baseUrl = config.backEndUrl + '/integration'

export function getQuickbooksStatus() {
    return axios.get(`${baseUrl}/qb/auth/status`, { headers: getAuthorizationHeader() });
}

export function getQuickbooksAuthUri() {
    return axios.get(`${baseUrl}/qb/auth/uri`, { headers: getAuthorizationHeader() });
}

export function disconnectQuickbooks() {
    return axios.get(`${baseUrl}/qb/auth/disconnect`, { headers: getAuthorizationHeader() });
}
