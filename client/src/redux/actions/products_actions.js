import axios from 'axios'
import { PRODUCTS_SERVER } from '../../components/utils/misc'
import { 
    GET_PRODUCTS_BY_SELL, 
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS,
    GET_PRODUCTS_TO_SHOP
} from './type'

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

export function getProductsToShop (skip, limit, filters = [], previousState=[]) {
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${PRODUCTS_SERVER}/shop`, data)
    .then(response => {
        let newState = [
            ...previousState,
            ...response.data.articles
        ]

        return {
            size: response.data.size,
            articles: newState
        }
    })

    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
}

//====================================//
//             CATEGORIES
//====================================//


export function getBrands() {
    const request = axios.get(`${PRODUCTS_SERVER}/get_brands`)
    .then(response => response.data)

    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function getWoods() {
    const request = axios.get(`${PRODUCTS_SERVER}/get_woods`)
    .then(response => response.data)

    return {
        type: GET_WOODS,
        payload: request
    }
}