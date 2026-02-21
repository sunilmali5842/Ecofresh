import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router';
import CategoriesSkeleton from '../skeletons/CategoriesSkeleton';

export default function SidebarCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false);

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
        <div className="shadow-lg md:block">

          <button
            onClick={() => setOpen(!open)}
            className="w-full flex justify-between items-center font-semibold bg-gray-50 lg:bg-green-600 text-gray-800 lg:text-white p-2 border border-gray-100 md:cursor-default"
          >
            Categories
            <span className="md:hidden">
              {open ? "−" : "+"}
            </span>
          </button>

          <ul className={`${open ? "block" : "hidden"} md:block p-4`}>
            {categories.map(category => (
              <li
                key={category.slug}
                className="border border-gray-200 p-2 my-2 hover:bg-gray-100 transition"
              >
                <Link
                  to={`/products/category/${category.slug}`}
                  className="flex items-center gap-2"
                  onClick={() => setOpen(false)}
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
