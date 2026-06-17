import { ShoppingCart } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../features/product/productSlice"
import { toast } from "react-toastify"
import LoadingScreen from "../components/LoadingScreen"
import { useEffect } from "react"
import { Link } from "react-router-dom"


export default function ProductsPage() {


    const { products, productShops, productLoading, productSuccess, productError, productErrorMessage } = useSelector(state => state.product)

    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(getProducts())

        if (productError && productErrorMessage) {
            toast.error(productErrorMessage)
        }



    }, [productError, productErrorMessage])


    if (productLoading) {
        return <LoadingScreen />
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Title */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
                    <p className="text-gray-600 mt-2">Browse our collection of fresh products from trusted shops</p>
                </div>

                {/* Filters & Sorting */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600">
                            <option value="">All Categories</option>
                            <option value="fruits">Fruits & Vegetables</option>
                            <option value="dairy">Dairy & Breakfast</option>
                            <option value="snacks">Snacks & Beverages</option>
                            <option value="bakery">Bakery & Sweets</option>
                        </select>
                        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600">
                            <option value="">Sort by</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                    <div className="text-sm text-gray-600">Showing {products.length} products</div>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link to={`/products/${product._id}`}
                            key={product._id}
                            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-teal-200 transition-all duration-200"
                        >
                            {/* Product Image */}
                            <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                                <img
                                    src={product.productImage || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                                {product.stock <= 5 && (
                                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        Low Stock
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-4 flex flex-col">
                                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">{product.shop.name}</p>
                                <h3 className="text-sm font-semibold text-gray-900 mt-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">{product.category}</p>

                                {/* Price & Stock */}
                                <div className="mt-4 flex items-end justify-between">
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
                                        <p className="text-xs text-gray-500 mt-1">{product.stock} in stock</p>
                                    </div>
                                </div>

                                {/* Add Button */}
                                <Link to={`/products/${product._id}`} className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
                                    View Product
                                </Link>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-12">
                    <button className="px-8 py-3 border border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors duration-200">
                        Load More Products
                    </button>
                </div>
            </main>
        </div>
    )
}
