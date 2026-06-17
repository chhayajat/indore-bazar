import axios from "axios"

const BASE_URL = ""

const register = async (formData) => {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, formData)
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
}

const login = async (formData) => {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, formData)
    localStorage.setItem("user", JSON.stringify(response.data))
    return response.data
}


const fetchMyOrders = async (token) => {


    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${BASE_URL}/api/orders`, options)
    return response.data


}


const orderCancel = async (token, orderDetails) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${BASE_URL}/api/orders/${orderDetails.id}`, { status: "cancelled" }, options)
    return response.data


}


const requestShopApproval = async (token, shopDetails) => {
    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${BASE_URL}/api/shop-owner/create-shop`, shopDetails, options)
    return response.data

}



const authService = { register, login, fetchMyOrders, orderCancel, requestShopApproval }


export default authService