import { MapPin, Phone, Clock, Package } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, getProductShops } from "../features/product/productSlice"
import LoadingScreen from "../components/LoadingScreen"
import { toast } from "react-toastify"
import { useEffect } from "react"
import { Link } from "react-router-dom"


export default function AllShops() {

    const { user } = useSelector(state => state.auth)
    const { products, productShops, productLoading, productSuccess, productError, productErrorMessage } = useSelector(state => state.product)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getProductShops())
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
                    <h1 className="text-4xl font-bold text-gray-900">All Shops</h1>
                    <p className="text-gray-600 mt-2">Browse and shop from our trusted partner stores</p>
                </div>

                {/* Filters & Sorting */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600">
                            <option value="">Sort by</option>
                            <option value="rating">Highest Rating</option>
                            <option value="delivery">Fastest Delivery</option>
                            <option value="newest">Newest Shops</option>
                            <option value="products">Most Products</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search shops..."
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                        />
                    </div>
                    <div className="text-sm text-gray-600">Showing {AllShops.length} shops</div>
                </div>

                {/* Shops Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productShops.map((shop) => (
                        <div
                            key={shop._id}
                            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-teal-200 transition-all duration-200"
                        >
                            {/* Shop Icon Background */}
                            <div className="h-20 bg-gradient-to-r from-teal-50 to-teal-100 flex items-center justify-center">
                                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                                    <Package size={24} className="text-white" />
                                </div>
                            </div>

                            {/* Shop Info */}
                            <div className="p-6 flex flex-col">
                                {/* Shop Name & Rating */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                                            {shop.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">{shop.description}</p>
                                    </div>
                                </div>

                                {/* Rating & Products */}
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center gap-1 bg-white border border-gray-300 rounded px-2 py-1">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-sm font-semibold text-gray-900">5.0</span>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-2 mb-3">
                                    <MapPin size={16} className="text-teal-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-gray-600 line-clamp-2">{shop.address}</p>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-2 mb-3">
                                    <Phone size={16} className="text-teal-600 flex-shrink-0" />
                                    <p className="text-xs text-gray-600">{shop.shopPhone}</p>
                                </div>

                                {/* Delivery Time */}
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock size={16} className="text-teal-600 flex-shrink-0" />
                                    <p className="text-xs text-gray-600">24/7 Available</p>
                                </div>

                                {/* Visit Shop Button */}
                                <Link to={`/marketplace/${shop._id}`} className="w-full text-center p-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                                    Visit Shop
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="flex justify-center mt-12">
                    <button className="px-8 py-3 border border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors duration-200">
                        Load More Shops
                    </button>
                </div>
            </main>

            {/* Footer */}
            <fo className="border-t border-gray-200 bg-gray-900 text-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 bg-teal-600 rounded-md"></div>
                                <span className="font-bold">IndoreMart</span>
                            </div>
                            <p className="text-sm text-gray-400">
                                Your trusted multi-shop grocery delivery platform. Fresh products in minutes.
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm mb-4">Company</p>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-sm mb-4">Support</p>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-semibold text-sm mb-4">Partner With Us</p>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Become a Store
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Delivery Partner
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
                        <p>© 2026 IndoreMart. All rights reserved.</p>
                    </div>
                </div>
            </fo>
        </div>
    )
}
