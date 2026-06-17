import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, getMyShopDetails, updateProduct } from "../../features/shop/shopSlice"

const AddProductModal = ({ showModal, handleModal }) => {

    const dispatch = useDispatch()


    const { shop, edit } = useSelector(state => state.shop)



    const [formData, setFormData] = useState({
        name: "",
        description: "",
        productImage: "",
        category: "",
        price: "",
        stock: "",
        shopId: shop._id
    })



    const { name, description, productImage, category, price, stock, shopId } = formData

    const handleChange = (e) => {

        if (e.target.name === 'productImage') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }


    }



    const handleSubmit = (e) => {
        e.preventDefault()

        let formDataToSend = new FormData()
        formDataToSend.append('name', name)
        formDataToSend.append('description', description)
        formDataToSend.append('category', category)
        formDataToSend.append('price', price)
        formDataToSend.append('stock', stock)
        formDataToSend.append('shopId', shopId)
        formDataToSend.append('productImage', productImage)

        !edit.isEdit ?
            dispatch(addProduct(formDataToSend)) :
            dispatch(updateProduct({ _id: edit.product._id, ...formData }))

        setFormData({
            name: "",
            description: "",
            productImage: "",
            category: "",
            price: "",
            stock: "",
            shopId: shop._id
        })


        handleModal()
    }



    useEffect(() => {



        if (edit.isEdit) {
            setFormData(edit?.product)
        }

    }, [edit])


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
                <form encType="multipart/form-data" onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(100vh-200px)] space-y-6">
                    {/* Basic Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div className="col-span-1 md:col-span-2 hidden">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Shop Id : </label>
                            <input
                                value={shopId}
                                name="shopId"
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. Fresh Organic Tomatoes"
                                className="disabled:bg-gray-300 w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Name</label>
                            <input
                                value={name}
                                name="name"
                                onChange={handleChange}
                                type="text"
                                placeholder="e.g. Fresh Organic Tomatoes"
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                            <div className="relative">
                                <select value={category}
                                    name="category"
                                    onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                                    <option value="">Select Category</option>
                                    <option value="vegetables">Vegetables</option>
                                    <option value="fruits">Fruits</option>
                                    <option value="dairy">Dairy & Eggs</option>
                                    <option value="bakery">Bakery</option>
                                    <option value="cloths">Cloths</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                            <textarea
                                name="description"
                                onChange={handleChange}
                                value={description}
                                type="text"
                                placeholder="Product Description"
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Price (₹)</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">₹</span>
                                <input
                                    value={price}
                                    name="price"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Stock Quantity</label>
                            <input
                                value={stock}
                                name="stock"
                                onChange={handleChange}
                                type="number"
                                placeholder="0"
                                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Product Image Section */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Image</label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" x2="12" y1="3" y2="15" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-slate-700">Upload product image</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                            <input
                                name='productImage'
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleChange} type="file" className="text-center" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50/30">
                        <button onClick={handleModal} className="px-5 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200">
                            {edit.isEdit ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </form>

                {/* Modal Footer */}
            </div>
        </div>
    )
}

export default AddProductModal
