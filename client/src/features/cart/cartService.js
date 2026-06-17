import axios from "axios"

const BASE_URL = ""

const addToCart = async (cartItem, token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${BASE_URL}/api/cart`, cartItem, options)
    return response.data

}

const fetchCart = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${BASE_URL}/api/cart`, options)
    return response.data

}

const removeItemFromCart = async (pid, token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${BASE_URL}/api/cart/${pid}`, options)
    return response.data

}

const updateItemFromCart = async (cartDetails, token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${BASE_URL}/api/cart/${cartDetails.cid}`, cartDetails, options)
    return response.data

}

const placeOrder = async (couponCode, token) => {



    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${BASE_URL}/api/orders`, couponCode, options)
    return response.data

}


const cartService = { addToCart, fetchCart, removeItemFromCart, updateItemFromCart, placeOrder }


export default cartService