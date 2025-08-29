import React, { useEffect, useState } from "react";
import parse from 'html-react-parser' 
import { Link } from "react-router-dom";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/admin/list-products`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json(); // 
          setData(result.data?.products || []); 
        } else {
          console.error("Failed to fetch products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(); 
  }, []);

  if (loading) {
    return <h2 className="text-2xl text-center">Loading products...</h2>;
  }

  return (
    <div className="h-screen w-[80vw] mx-auto flex flex-col gap-10">
      <h1 className="font-bold text-5xl text-center my-10">Product List</h1>
      <div className="grid grid-cols-3 gap-6">
        {data.map((product) => (
          <div
            key={product._id}
            className="border rounded-2xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition"
          >
            
            {product.images?.length > 0 ? (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="h-40 w-40 object-cover rounded-xl mb-4"
              />
            ) : (
              <div className="h-40 w-40 bg-gray-200 flex items-center justify-center rounded-xl">
                No Image
              </div>
            )}

            
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 line-clamp-2">{parse(product.description)}</p>
            <div className="flex justify-between items-center gap-4">

            <p className="text-sm font-bold text-gray-500">Price: ${product.price}</p>
            <p className="text-sm text-gray-500">
              Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
            </p>
            <p className="text-sm text-blue-500 font-medium">
              Category: {product.category}
            </p>
            </div>
            <Link to={`/update-product/${product._id}`}>
            <button className="py-1 px-4 bg-green-700 rounded-lg text-white my-2">Edit</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
