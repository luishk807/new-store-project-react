import { getCookie } from './cookie';

export const getAuthorizationHeader = () => {
    const cookie = getCookie();
    const token = cookie && cookie.token ? cookie.token : null;
    return { 'Authorization': `Basic ${token}`}
}
