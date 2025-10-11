import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardMain = () => {
  const [stats, setStats] = useState({
    orders: 0,
    wishlist: 0,
    pendingOrders: 0,
    totalSpent: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // useEffect(() => {
  //   setStats({
  //     orders: 12,
  //     wishlist: 5,
  //     pendingOrders: 2,
  //     totalSpent: 1245.75
  //   });
    
  //   setRecentOrders([
  //     { id: '#ORD-7841', date: 'July 20, 2025', total: '$245.50', status: 'Delivered' },
  //     { id: '#ORD-7823', date: 'July 18, 2025', total: '$78.25', status: 'Processing' },
  //     { id: '#ORD-7814', date: 'July 15, 2025', total: '$145.99', status: 'Delivered' },
  //     { id: '#ORD-7802', date: 'July 12, 2025', total: '$56.75', status: 'Delivered' }
  //   ]);
    
  //   setWishlistItems([
  //     { id: 1, name: 'Wireless Headphones', price: '$129.99', image: 'headphones' },
  //     { id: 2, name: 'Smart Watch Series 5', price: '$249.99', image: 'smartwatch' },
  //     { id: 3, name: 'Running Shoes', price: '$89.99', image: 'shoes' }
  //   ]);
  // }, []);

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/orders`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        console.log(result.data)
        setRecentOrders(result.data)
        setStats((props)=>({...props,orders:result.data.length}))
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchOrders();
}, []);

useEffect(() => {
  const fetchFavorites = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/favorites`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        setWishlistItems(result.data)
        setStats((props)=>({...props,wishlist:result.data.length}))
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchFavorites();
}, []);

  
  return (
    <div className="dashboard-home">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your account today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Wishlist Items</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.wishlist}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Pending Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600">Total Spent</h3>
              <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link to="/dashboard/orders" className="text-sm font-medium text-orange-600 hover:text-orange-700">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'Processing' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Wishlist</h2>
            <Link to="/dashboard/favorites" className="text-sm font-medium text-orange-600 hover:text-orange-700">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {wishlistItems.map((item,idx) => (
              <div key={item._id} className="p-4 flex items-center hover:bg-gray-50">
                <div className="flex-shrink-0">
                  <img src={item.images[idx].url} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200"/>
                  <div/>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.price}</p>
                </div>
                <div>
                  <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Account Summary</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Contact Information</h3>
              <p className="text-gray-900">John Doe</p>
              <p className="text-gray-600 mt-1">johndoe@example.com</p>
              <Link to="/account-details" className="mt-3 inline-block text-sm font-medium text-orange-600 hover:text-orange-700">
                Edit
              </Link>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Default Address</h3>
              <p className="text-gray-900">123 Main Street</p>
              <p className="text-gray-600">New York, NY 10001</p>
              <p className="text-gray-600">United States</p>
              <Link to="/account-details" className="mt-3 inline-block text-sm font-medium text-orange-600 hover:text-orange-700">
                Manage Addresses
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/orders" className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
          <div className="mx-auto bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">View Orders</span>
        </Link>
        
        <Link to="/account-details" className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
          <div className="mx-auto bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">Edit Account</span>
        </Link>
        
        <Link to="/wishlist" className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
          <div className="mx-auto bg-pink-100 text-pink-600 w-12 h-12 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">Wishlist</span>
        </Link>
        
        <Link to="/" className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
          <div className="mx-auto bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardMain;