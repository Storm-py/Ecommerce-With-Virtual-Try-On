import Card from "../../Card/Card.jsx"
import React,{ useState, useEffect } from "react"
import ReusableSlider from "../../ReusableSlider/ReusableSlider.jsx"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])

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

  return (
    <div className="px-2 sm:px-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between my-8 sm:my-12 lg:my-20 gap-4">
        <h1 className="text-2xl sm:text-3xl font-medium lg:w-1/3">Featured Products</h1>
        <p className="text-sm sm:text-base text-[#9087ae] lg:mx-auto lg:w-2/3 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis pariatur cupiditate labore dolorem quia
          modi porro, vel, voluptatum veniam iusto voluptates? Veniam, sed officiis. Unde repellat magni doloribus
        </p>
      </div>

      <ReusableSlider
        yPosition="top-32 sm:top-40 lg:top-56"
        leftPosition="-left-4 sm:-left-6 lg:-left-8"
        rightPosition="-right-4 sm:-right-6 lg:-right-8"
      >
        {products.map((product) => (
          <div key={product.id} className="px-1 sm:px-2 lg:px-3">
            <Card {...product} />
          </div>
        ))}
      </ReusableSlider>
    </div>
  )
}

export default FeaturedProducts
