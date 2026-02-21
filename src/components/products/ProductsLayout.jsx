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
    const [showFilters, setShowFilters] = useState(false);
    const [openSort, setOpenSort] = useState(false);


    return (
        <div className="container mx-auto">
            <div className="md:hidden px-4 mt-6">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium"
                >
                    {showFilters ? "Close Filters" : "Filter & Sort"}
                </button>
            </div>
            <div className="flex flex-wrap justify-between items-start">
                <aside
                    className={`p-4 py-6 w-full md:basis-1/4 ${showFilters ? "block" : "hidden"} md:block`}
                >
                    <SidebarCategories />

                    <div className="my-4 border border-gray-300 shadow-sm md:block">
                        <button
                            onClick={() => setOpenSort(!openSort)}
                            className="w-full flex justify-between items-center font-semibold bg-gray-50 lg:bg-green-600 text-gray-800 lg:text-white p-2 border border-gray-100 md:cursor-default"
                        >
                            Sort By
                            <span className="md:hidden">
                                {openSort ? "−" : "+"}
                            </span>
                        </button>


                        <div className={`${openSort ? "block" : "hidden"} md:block p-4`}>
                            <h3 className="font-semibold mb-2">Price</h3>

                            <select
                                name="price"
                                className="border border-gray-300 w-full p-2 rounded"
                                onChange={(e) => sortByPrice(e)}
                            >
                                <option value="">--Select an Option--</option>
                                <option value="LowToHigh">Low to High</option>
                                <option value="HighToLow">High to Low</option>
                            </select>
                        </div>
                    </div>
                </aside>

                <main className="w-full md:basis-3/4">
                    <Outlet context={{ sortBy, priceDropdown }} />
                </main>
            </div>
        </div>
    )
}
