import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { getAllUsers, userUpdate } from "../../features/admin/adminSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

function AdminAllUsers() {

    const { user } = useSelector(state => state.auth)
    const { adminLoading, adminError, adminSuccess, adminErrorMessage, allUsers } = useSelector(state => state.admin)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleUpdateUser = (userDetails) => {
        dispatch(userUpdate(userDetails))
    }



    useEffect(() => {

        if (user?.isAdmin) {
            // Api Calls
            dispatch(getAllUsers())
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
                <div className="mb-6 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Users</h1>
                        <p className="text-sm text-slate-500 mt-1">Manage all platform users and their access</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <select className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                            <option>All Roles</option>
                            <option>User</option>
                            <option>Shop Owner</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email / Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {
                                    allUsers.map(user => {
                                        return (
                                            <tr key={user._id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.isShopOwner ? "Shop Owner" : "Customer"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>{user.isActive ? "Active" : "InActive"}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{new Date(user.createdAt).toLocaleDateString("EN-IN")}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <div className="flex gap-2">
                                                        {
                                                            user.isActive ? (
                                                                <button onClick={() => handleUpdateUser({ userId: user._id, isActive: false })} className="text-red-600 hover:text-red-800 font-medium">Deactivate</button>
                                                            ) : (
                                                                <button onClick={() => handleUpdateUser({ userId: user._id, isActive: true })} className="text-emerald-600 hover:text-emerald-800 font-medium">Activate</button>
                                                            )
                                                        }
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

export default AdminAllUsers;



