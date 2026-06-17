import { MapPin, Phone, Package, ShoppingCart, ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen"
import { getProducts, getProductShop } from "../features/product/productSlice"
import { toast } from "react-toastify"

export default function ShopDetailsPage() {



    const { sid } = useParams()

    const { products, productShop, productLoading, productSuccess, productError, productErrorMessage } = useSelector(state => state.product)

    const dispatch = useDispatch()


    const shopProducts = products?.filter((product => product.shop?._id === productShop?._id))

    useEffect(() => {
        dispatch(getProductShop(sid))
        dispatch(getProducts())

        if (productError && productErrorMessage) {
            toast.error(productErrorMessage)
        }



    }, [productError, productErrorMessage, sid])


    if (productLoading) {
        return <LoadingScreen />
    }





    if (!productShop) {
        return (
            <div className="min-h-screen bg-white">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <p className="text-gray-600">Shop not found</p>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        to="/marketplace"
                        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Shops
                    </Link>
                </div>

                {/* Shop Hero Section */}
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-8 mb-12">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Package size={32} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-900">{productShop.name}</h1>
                                    <p className="text-gray-600 mt-2 text-lg">{productShop.description}</p>
                                </div>
                            </div>

                            {/* Shop Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <div className="text-2xl font-bold text-teal-600">★ 5.0</div>
                                    <p className="text-sm text-gray-600 mt-1">Rating</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <div className="text-2xl font-bold text-gray-900">{shopProducts.length}</div>
                                    <p className="text-sm text-gray-600 mt-1">Products</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <div className="text-2xl font-bold text-gray-900">{Math.floor(Math.random() * 20 + 10)} Min</div>
                                    <p className="text-sm text-gray-600 mt-1">Delivery</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                                    <p className="text-sm text-gray-600 mt-1">Available</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shop Contact Info */}
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                            <MapPin size={20} className="text-teal-600 flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-xs font-semibold text-gray-600 uppercase">Address</p>
                                <p className="text-sm text-gray-900 mt-1">{productShop.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                            <Phone size={20} className="text-teal-600 flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-xs font-semibold text-gray-600 uppercase">Phone</p>
                                <p className="text-sm text-gray-900 mt-1">{productShop.shopPhone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Products from {productShop.name}</h2>
                        <div className="text-sm text-gray-600">Showing {shopProducts.length} products</div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {shopProducts.length > 0 ? (
                            shopProducts.map((product) => (
                                <div
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
                                        <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">{product.category}</p>
                                        <h3 className="text-sm font-semibold text-gray-900 mt-2 line-clamp-2 group-hover:text-teal-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">{product.description}</p>

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
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600 text-lg">No products available from this shop yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

        </div>
    )
}
