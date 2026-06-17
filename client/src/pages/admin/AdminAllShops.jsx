import { toast } from "react-toastify";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { getAllShops, shopUpdate } from "../../features/admin/adminSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminAllShops() {

    const { user } = useSelector(state => state.auth)
    const { adminLoading, adminError, adminSuccess, adminErrorMessage, allShops } = useSelector(state => state.admin)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleShopUpdate = (shopDetails) => {
        dispatch(shopUpdate(shopDetails))
    }



    useEffect(() => {

        if (user?.isAdmin) {
            // Api Calls
            dispatch(getAllShops())
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
                        <h1 className="text-2xl font-bold text-slate-800">Shops</h1>
                    </div>
                    <div>
                        <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option>All Status</option>
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Shop Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Owner Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {
                                    allShops.map(shop => {
                                        return (
                                            <tr key={shop._id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{shop.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{shop.user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{shop.address}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${shop.status === "accepted" ? 'bg-emerald-100 text-emerald-800' : shop.status === "rejected" ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{shop.status.toUpperCase()}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{new Date(shop.createdAt).toLocaleDateString('en-IN')}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex gap-2">

                                                        <button onClick={() => handleShopUpdate({ shopId: shop._id, status: shop.status === "accepted" ? "rejected" : "accepted" })} className={`cursor-pointer ${shop.status === "accepted" ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}  font-medium`}>{shop.status === "accepted" ? "Disable" : "Activate"}</button>

                                                    </div>
                                                </td>
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

export default AdminAllShops;

