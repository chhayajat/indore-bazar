import { Package, ShoppingBag, DollarSign, Tag, TrendingUp, TrendingDown, IndianRupee } from 'lucide-react';
import ShopOwnerLayout from '../../components/shop/ShopOwnerLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/LoadingScreen';
import { getAllCoupons, getAllProducts, getMyShopDetails, getMyShopOrders } from '../../features/shop/shopSlice';

function ShopDashboard() {


    const { user } = useSelector(state => state.auth)
    const { shop, shopLoading, shopSuccess, shopError, shopErrorMessage, shopProducts, shopOrders, shopCoupons } = useSelector(state => state.shop)

    const dispatch = useDispatch()


    // Revenue

    const totalRevenue = shopOrders.reduce((acc, order) => acc + order.totalBillAmount, 0)




    const fetchData = () => {

        // Api Call
        dispatch(getMyShopDetails())
        setTimeout(() => {
            dispatch(getAllProducts())
        }, 100)
        setTimeout(() => {
            dispatch(getMyShopOrders())
        }, 200)
        setTimeout(() => {
            dispatch(getAllCoupons())
        }, 300)


    }



    useEffect(() => {


        fetchData()

        if (shopError && shopErrorMessage) {
            toast.error(shopError, { position: "top-center" })
        }

    }, [shopError, shopErrorMessage])


    if (shopLoading) {
        return <LoadingScreen loadingMessage='Shop Profile Loading...' />
    }


    return (
        <ShopOwnerLayout activePage="Dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-100 rounded-lg">
                            <Package className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex items-center text-sm text-emerald-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>12%</span>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{shopProducts.length}</div>
                    <div className="text-sm text-slate-500 mt-1">Total Products</div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-sky-100 rounded-lg">
                            <ShoppingBag className="w-6 h-6 text-sky-600" />
                        </div>
                        <div className="flex items-center text-sm text-emerald-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>8%</span>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{shopOrders.length}</div>
                    <div className="text-sm text-slate-500 mt-1">Total Orders</div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-emerald-100 rounded-lg">
                            <IndianRupee className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex items-center text-sm text-red-600">
                            <TrendingDown className="w-4 h-4 mr-1" />
                            <span>3%</span>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">₹{totalRevenue}</div>
                    <div className="text-sm text-slate-500 mt-1">Today's Revenue</div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-amber-100 rounded-lg">
                            <Tag className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex items-center text-sm text-emerald-600">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span>5%</span>
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{shopCoupons.length}</div>
                    <div className="text-sm text-slate-500 mt-1">Active Coupons</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Orders</h3>
                    <div className="space-y-4">

                        {
                            shopOrders.map(order => {
                                return (
                                    <div key={order._id} className="flex items-center justify-between pb-4 border-b border-slate-100">
                                        <div>
                                            <div className="font-medium text-slate-900">#ORD-{order._id[0] + order._id[1] + order._id[2] + order._id[3]}</div>
                                            <div className="text-sm text-slate-500">{order.user.name}</div>
                                            <div className="text-sm text-slate-500">{order.user.email}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-slate-900">₹{order.totalBillAmount}</div>
                                            <div className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full mt-1">
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Selling Products</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-slate-900">Organic Bananas</div>
                                <div className="text-sm text-slate-500">342 sold</div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-emerald-600">$1,368</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-slate-900">Fresh Milk</div>
                                <div className="text-sm text-slate-500">289 sold</div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-emerald-600">$1,156</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-slate-900">Whole Wheat Bread</div>
                                <div className="text-sm text-slate-500">267 sold</div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-emerald-600">$934</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-slate-900">Chicken Breast</div>
                                <div className="text-sm text-slate-500">198 sold</div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-emerald-600">$1,782</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-slate-900">Greek Yogurt</div>
                                <div className="text-sm text-slate-500">176 sold</div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold text-emerald-600">$704</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopOwnerLayout>
    );
}

export default ShopDashboard;
