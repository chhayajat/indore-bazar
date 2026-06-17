import Order from "../models/orderModel.js"
import Shop from "../models/shopModel.js"
import User from "../models/userModel.js"

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()

        if (!users) {
            res.status(404)
            throw new Error('Users Not Found!')
        } else {
            res.status(200).json(users)
        }
    } catch (error) {
        next(error)
    }
}

const getAllOrders = async (req, res, next) => {
    try {
        const allOrders = await Order.find().populate("user").populate("products.product").populate("coupon").populate('shop')

        if (!allOrders) {
            res.status(404)
            throw new Error("Orders Not Found!")
        }

        res.status(200).json(allOrders)
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.uid, { isActive: req.body.isActive ? true : false }, { new: true })

        if (!updatedUser) {
            res.status(409)
            throw new Error('User Not Updated')
        }

        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

const getAllShops = async (req, res, next) => {
    try {
        const shops = await Shop.find().populate("user")

        if (!shops) {
            res.status(404)
            throw new Error('Shops Not Found')
        }

        res.status(200).json(shops)
    } catch (error) {
        next(error)
    }
}


const updateShop = async (req, res, next) => {
    try {
        if (!req.body.status) {
            res.status(409)
            throw new Error('Please Tell The Status!')
        }

        let shopId = req.params.sid

        const updatedShop = await Shop.findByIdAndUpdate(shopId, req.body, { new: true })

        if (!updatedShop) {
            res.status(409)
            throw new Error('Shop Cannot Be Activated!')
        }

        // Update The User
        await User.findByIdAndUpdate(updatedShop.user, { isShopOwner: true }, { new: true })

        res.status(200).json(updatedShop)
    } catch (error) {
        next(error)
    }
}



const adminControllers = { getUsers, getAllOrders, updateShop, updateUser, getAllShops }


export default adminControllers