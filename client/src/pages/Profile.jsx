import { User, Mail, Phone, MapPin, Package, Store, X, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyOrders } from "../features/auth/authSlice"
import OrderDetailsModal from "../components/shop/OrderDetailsModal"
import RequestShopOwner from "../components/RequestShopOwner"

export default function ProfilePage() {

    const { user, orders, shopStatus } = useSelector(state => state.auth)

    const [showModal, setShowModal] = useState(false)
    const [orderDetails, setOrderDetails] = useState(null)

    const dispatch = useDispatch()



    const handleOrderDetails = (orderDetails) => {
        setOrderDetails(orderDetails)
        setShowModal(showModal ? false : true)
    }




    useEffect(() => {
        dispatch(getMyOrders())
    }, [])



    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 font-sans text-slate-900">
            {
                showModal && <OrderDetailsModal orderDetails={orderDetails} handleOrderDetails={handleOrderDetails} />
            }
            <div className="mx-auto max-w-5xl space-y-8">
                {/* 1️⃣ Page Header */}
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Profile</h1>
                        <p className="text-slate-500">Manage your account & orders</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white shadow-sm ring-4 ring-indigo-50">
                        {user.name[0]}
                    </div>
                </header>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        {/* 2️⃣ Profile Details Card */}
                        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                            <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
                                <h2 className="flex items-center gap-2 font-semibold text-slate-800">
                                    <User className="h-4 w-4 text-indigo-600" />
                                    Personal Information
                                </h2>
                            </div>
                            <div className="grid gap-6 p-6 md:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Full Name</p>
                                    <p className="font-medium text-slate-700">{user.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Email Address</p>
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Phone Number</p>
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        <span>{user.phone}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Default Address</p>
                                    <div className="flex items-start gap-2 text-slate-700">
                                        <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                                        <span className="leading-tight">{user.address}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3️⃣ Order History Section */}
                        <section className="space-y-4">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                                <Package className="h-5 w-5 text-indigo-600" />
                                My Orders
                            </h2>
                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="border-b border-slate-100 bg-slate-50/50 text-slate-500">
                                            <tr>
                                                <th className="px-6 py-4 font-semibold">Order ID</th>
                                                <th className="px-6 py-4 font-semibold">Date</th>
                                                <th className="px-6 py-4 font-semibold">Amount</th>
                                                <th className="px-6 py-4 font-semibold text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {orders.map((order) => (
                                                <>
                                                    <tr onClick={() => handleOrderDetails(order)} key={order._id} className="group cursor-pointer transition-colors hover:bg-slate-50/50">
                                                        <td className="px-6 py-4 font-medium text-indigo-600">{order._id}</td>
                                                        <td className="px-6 py-4 text-slate-600">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                                                        <td className="px-6 py-4 font-semibold text-slate-800">₹{order.totalBillAmount}</td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span
                                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${order.status === "delivered"
                                                                    ? "bg-emerald-100 text-emerald-700"
                                                                    : "bg-amber-100 text-amber-700"
                                                                    }`}
                                                            >
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-6">
                        {/* 4️⃣ Become a Shop Owner CTA */}
                        <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm ring-1 ring-indigo-100">
                            <div className="relative z-10 space-y-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 shadow-sm">
                                    <Store className="h-6 w-6 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-slate-900">Want to sell on Indore Bazar?</h3>
                                    <p className="text-sm leading-relaxed text-slate-600">
                                        Reach thousands of local customers by listing your products on our platform.
                                    </p>
                                </div>
                                {
                                    shopStatus ? (
                                        <h1 className="text-green-500 font-bold text-xl">You Request Has Been Sent!</h1>
                                    ) : (
                                        <button
                                            type="button"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95"
                                            onClick={() => {
                                                const modal = document.getElementById("shop-owner-modal")
                                                if (modal) modal.style.display = "flex"
                                            }}
                                        >
                                            Become a Shop Owner
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    )
                                }
                            </div>
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-indigo-600/5" />
                        </div>
                    </aside>
                </div>
            </div>

            <RequestShopOwner />

        </div>
    )
}
