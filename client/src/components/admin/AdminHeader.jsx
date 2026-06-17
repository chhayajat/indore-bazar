import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../features/auth/authSlice'

const AdminHeader = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        dispatch(logoutUser())
        navigate("/")
    }


    return (
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button className="md:hidden text-slate-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative text-slate-600 hover:text-slate-800">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-slate-800">Admin User</p>
                        <p className="text-xs text-slate-500">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                        AU
                    </div>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">Logout</button>
                </div>
            </div>
        </header >
    )
}

export default AdminHeader
