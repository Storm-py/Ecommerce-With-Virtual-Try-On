import React,{ useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductFilters from "../components/ProductFilters/ProductFilters"
import Card from "../components/Card/Card"

const Shop = () => {
  const [products, setProducts] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const handleProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/list-products`, {
          method: "GET",
          credentials: "include",
        })
        if (response.ok) {
          const result = await response.json()
          setProducts(result.data?.products || [])
        }
      } catch (error) {
        console.log(error)
      }
    }
    handleProducts()
  }, [])

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => selectedCategories.includes(product.category))
      setFilteredProducts(filtered)
    }
  }, [products, selectedCategories])

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <div className="mb-6 lg:mb-0 lg:w-1/4">
          <ProductFilters selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
        </div>

        <div className="flex-1 lg:pl-8 relative">
          <h1 className="absolute left-6 md:left-20 top-6 md:top-16 text-lg md:text-[2.35vw] leading-6 md:leading-10">
            Plus-Size Styles for <br /> Every Season
          </h1>
          <img
            src="https://klbtheme.com/clotya/wp-content/uploads/2022/05/banner-26.jpg"
            alt=""
            className="w-full h-auto rounded-md"
          />

          <div className="mt-6 mb-4">
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-gray-600">Filtered by:</span>
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-black text-white text-sm rounded-full flex items-center gap-2"
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryChange(selectedCategories.filter((cat) => cat !== category))}
                      className="text-white hover:text-gray-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => setSelectedCategories([])}
                  className="text-sm text-gray-600 hover:text-black underline"
                >
                  Clear all
                </button>
              </div>
            )}
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="px-3 py-4">
                <Link to={`/product/${product._id}`}>
                  <Card {...product} height="27" width="52" />
                </Link>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && products.length > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found for the selected categories.</p>
              <button
                onClick={() => setSelectedCategories([])}
                className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop
