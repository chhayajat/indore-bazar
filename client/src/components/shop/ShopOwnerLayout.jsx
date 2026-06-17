import { Home, Package, ShoppingBag, Tag, Store, Settings, Menu, Bell, User, ArrowBigLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyShopDetails } from '../../features/shop/shopSlice';

function ShopOwnerLayout({ children, activePage = 'Dashboard' }) {

    const { user } = useSelector(state => state.auth)
    const { shop } = useSelector(state => state.shop)



    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex">
                <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-slate-900 text-white">
                    <div className="flex items-center h-16 px-6 border-b border-slate-800">
                        <Store className="w-8 h-8 text-emerald-500" />
                        <span className="ml-3 text-xl font-bold">Indore Bazar</span>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <Link to="/shop/dashboard" className={`flex items-center px-4 py-3 rounded-lg transition ${activePage === 'Dashboard' ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                            <Home className="w-5 h-5" />
                            <span className="ml-3">Dashboard</span>
                        </Link>

                        <Link to={"/shop/products"} href="#" className={`flex items-center px-4 py-3 rounded-lg transition ${activePage === 'Products' ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                            <Package className="w-5 h-5" />
                            <span className="ml-3">My Products</span>
                        </Link>

                        <Link to="/shop/orders" className={`flex items-center px-4 py-3 rounded-lg transition ${activePage === 'Orders' ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                            <ShoppingBag className="w-5 h-5" />
                            <span className="ml-3">Orders</span>
                        </Link>

                        <Link to="/shop/coupons" className={`flex items-center px-4 py-3 rounded-lg transition ${activePage === 'Coupons' ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                            <Tag className="w-5 h-5" />
                            <span className="ml-3">Coupons</span>
                        </Link>

                        <Link to="/shop/profile" className={`flex items-center px-4 py-3 rounded-lg transition ${activePage === 'Shop Profile' ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                            <Store className="w-5 h-5" />
                            <span className="ml-3">Shop Profile</span>
                        </Link>

                        <Link to="/" className={`flex items-center px-4 py-3 rounded-lg transition ${activePage === 'Settings' ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
                            <ArrowBigLeft className="w-5 h-5" />
                            <span className="ml-3">Back</span>
                        </Link>
                    </nav>
                </aside>

                <div className="flex-1 lg:pl-64">
                    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 h-16">
                        <div className="flex items-center justify-between h-full px-4 lg:px-8">
                            <div className="flex items-center">
                                <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
                                    <Menu className="w-6 h-6 text-slate-700" />
                                </button>
                                <h1 className="ml-2 lg:ml-0 text-xl lg:text-2xl font-bold text-slate-900">{activePage}</h1>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="hidden md:flex items-center px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                                    <Store className="w-4 h-4 text-emerald-600" />
                                    <span className="ml-2 text-sm font-medium text-emerald-700">{shop.name}</span>
                                </div>

                                <button className="relative p-2 rounded-lg hover:bg-slate-100">
                                    <Bell className="w-6 h-6 text-slate-700" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>

                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="text-sm font-medium text-slate-900">{user?.name}</div>
                                        <div className="text-xs text-slate-500">Shop Owner</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="p-4 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ShopOwnerLayout;
