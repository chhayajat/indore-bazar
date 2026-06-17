import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders, getAllShops, getAllUsers } from "../../features/admin/adminSlice";
import ShopApprovalListGroup from "../../components/admin/ShopApprovalListGroup";
import { toast } from "react-toastify";

function AdminDashboard() {

    const { user } = useSelector(state => state.auth)
    const { adminLoading, adminError, adminSuccess, adminErrorMessage, allUsers, allOrders, allShops } = useSelector(state => state.admin)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        if (user?.isAdmin) {
            // Api Calls
            dispatch(getAllUsers())
            dispatch(getAllOrders())
            dispatch(getAllShops())
        }

        if (!user?.isAdmin) {
            navigate("/login")
        }

        if (adminError && adminErrorMessage) {
            toast.error(adminErrorMessage, { position: "top-center" })
        }


    }, [user, adminError, adminErrorMessage])

    if (adminLoading) {
        return (
            <div className="text-center my-6 text-6xl font-bold">Loading...</div>
        )
    }


    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <AdminSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader />

                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+12%</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-1">Total Users</p>
                                <p className="text-3xl font-bold text-slate-800">{allUsers?.length}</p>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">+8%</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-1">Total Orders</p>
                                <p className="text-3xl font-bold text-slate-800">{allOrders?.length}</p>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">+23%</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-1">Total Shops</p>
                                <p className="text-3xl font-bold text-slate-800">{allShops?.length}</p>
                            </div>

                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded">Urgent</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-1">Pending Approvals</p>
                                <p className="text-3xl font-bold text-slate-800">{allShops.filter(shop => shop.status !== "accepted").length}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Orders</h3>
                                <div className="space-y-4">
                                    {
                                        allOrders.map(order => {
                                            return (
                                                <div key={order._id} className="flex items-center justify-between pb-4 border-b border-slate-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-sm font-medium text-slate-600">
                                                            #{order._id[0]}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-800">{order?.user?.name}</p>
                                                            <p className="text-xs text-slate-500">{order?.shop?.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-slate-800">₹{order?.totalBillAmount}</p>
                                                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{order.status}</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <ShopApprovalListGroup allShops={allShops} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
