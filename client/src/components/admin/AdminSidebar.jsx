import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../../features/admin/adminSlice'
import { Link, useLocation } from 'react-router-dom'
import { ArrowBigLeftDash } from 'lucide-react'

const AdminSidebar = () => {

    const location = useLocation()


    return (
        <aside className="w-64 bg-slate-900 flex-shrink-0 hidden md:block">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold text-white">SuperAdmin</h1>
                <p className="text-xs text-slate-400 mt-1">Grocery Platform</p>
            </div>

            {/* bg-emerald-600 text-white */}

            <nav className="p-4 space-y-1">
                <Link to={"/admin/dashboard"} className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location.pathname.includes('dashboard') ? 'bg-emerald-600 text-white' : 'text-slate-400'} font-medium`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Dashboard</span>
                </Link>

                <Link to={"/admin/users"} className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location.pathname.includes('users') ? 'bg-emerald-600 text-white' : 'text-slate-400'} font-medium`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Users</span>
                </Link>

                <Link to={"/admin/orders"} className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location.pathname.includes('orders') ? 'bg-emerald-600 text-white' : 'text-slate-400'} font-medium`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Orders</span>
                </Link>

                <Link to={"/admin/shops"} className={`flex items-center gap-3 px-4 py-3 rounded-lg ${location.pathname.includes('shops') ? 'bg-emerald-600 text-white' : 'text-slate-400'} font-medium`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Shops</span>
                </Link>

                <Link to={"/"} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors mt-8">
                    <ArrowBigLeftDash />
                    <span>Back To Home</span>
                </Link>
            </nav>
        </aside>
    )
}

export default AdminSidebar
