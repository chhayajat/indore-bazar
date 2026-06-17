import { Plus, Search, Filter, Edit } from 'lucide-react';
import ShopOwnerLayout from '../../components/shop/ShopOwnerLayout';
import LoadingScreen from '../../components/LoadingScreen';
import { toast } from 'react-toastify';
import { getAllCoupons } from '../../features/shop/shopSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AddCouponModal from '../../components/shop/AddCouponModal';

function ShopCoupons() {

    const [showModal, setShowModal] = useState(false)


    const { shopLoading, shopSuccess, shopError, shopErrorMessage, shopCoupons } = useSelector(state => state.shop)

    const dispatch = useDispatch()

    const handleModal = () => {
        setShowModal(showModal ? false : true)
    }



    useEffect(() => {

        dispatch(getAllCoupons())


        if (shopError && shopErrorMessage) {
            toast.error(shopError, { position: "top-center" })
        }

    }, [shopError, shopErrorMessage])


    if (shopLoading) {
        return <LoadingScreen loadingMessage='Shop Profile Loading...' />
    }









    return (
        <ShopOwnerLayout activePage="Coupons">
            {
                showModal && <AddCouponModal showModal={showModal} handleModal={handleModal} />
            }
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search coupons..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                        <Filter className="w-5 h-5 text-slate-600 mr-2" />
                        <span className="text-sm font-medium text-slate-700">Filter</span>
                    </button>

                    <button onClick={handleModal} className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                        <Plus className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Create Coupon</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Coupon Code</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Discount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Created At</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">

                            {
                                shopCoupons.map(coupon => {
                                    return (
                                        <tr key={coupon._id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div className="font-mono font-medium text-slate-900">{coupon.couponCode}</div>
                                                <div className="text-sm text-slate-500">{coupon.shop}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-emerald-600">{coupon.couponDiscount}% Off</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-700">{new Date(coupon.createdAt).toLocaleDateString('en-IN')}</span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                                                    {coupon.isActive ? "Active" : "Disabled"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg">
                                                    <Edit className="w-5 h-5 text-slate-600" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }



                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                        Showing <span className="font-medium">8</span> coupons
                    </div>
                </div>
            </div>
        </ShopOwnerLayout>
    );
}

export default ShopCoupons;
