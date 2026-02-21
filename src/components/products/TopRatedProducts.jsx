import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductsSkeleton from "../skeletons/ProductsSkeleton";

export default function Top_Rated_Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    "https://dummyjson.com/products?limit=50"
                );

                setProducts(response.data.products);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const highRatedProducts = useMemo(() => {
        return [...products]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
    }, [products]);
    return (
        <div className="container mx-auto pt-12 pb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
                Top Rated Products
            </h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 my-8 gap-4'>

                
                {error && <p>{error}</p>}

                {loading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <ProductsSkeleton key={index} />
                    ))
                    :
                    highRatedProducts.map(product => (
                        <ProductCard key={product.id} product={product} showRating={true} />
                    ))}
            </div>
        </div>
    );
}

