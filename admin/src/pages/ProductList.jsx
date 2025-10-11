import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null); // which product to delete

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/list-products`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json();
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

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/delete-product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        setData((prev) => prev.filter((p) => p._id !== id));
        setDeleteId(null); 
      } else {
        console.error("Failed to delete product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return <h2 className="text-2xl text-center">Loading products...</h2>;
  }

  return (
    <div className="min-h-screen w-[80vw] mx-auto flex flex-col gap-10">
      <h1 className="font-bold text-5xl text-center my-10">Product List</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <div
            key={product._id}
            className="border rounded-2xl shadow-md p-6 flex flex-col items-center bg-white hover:shadow-xl hover:scale-105 transition"
          >
            {/* Product Image */}
            {product.images?.length > 0 ? (
              <img
                src={product.images[0].url}
                alt={product.name}
                className="h-44 w-44 object-cover rounded-xl mb-4"
              />
            ) : (
              <div className="h-44 w-44 bg-gray-200 flex items-center justify-center rounded-xl mb-4 text-gray-500">
                No Image
              </div>
            )}

            {/* Product Info */}
            <h2 className="text-lg font-semibold text-center">{product.name}</h2>
            <div className="text-gray-600 text-sm line-clamp-3 my-2">
              {parse(product.description)}
            </div>

            <div className="flex flex-col gap-1 my-3 text-sm text-gray-600">
              <p className="font-bold text-gray-700">Price: ${product.price}</p>
              <p>
                Stock:{" "}
                {product.stock > 0 ? (
                  <span className="text-green-600">{product.stock}</span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </p>
              <p className="text-blue-500 font-medium">
                Category: {product.category}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-4">
              <Link to={`/update-product/${product._id}`}>
                <button className="py-1.5 px-5 bg-green-600 rounded-lg text-white font-medium shadow hover:bg-green-700">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => setDeleteId(product._id)}
                className="py-1.5 px-5 bg-red-600 rounded-lg text-white font-medium shadow hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => deleteProduct(deleteId)}
                className="py-2 px-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="py-2 px-6 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
