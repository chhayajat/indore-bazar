import { Search, Filter, Eye } from 'lucide-react';
import ShopOwnerLayout from '../../components/shop/ShopOwnerLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getMyShopOrders } from '../../features/shop/shopSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import OrderDetailsModal from '../../components/shop/OrderDetailsModal';

function ShopOrders() {


    const { user } = useSelector(state => state.auth)
    const { shopLoading, shopSuccess, shopError, shopErrorMessage, shopOrders } = useSelector(state => state.shop)

    const dispatch = useDispatch()

    const [showOrderDetails, setShowOrderDetails] = useState(false)
    const [orderDetails, setOrderDetails] = useState(null)


    const handleOrderDetails = (orderDetails) => {
        setOrderDetails(orderDetails)
        setShowOrderDetails(showOrderDetails ? false : true)

    }


    useEffect(() => {

        dispatch(getMyShopOrders())


        if (shopError && shopErrorMessage) {
            toast.error(shopError, { position: "top-center" })
        }

    }, [shopError, shopErrorMessage])


    if (shopLoading) {
        return <LoadingScreen loadingMessage='Shop Profile Loading...' />
    }






    return (
        <ShopOwnerLayout activePage="Orders">

            {
                showOrderDetails && <OrderDetailsModal handleOrderDetails={handleOrderDetails} orderDetails={orderDetails} />
            }

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                        <Filter className="w-5 h-5 text-slate-600 mr-2" />
                        <span className="text-sm font-medium text-slate-700">Filter</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Order ID</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Items Count</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Total Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Payment Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Order Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {
                                shopOrders.map(order => {
                                    return (
                                        <tr key={order._id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-slate-900">#ORD-{order._id[0] + order._id[1] + order._id[2] + order._id[3]}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="font-medium text-slate-900">{order.user.name}</div>
                                                    <div className="text-sm text-slate-500">{order.user.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-700">{order.products.length} items</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-medium text-slate-900">₹{order.totalBillAmount}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-3 py-1 text-xs font-medium ${order.status === "cancelled" ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'} rounded-full`}>
                                                    {order.status === "cancelled" ? "Cancelled" : "Paid"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-3 py-1 text-xs font-medium ${order.status === "delivered" ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} rounded-full`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleOrderDetails(order)} className="p-2 hover:bg-slate-100 rounded-lg">
                                                    <Eye className="w-5 h-5 text-slate-600" />
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
                        Showing <span className="font-medium">1-8</span> of <span className="font-medium">1,429</span> orders
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

export default ShopOrders;
