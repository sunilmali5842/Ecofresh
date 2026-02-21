import React from 'react'
import { Link } from 'react-router'
import { addToCart } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import toast from 'react-hot-toast';

export default function ProductCard({ product, showRating = false }) {
    const dispatch = useDispatch()

    const handleAddToCart = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addToCart({ ...product, quantity: 1 }))
        toast.success(product.title + " Added to Cart ")
    }

    return (
        <>

            <div className='productCard group m-4 border border-gray-300'>
                <Link to={`/products/${product.id}`} className="relative"><img className="mx-auto block hover:scale-90 transition duration-300 cursor-pointer" src={product.thumbnail} />
                    <button onClick={(e) => handleAddToCart(e)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 hover:bg-green-700 transition my-4 cursor-pointer"><FaShoppingCart /></button></Link>

                <div className='p-4'>
                    <h4 className="font-semibold">
                        <Link to={`/products/${product.id}`}>
                            {product.title}
                            {showRating && (
                                <span className="ml-2 text-yellow-500">
                                    ⭐ {product.rating}
                                </span>
                            )}
                        </Link>
                    </h4>                   
                    <p>{product.price} $</p>

                </div>
            </div>
        </>
    )
}
