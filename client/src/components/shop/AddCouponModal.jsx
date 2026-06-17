import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, createCoupon, getMyShopDetails, updateProduct } from "../../features/shop/shopSlice"

const AddCouponModal = ({ showModal, handleModal }) => {

    const dispatch = useDispatch()


    const { shop } = useSelector(state => state.shop)



    const [formData, setFormData] = useState({
        couponCode: "",
        couponDiscount: "",
        isActive: true,
    })



    const { couponCode, couponDiscount, isActive } = formData

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createCoupon(formData))
        handleModal()
    }



    useEffect(() => {




    }, [])


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto animate-in fade-in zoom-in duration-200">
                {/* Modal Header */}
                <div className="flex items-start justify-between p-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Add New Product</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Enter the details below to add a new item to your shop inventory.
                        </p>
                    </div>
                    <button onClick={handleModal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                        <span className="sr-only">Close</span>
                    </button>
                </div>

                {/* Modal Body / Form */}
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(100vh-200px)] space-y-6">
                    {/* Basic Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">



                        <div className="col-span-1 md:col-span-2 hidden">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Shop Id : </label>
                            <input

                                name="shopId"
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. Fresh Organic Tomatoes"
                                className="disabled:bg-gray-300 w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div> <div className="col-span-1 md:col-span-2 hidden">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Shop Id : </label>
                            <input

                                name="shopId"
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. Fresh Organic Tomatoes"
                                className="disabled:bg-gray-300 w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Coupon Code : </label>
                            <input
                                value={couponCode}
                                name="couponCode"
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. GET50"
                                className="disabled:bg-gray-300 w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Discount In Percent : </label>
                            <input
                                value={couponDiscount}
                                name="couponDiscount"
                                onChange={handleChange}
                                type="number"
                                placeholder="e.g. 50"
                                className="disabled:bg-gray-300 w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>




                    </div>



                    <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50/30">
                        <button onClick={handleModal} className="px-5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200">
                            Add Coupon
                        </button>
                    </div>
                </form>

                {/* Modal Footer */}
            </div>
        </div>
    )
}

export default AddCouponModal
