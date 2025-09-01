import React from "react";
import { useState,useEffect } from "react";
import Card from "../../Card/Card.jsx";
import ReusableSlider from "../../ReusableSlider/ReusableSlider.jsx";


const BestSellerProducts = () => {
  const [products, setProducts] = useState([])
  
    useEffect(()=>{
      const handleProducts=async()=>{
        try {
          const response=await fetch(`http://localhost:4000/api/v1/admin/list-products`,{
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
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Best Seller Products</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <ReusableSlider yPosition="top-56" leftPosition="-left-8" rightPosition="-right-8">
        
        {products.map((product) => (
          <div key={product.id} className="px-3">
            <Card {...product}/>
          </div>
        ))}
        
      </ReusableSlider>
    </div>
  );
};

export default BestSellerProducts;
