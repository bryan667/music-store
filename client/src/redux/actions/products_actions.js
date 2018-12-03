import axios from 'axios'
import { PRODUCTS_SERVER } from '../../components/utils/misc'
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL } from './type'

export function getProductsBySell () {
    //?sortBy=sold&order=desc&limit=4
    const request = axios.get(`${PRODUCTS_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
                    .then(response => response.data)

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }

}

export function getProductsByArrival () {

    //?sortBy=createdAt&order=desc&limit=4

    const request = axios.get(`${PRODUCTS_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data)

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }

}
