import React, { useEffect,useState } from "react";
import {Link} from "react-router-dom"
import ProductFilters from "../components/ProductFilters/ProductFilters";
import Card from "../components/Card/Card";

const Shop = () => {
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <ProductFilters />

        <div className="flex-1 pl-8 relative">
          <h1 className="absolute left-20 top-16 text-[2.35vw] leading-10">
            Plus-Size Styles for <br /> Every Season
          </h1>
          <p className="absolute left-20 top-40 text-md text-gray-500 text-[1.05vw]">
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> Velit
            quaerat ratione adipisci.
          </p>
          <img
            src="https://klbtheme.com/clotya/wp-content/uploads/2022/05/banner-26.jpg"
            alt=""
          />
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product._id} className="px-3 py-4">
                <Link to={`/product/${product._id}`}>
                  <Card {...product} height="27" width="52" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
