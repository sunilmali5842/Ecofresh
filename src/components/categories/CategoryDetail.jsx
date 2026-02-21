import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router'
import axios from "axios";
import ProductCard from '../products/ProductCard';
import ProductsSkeleton from '../skeletons/ProductsSkeleton';

export default function CategoryDetail() {
    const { categoryName } = useParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { sortBy, priceDropdown } = useOutletContext()

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true)
            try {
                const res = await axios.get(
                    `https://dummyjson.com/products/category/${categoryName}?sortBy=${sortBy}&order=${priceDropdown}`
                )
                setProducts(res.data.products)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCategoryProducts()
    }, [categoryName, sortBy, priceDropdown])


    if (error) return <p>Error loading products</p>

    return (
        <>
            <h2 className="text-3xl font-bold text-center my-12">
                {loading ? (
                    <div className="h-8 w-64 mx-auto bg-gray-200 rounded animate-pulse"></div>
                ) : (
                    categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                )}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading
                    ? Array.from({ length: 9 }).map((_, index) => (
                        <ProductsSkeleton key={index} />
                    ))
                    : products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </>
    )
}

