import axios from 'axios'
import { USERS_SERVER } from '../../components/utils/misc'  //'/api/users'
import { LOGIN_USER } from './type'  //string 'login_user'

export function loginUser(dataToSubmit){

    const request = axios.post(`${USERS_SERVER}/login`, dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}