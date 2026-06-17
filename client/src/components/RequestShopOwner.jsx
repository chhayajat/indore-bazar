import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { becomeShopOwner } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import LoadingScreen from './LoadingScreen'

const RequestShopOwner = () => {

    const { shopStatus, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)


    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        shopPhone: ""
    })


    const { name, description, address, shopPhone } = formData

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })


    }


    const handleSubmit = (e) => {

        e.preventDefault()
        dispatch(becomeShopOwner(formData))

        if (shopStatus) {
            toast.success("Shop Approval Request Sent!", { position: "top-center" })
        }

    }



    useEffect(() => {

        if (isError && message) {
            toast.error(message, { position: "top-center" })
        }

    }, [isError, message])


    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }




    return (
        <div
            id="shop-owner-modal"
            className="fixed inset-0 z-50 hidden items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
            style={{ backgroundColor: "rgba(15, 23, 42, 0.4)" }}
        >
            <div className="relative w-full max-w-lg scale-95 overflow-hidden rounded-2xl bg-white shadow-2xl transition-all animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h2 className="text-xl font-bold text-slate-900">Apply for Shop Ownership</h2>
                    <button
                        type="button"
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        onClick={() => {
                            const modal = document.getElementById("shop-owner-modal")
                            if (modal) modal.style.display = "none"
                        }}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <div className="space-y-1.5">
                        <label htmlFor="shop-name" className="text-sm font-semibold text-slate-700">
                            Shop Name
                        </label>
                        <input
                            id="shop-name"
                            type="text"
                            name='name'
                            value={name}
                            onChange={handleChange}
                            placeholder="e.g. Indore Sweets & Snacks"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="shop-desc" className="text-sm font-semibold text-slate-700">
                            Shop Description
                        </label>
                        <textarea
                            name='description'
                            value={description}
                            onChange={handleChange}
                            id="shop-desc"
                            rows={3}
                            placeholder="Tell us about your business..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="shop-addr" className="text-sm font-semibold text-slate-700">
                            Shop Address
                        </label>
                        <input
                            name='address'
                            value={address}
                            onChange={handleChange}
                            id="shop-addr"
                            type="text"
                            placeholder="Full physical address"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="shop-phone" className="text-sm font-semibold text-slate-700">
                            Shop Phone Number
                        </label>
                        <input
                            name='shopPhone'
                            value={shopPhone}
                            onChange={handleChange}
                            id="shop-phone"
                            type="tel"
                            placeholder="+91 00000 00000"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-50"
                        />
                    </div>

                    <div className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-6">
                        <button
                            type="button"
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
                            onClick={() => {
                                const modal = document.getElementById("shop-owner-modal")
                                if (modal) modal.style.display = "none"
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-95"            >
                            Request Approval
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RequestShopOwner
