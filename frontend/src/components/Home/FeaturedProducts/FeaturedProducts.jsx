import React from 'react'
import Card from '../../Card/Card';
import { useState,useEffect } from 'react';
import ReusableSlider from '../../ReusableSlider/ReusableSlider';

const FeaturedProducts = () => {
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
    <div>
        <div className='flex items-center justify-between my-20'>
            <h1 className='w-1/3 text-3xl font-medium'>Featured Products</h1>
            <p className='text-[#9087ae] mx-auto w-2/3 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis pariatur cupiditate labore dolorem quia modi porro, vel, voluptatum veniam iusto voluptates? Veniam, sed officiis. Unde repellat magni doloribus</p>
        </div>
        
          <ReusableSlider yPosition="top-56" leftPosition="-left-8" rightPosition="-right-8">
            {products.map((product)=>(
              <div key={product.id} className="px-3">
                <Card {...product}/>
              </div>
            ))}
          </ReusableSlider>
        
    </div>
  )
}

export default FeaturedProducts