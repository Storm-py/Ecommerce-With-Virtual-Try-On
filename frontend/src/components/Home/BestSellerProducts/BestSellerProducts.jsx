import React,{ useState,useEffect } from "react"
import Card from "../../Card/Card.jsx"
import ReusableSlider from "../../ReusableSlider/ReusableSlider.jsx"

const BestSellerProducts = () => {
  const [products, setProducts] = useState([])
  
    useEffect(()=>{
      const handleProducts=async()=>{
        try {
          const response=await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/list-products`,{
            method:"GET",
            credentials:'include',
          })
          if(response.ok){
            const result=await response.json()
            setProducts(result.data?.products || [])
          }
        } catch (error) {
          console.log(error)
        }
      }
      handleProducts()
    },[])

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Best Seller Products</h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <ReusableSlider yPosition="top-1/2" leftPosition="-left-4 sm:-left-8" rightPosition="-right-4 sm:-right-8">
        {products.map((product) => (
          <div key={product.id} className="px-2 sm:px-3">
            <Card {...product} />
          </div>
        ))}
      </ReusableSlider>
    </div>
  )
}

export default BestSellerProducts
