
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {removeFromCart,clearCart,decreaseQuantity,increaseQuantity} from '../store/cartSlice'



const Cart = () => {
  const dispatch=useDispatch()
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 149.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
      color: "Black",
      inStock: true
    },
    {
      id: 2,
      name: "Smart Fitness Tracker",
      price: 79.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
      color: "Midnight Blue",
      inStock: true
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      price: 299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600&q=80",
      color: "Charcoal Gray",
      inStock: true
    }
  ]);

  const shippingFee = 15.00;
  const taxRate = 0.08;

  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  
  const tax = subtotal * taxRate;
  
  
  const total = subtotal + shippingFee + tax;

  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    dispatch(removeFromCart(id))
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Your Shopping Cart</h1>
          <p className="mt-2 text-lg text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 py-4 px-6 bg-gray-50">
                  <div className="col-span-6 font-medium text-gray-500">PRODUCT</div>
                  <div className="col-span-2 font-medium text-gray-500">PRICE</div>
                  <div className="col-span-2 font-medium text-gray-500">QUANTITY</div>
                  <div className="col-span-2 font-medium text-gray-500">TOTAL</div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-6 px-6">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      
                      <div className="col-span-6 flex items-center">
                        <div className="flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-500 mt-1">Color: {item.color}</p>
                          <div className="mt-2">
                            {item.inStock ? (
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
                        <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                      </div>
                      
                     
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <button 
                            onClick={() => {
                              updateQuantity(item.id, item.quantity - 1)
                              dispatch(decreaseQuantity(item.id))
                            }}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <span className="mx-2 text-gray-900 font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => {
                              updateQuantity(item.id, item.quantity + 1)
                              dispatch(increaseQuantity(item.id))
                            }}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      
                      <div className="col-span-2 flex items-center">
                        <p className="text-gray-900 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="ml-4 text-gray-400 hover:text-red-500"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 py-4 px-6 bg-gray-50">
                <div className="flex justify-between">
                  <Link 
                    to="/products" 
                    className="flex items-center text-[#ff491f] hover:text-[#e03e1a] font-medium"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Continue Shopping
                  </Link>
                  <button 
                    onClick={() => {
                      setCartItems([])
                      dispatch(clearCart())
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
              </div>
              
              <div className="px-6 py-5">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">${shippingFee.toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">${tax.toFixed(2)}</dd>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <dt className="text-lg font-medium text-gray-900">Total</dt>
                    <dd className="text-lg font-bold text-gray-900">${total.toFixed(2)}</dd>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button 
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#ff491f] hover:bg-[#e03e1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff491f]"
                  >
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    or <Link to="/" className="text-[#ff491f] font-medium hover:text-[#e03e1a]">continue shopping</Link>
                  </p>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;