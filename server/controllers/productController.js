import Product from "../models/productModel.js"

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('shop')

        if (!products) {
            res.status(404)
            throw new Error('Products Not Found!')
        }

        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.pid).populate("shop")

        if (!product) {
            res.status(404)
            throw new Error('Product Not Found!')
        }

        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}


const searchProduct = async (req, res, next) => {
    try {
        const query = req.params.query
        const products = await Product.find({
            name: { $regex: query, $options: "i" }
        }).populate("shop")

        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

const productController = { getProduct, getProducts, searchProduct }


export default productController