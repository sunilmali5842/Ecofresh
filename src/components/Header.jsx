import React, { useEffect, useState } from 'react'
import Logo from '../assets/images/EcofreshLogo-new.png'
import { Link } from 'react-router'
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [sticky, setSticky] = useState(false)
    const cartItems = useSelector((store) => store.cart.items)

    const totalCartItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    )

    return (
        <header className="sticky top-0 z-50 w-full bg-white py-2 shadow-md">
            <div className="mx-auto max-w-7xl px-4">

                <div className="grid grid-cols-12 items-center">

                    <div className="col-span-6 md:col-span-3">
                        <Link to="/"><img className="h-16 md:h-20 w-auto" src={Logo} alt="EcoFresh Logo" /></Link>
                    </div>

                    <nav className="hidden md:flex md:col-span-9 justify-end gap-8 items-center">
                        <Link to="/" className="uppercase font-semibold text-gray-900 hover:text-green-600">
                            Home
                        </Link>
                        <Link to="/about" className="uppercase font-semibold text-gray-700 hover:text-green-600">
                            About Us
                        </Link>
                        <Link to="/products" className="uppercase font-semibold text-gray-700 hover:text-green-600">
                            Products
                        </Link>
                        <Link to="/blogs" className="uppercase font-semibold text-gray-700 hover:text-green-600">
                            Blogs
                        </Link>
                        <Link to="/contact" className="uppercase font-semibold text-gray-700 hover:text-green-600">
                            Contact
                        </Link>
                        <Link to="/cart" className='flex items-center gap-1'><FaShoppingCart />(<span>{totalCartItems}</span>)</Link>
                        <Link to="/login" className=''><FaRegUserCircle /></Link>
                    </nav>

                    <div className="col-span-6 md:hidden flex justify-end items-center gap-10">
                        <Link to="/cart" className="relative">
                            <FaShoppingCart className="text-xl" />
                            {totalCartItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1.5">
                                    {totalCartItems}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-800 text-2xl"
                        >
                            ☰
                        </button>
                    </div>

                </div>

                {menuOpen && (
                    <nav className="md:hidden flex flex-col gap-4 py-4 border-t">
                        <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
                        <Link onClick={() => setMenuOpen(false)} to="/about">About Us</Link>
                        <Link onClick={() => setMenuOpen(false)} to="/products">Products</Link>
                        <Link onClick={() => setMenuOpen(false)} to="/blogs">Blogs</Link>
                        <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>
                    </nav>
                )}

            </div>
        </header>
    )
}
