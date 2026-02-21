import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../products/ProductCard'
import { motion } from "framer-motion";
import ProductsSkeleton from '../skeletons/ProductsSkeleton';

export default function HomepageCategories() {
    const [loading, setLoading] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [error, setError] = useState()
    const [errorProd, setErrorProd] = useState()
    const [categories, setCategories] = useState([])
    const [currentCat, setCurrentCat] = useState("groceries")
    const [hpProducts, setHpProducts] = useState([])
    const SKELETON_COUNT = 8

    const getHpCategories = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products/categories")
            setCategories(response.data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }
    const getHpProducts = async () => {
        try {
            setLoadingProducts(true);
            const response = await axios.get(`https://dummyjson.com/products/category/${currentCat}`)
            setHpProducts(response.data.products)
        } catch (err) {
            setErrorProd(err)
        } finally {
            setLoadingProducts(false)
        }

    }

    useEffect(() => {
        getHpCategories()
    }, [])

    useEffect(() => {
        getHpProducts()
    }, [currentCat])

    // useEffect(() => {
    //     if (categories.length) {
    //         setCurrentCat(categories[0].slug)
    //     }
    // }, [categories])

    return (
        <div>
            <div className='flex justify-center flex-wrap gap-3'>
                {
                    categories.slice(0, 5).map((category, index) => {
                        const isActive = currentCat === category.slug;
                        return <button key={category.slug} className={`
          px-5 py-2 rounded-full cursor-pointer text-sm font-medium transition
          ${isActive ? "bg-green-600 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-blue-100"}
        `} onClick={() => setCurrentCat(`${category.slug}`)}>{category.name}</button>
                    })
                }
            </div>




            <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-4 my-8 gap-4"
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {loadingProducts
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <ProductsSkeleton key={index} />
                    ))
                    : hpProducts.slice(0, 8).map(product => (
                        <ProductCard product={product} key={product.id} />
                    ))}
            </motion.div>

        </div>
    )
}
