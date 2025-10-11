import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "../store/cartSlice";
import {loadStripe} from '@stripe/stripe-js'

const Cart = () => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const shippingFee = 15.0;
  const taxRate = 0.08;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/get-cartItems`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCartData(data.data || []); 
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const makePayment=async()=>{
    
    const stripe=await loadStripe(import.meta.env.VITE_STRIPE_SECRET)
    
    const response=await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/checkout-session`,{
      method:'POST',
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(cartData)
    })


    const session=await response.json();


    const result=stripe.redirectToCheckout({
      sessionId:session.id
    })
    if(result.error) console.log(result.error)
  }

  const subtotal = cartData.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const tax = subtotal * taxRate;
  const total = subtotal + shippingFee + tax;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartData(
      cartData.map((item) =>
        item.product._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
    setCartData(cartData.filter((item) => item.product._id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Your Shopping Cart
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {cartData.length} {cartData.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 py-4 px-6 bg-gray-50">
                  <div className="col-span-6 font-medium text-gray-500">
                    PRODUCT
                  </div>
                  <div className="col-span-2 font-medium text-gray-500">
                    PRICE
                  </div>
                  <div className="col-span-2 font-medium text-gray-500">
                    QUANTITY
                  </div>
                  <div className="col-span-2 font-medium text-gray-500">
                    TOTAL
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartData.length === 0 ? (
                  <div className="py-6 px-6 text-center text-gray-600">
                    Your cart is empty.
                  </div>
                ) : (
                  cartData.map((item) => (
                    <div key={item.product._id} className="py-6 px-6">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6 flex items-center">
                          <div className="flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden">
                            <img
                              src={item?.product.images[0]?.url}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.product.name}
                            </h3>
                            <div className="mt-2">
                              {item.product.stock ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  In Stock
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <p className="text-gray-900 font-medium">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="col-span-2">
                          <div className="flex items-center">
                            <button
                              onClick={() => {
                                updateQuantity(item.product._id, item.quantity - 1);
                                dispatch(decreaseQuantity(item.product._id));
                              }}
                              className="text-gray-500 hover:text-gray-700 p-1"
                            >
                              -
                            </button>
                            <span className="mx-2 text-gray-900 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => {
                                updateQuantity(item.product._id, item.quantity + 1);
                                dispatch(increaseQuantity(item.product._id));
                              }}
                              className="text-gray-500 hover:text-gray-700 p-1"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="col-span-2 flex items-center">
                          <p className="text-gray-900 font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="ml-4 text-gray-400 hover:text-red-500"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-gray-200 py-4 px-6 bg-gray-50">
                <div className="flex justify-between">
                  <Link
                    to="/products"
                    className="flex items-center text-[#ff491f] hover:text-[#e03e1a] font-medium"
                  >
                    ← Continue Shopping
                  </Link>
                  <button
                    onClick={() => {
                      setCartData([]);
                      dispatch(clearCart());
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h3>
              </div>

              <div className="px-6 py-5">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">
                      ${shippingFee.toFixed(2)}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">
                      ${tax.toFixed(2)}
                    </dd>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <dt className="text-lg font-medium text-gray-900">Total</dt>
                    <dd className="text-lg font-bold text-gray-900">
                      ${total.toFixed(2)}
                    </dd>
                  </div>
                </div>

                <div className="mt-8">
                  <button onClick={makePayment} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#ff491f] hover:bg-[#e03e1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff491f]">
                    Proceed to Checkout
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    or{" "}
                    <Link
                      to="/"
                      className="text-[#ff491f] font-medium hover:text-[#e03e1a]"
                    >
                      continue shopping
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* End Summary */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
