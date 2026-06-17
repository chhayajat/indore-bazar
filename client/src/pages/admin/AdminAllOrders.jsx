import { toast } from "react-toastify"
import { getAllOrders } from "../../features/admin/adminSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminHeader from "../../components/admin/AdminHeader"

function AdminAllOrders() {

    const { user } = useSelector(state => state.auth)
    const { adminLoading, adminError, adminSuccess, adminErrorMessage, allOrders } = useSelector(state => state.admin)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        if (user?.isAdmin) {
            // Api Calls
            dispatch(getAllOrders())
        }

        if (!user.isAdmin || !user) {
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

                <div className="p-8 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option>All Status</option>
                            <option>Placed</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                            <option>Pending</option>
                        </select>
                        <input
                            type="date"
                            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Shop Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Payment Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {
                                    allOrders.map(order => {
                                        return (
                                            <tr key={order._id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">#{order._id[0] + order._id[order._id.length - 3] + order._id[order._id.length - 2] + order._id[order._id.length - 1]}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{order.user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{order.shop.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">${order.totalBillAmount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === "delivered" ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status === "delivered" ? "Paid" : "Not Paid"}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === "cancelled" ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>{order.status.toUpperCase()}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString('EN-IN')}</td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminAllOrders;

