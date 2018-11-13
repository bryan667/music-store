import axios from 'axios'
import { USERS_SERVER } from '../../components/utils/misc'  //'/api/users'
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from './type'  //string 'login_user'

export function loginUser(dataToSubmit){

    const request = axios.post(`${USERS_SERVER}/login`, dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){

    const request = axios.post(`${USERS_SERVER}/register`, dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USERS_SERVER}/auth`)
        .then(response => response.data)

        return {
            type: AUTH_USER,
            payload: request
        }
}

export function logoutUser() {
    const request = axios.get(`${USERS_SERVER}/logout`)
        .then(response => response.data)

        return {
            type: LOGOUT_USER,
            payload: request
        }
}