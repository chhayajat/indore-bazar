import { Plus, Search, Filter, Edit, MoreVertical, Package } from 'lucide-react';
import ShopOwnerLayout from '../../components/shop/ShopOwnerLayout';
import { getAllProducts, productEdit } from '../../features/shop/shopSlice';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/LoadingScreen';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddProductModal from '../../components/shop/AddProductModal';

function ShopOwnerProducts() {



    const { shop, shopLoading, shopSuccess, shopError, shopErrorMessage, shopProducts } = useSelector(state => state.shop)


    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)

    // Handle Modal
    const handleModal = () => {
        setShowModal(showModal ? false : true)
    }


    const handleProductEdit = (product) => {
        dispatch(productEdit(product))
        handleModal()
    }


    useEffect(() => {

        dispatch(getAllProducts())

        if (shopError && shopErrorMessage) {
            toast.error(shopError, { position: "top-center" })
        }

    }, [shopError, shopErrorMessage])


    if (shopLoading) {
        return <LoadingScreen loadingMessage='Shop Profile Loading...' />
    }


    return (
        <ShopOwnerLayout activePage="Products">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                        <Filter className="w-5 h-5 text-slate-600 mr-2" />
                        <span className="text-sm font-medium text-slate-700">Filter</span>
                    </button>

                    <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                        <Plus className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Add Product</span>
                    </button>
                </div>
            </div>

            {
                showModal && <AddProductModal showModal={showModal} handleModal={handleModal} />
            }

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Product Image</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Product Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Category</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Stock</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {
                                shopProducts.map(product => {
                                    return (
                                        <tr key={product._id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div style={{ backgroundImage: `url(${product.productImage})` }} className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center bg-cover bg-center">
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{product.name}</div>
                                                <div className="text-sm text-slate-500">1 Pc</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-700">{product.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-slate-900">₹{product.price}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-700">{product.stock}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                                                    {product.stock < 0 ? "Not Available" : "Available"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleProductEdit(product)} className="p-2 hover:bg-slate-100 rounded-lg">
                                                    <Edit className="w-5 h-5 text-slate-600" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                        Showing <span className="font-medium">1-8</span> of <span className="font-medium">247</span> products
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            Previous
                        </button>
                        <button className="px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium">
                            1
                        </button>
                        <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            2
                        </button>
                        <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            3
                        </button>
                        <button className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </ShopOwnerLayout>
    );
}

export default ShopOwnerProducts;
