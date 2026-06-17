import { X, Package, CreditCard, MapPin, Phone, Mail, User } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux"
import { updateOrder } from '../../features/shop/shopSlice';
import LoadingScreen from '../LoadingScreen';
import { cancelOrder } from '../../features/auth/authSlice';

function OrderDetailsModal({ handleOrderDetails, orderDetails }) {

    const { user } = useSelector(state => state.auth)


    const dispatch = useDispatch()

    const handleOrderUpdate = (orderDetails) => {

        if (user.isShopOwner) {
            dispatch(updateOrder(orderDetails))
        } else {
            dispatch(cancelOrder(orderDetails))
        }

        handleOrderDetails(null)
    }


    const orderData = {
        orderId: orderDetails?._id,
        orderDate: new Date(orderDetails?.createdAt).toLocaleDateString('en-IN'),
        status: orderDetails?.status,
        paymentStatus: orderDetails?.status === "cancelled" ? "Cancelled" : 'paid',
        customer: {
            name: orderDetails?.user.name,
            email: orderDetails?.user.email,
            phone: orderDetails?.user.phone,
            address: orderDetails?.user.address
        },
        items: orderDetails?.products,
        subtotal: orderDetails?.products.reduce((acc, product) => acc + product.purchasedPrice * product.qty, 0),
        discount: orderDetails?.products.reduce((acc, product) => acc + product.purchasedPrice * product.qty, 0) - orderDetails?.totalBillAmount
    };

    const total = orderData.subtotal + orderData.deliveryCharges;

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            dispatched: 'bg-blue-100 text-blue-700 border-blue-200',
            cancelled: 'bg-red-100 text-red-700 border-red-200',
            delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200'
        };
        return badges || badges.pending;
    };

    const getPaymentBadge = (status) => {
        return status === 'paid'
            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
            : 'bg-red-100 text-red-700 border-red-200';
    };


    if (!orderDetails) {
        return (
            <LoadingScreen />
        )
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl transform transition-all duration-300 animate-in zoom-in-95 overflow-hidden flex flex-col">

                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            <span className="text-sm font-semibold text-gray-600">{orderData.orderId}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="text-sm text-gray-500">{orderData.orderDate}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleOrderDetails}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Full Name</p>
                                    <p className="text-sm font-medium text-gray-900">{orderData.customer.name}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Email</p>
                                        <p className="text-sm text-gray-900">{orderData.customer.email}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                                        <p className="text-sm text-gray-900">{orderData.customer.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Delivery Address</p>
                                        <p className="text-sm text-gray-900 leading-relaxed">{orderData.customer.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
                            <Package className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {orderData?.items.map((item) => (
                                <div key={item.product._id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">Quantity: {item.qty}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm font-semibold text-gray-900">₹{item.product.price * item.qty}</p>
                                            <p className="text-xs text-gray-500 mt-1">₹{item.product.price} each</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-gray-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Payment Summary</h3>
                        </div>
                        <div className="px-6 py-4 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium text-gray-900">₹{orderData.subtotal}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-green-600">Discount</span>
                                <span className="font-medium text-green-900">₹{orderData.discount}</span>
                            </div>
                            <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                                <span className="text-base font-semibold text-gray-900">Total Amount</span>
                                <span className="text-xl font-bold text-gray-900">₹{orderData.subtotal - orderData.discount}</span>
                            </div>
                            <div className="pt-2 flex items-center justify-between">
                                <span className="text-sm text-gray-600">Payment Status</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPaymentBadge(orderData.paymentStatus)}`}>
                                    {orderData.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${getStatusBadge(orderData.status)}`}>
                                    {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                                </span>
                            </div>

                            {orderData.status === 'placed' && (
                                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                    {
                                        user.isShopOwner && <button onClick={() => handleOrderUpdate({ id: orderData.orderId, status: "dispatched" })} className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                                            Dispatch Order
                                        </button>
                                    }
                                    <button onClick={() => handleOrderUpdate({ id: orderData.orderId, status: "cancelled" })} className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
                                        Cancel Order
                                    </button>
                                </div>
                            )}

                            {
                                user.isShopOwner && orderData.status === 'dispatched' && (
                                    <div className="mt-4">
                                        <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-3">
                                            <span className="text-2xl">🚚</span>
                                            <p className="text-sm font-medium text-blue-900">Order already dispatched</p>
                                        </div>
                                        <button
                                            onClick={() => handleOrderUpdate({ id: orderData.orderId, status: "delivered" })}
                                            className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg cursor-pointer"
                                        >
                                            Mark As Delievered
                                        </button>
                                    </div>
                                )
                            }

                            {orderData.status === 'cancelled' && (
                                <div className="mt-4">
                                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <span className="text-2xl">❌</span>
                                        <p className="text-sm font-medium text-red-900">Order cancelled</p>
                                    </div>
                                </div>
                            )}

                            {orderData.status === 'delivered' && (
                                <div className="mt-4">
                                    <div className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                                        <span className="text-2xl">✅</span>
                                        <p className="text-sm font-medium text-emerald-900">Order successfully delivered</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsModal;
