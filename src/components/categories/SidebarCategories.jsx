import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router';
import CategoriesSkeleton from '../skeletons/CategoriesSkeleton';

export default function SidebarCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products/categories"
        )
        setCategories(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (error) return <p>Error loading categories</p>

  return (
    <>
      {loading ? (
        <CategoriesSkeleton count={24} />
      ) : (
        <div className="shadow-lg">
          <h3 className="font-semibold bg-green-600 text-white p-2">
            Categories
          </h3>
          <ul className="p-4">
            {categories.map(category => (
              <li
                key={category.slug}
                className="border border-gray-300 p-2 my-2 hover:bg-gray-500 hover:text-white"
              >
                <Link
                  to={`/products/category/${category.slug}`}
                  className="flex items-center gap-2"
                >
                  <FaAngleRight />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
