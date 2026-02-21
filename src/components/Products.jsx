import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './products/ProductCard'
import { useOutletContext } from 'react-router'
import ProductsSkeleton from '../components/skeletons/ProductsSkeleton';
import Pagination from './Pagination';

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { sortBy, priceDropdown } = useOutletContext()

  const [perPage, setPerPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalEntries, setTotalEntries] = useState(0)

  const skip = (currentPage * perPage) - perPage

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${perPage}&skip=${skip}&sortBy=${sortBy}&order=${priceDropdown}`
      )
      setProducts(response.data.products)
      setTotalEntries(response.data.total)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [sortBy, priceDropdown, currentPage])

  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center my-8">Products</h2>

      <div className='container mx-auto pb-8'>
        <div className='flex justify-between items-start content-start'>
          <div className='flex-1 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {loading
              ? Array.from({ length: perPage }).map((_, index) => (
                <ProductsSkeleton key={index} />
              ))
              : products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}

          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={totalEntries}
          itemsPerPage={perPage}
          onPageChange={setCurrentPage}
        />

      </div>

    </div>
  )
}

export default Products
