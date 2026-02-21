import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaTag } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

export default function ProductDetails() {

    const [productData, setProductData] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const params = useParams()
    const [quantity, setQuantity] = useState(1)

    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${params.productID}`)
            setProductData(response.data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProductDetails()
    }, [])

    const handleBuyNow = () => {
        dispatch(addToCart({ ...productData, quantity }))
        navigate('/cart')

    }

    if (loading) return <div className='container mx-auto my-4'><p>Loading...</p></div>
    if (error) return <p>Error: {error}</p>

    return (
        <section className='container mx-auto my-8'>

            <div className='grid md:grid-cols-2'>
                <div className='border border-gray-300'>
                    <img src={productData.images[0]} />
                </div>
                <div className='px-8  mt-6 md:mt-0'>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{productData.title}</h1>
                    <p className='font-semibold text-2xl mb-4'>{productData.price} $ </p>
                    <p>{productData.description}</p>
                    <p className='flex gap-2 items-center my-4 italic'><FaTag />{productData?.tags?.join(', ')}</p>
                    <form className='my-4'>
                        <input type='number' className='border border-gray-300 w-20 px-4 py-2' min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                    </form>
                    <div className='flex gap-4 my-6'>
                        <button className='px-6 py-2 bg-black text-white cursor-pointer' onClick={() => dispatch(addToCart({ ...productData, quantity }))}>Add to Cart</button>
                        <button className='px-6 py-2 bg-green-600 text-white cursor-pointer' onClick={() => handleBuyNow()}>Buy Now</button>
                    </div>


                </div>
            </div>

        </section>
    )
}
