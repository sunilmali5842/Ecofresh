import { Outlet } from "react-router"
import SidebarCategories from "../categories/SidebarCategories"
import { useState } from "react"

export default function ProductsLayout() {
    const [sortBy, setSortBy] = useState("id")
    const [priceDropdown, setPriceDropdown] = useState("desc")
    const sortByPrice = (e) => {
        setSortBy("price")
        setPriceDropdown(e.target.value === "LowToHigh" ? "asc" : "desc")
    }


    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-start">
                <aside className="p-4 py-12 w-full md:basis-1/4">
                    <SidebarCategories />
                    <div className='box-shadow my-4 border border-gray-300'>
                        <h3 className='font-semibold bg-green-600 text-white p-2'>Sort By</h3>
                        <div className='p-4'>
                            <h3 className='font-semibold mb-2'>Price</h3>
                            <select name='price' className='border border-gray-300 w-full p-2' onChange={(e) => sortByPrice(e)}>
                                <option value="">--Select an Option--</option>
                                <option value="LowToHigh">Low to High</option>
                                <option value="HighToLow">High to Low</option>
                            </select>
                        </div>
                    </div>
                    
                </aside>

                <main className="md:basis-3/4">
                    <Outlet context={{ sortBy, priceDropdown }} />
                </main>
            </div>
        </div>
    )
}
