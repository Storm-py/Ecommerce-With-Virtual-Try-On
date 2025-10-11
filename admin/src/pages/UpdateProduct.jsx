import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../components/PostForm'

const UpdateProduct = () => {
    const [product, setProduct] = useState()
    const {id} =useParams()
    
    useEffect(()=>{
        const findProduct=async()=>{
            const response=await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/get-product/${id}`,{
                method:"GET",
                credentials:'include',
            })
            
            if(response.ok){
                const result=await response.json()
                console.log(result)
                setProduct(result.data.product)
            }
        }
        findProduct()
    },[id])
  return (
    <PostForm post={product} />
  )
}

export default UpdateProduct