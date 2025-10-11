import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userStatusFalse} from '../../../store/userSlice';

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const dashboardItems = [
    {
      name: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      endpoint: "/"
    },
    {
      name: "Add Product",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      endpoint: "/add-product"
    },
    {
      name: "Products",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      endpoint: "/update-product"
    },
    {
      name: "Orders",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      endpoint: "/orders"
    },
    {
      name: "Account details",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      endpoint: "/account-details"
    },
    {
      name: "Change Password",
      icon: "M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zM5 20h14v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2z",
      endpoint: "/change-password"
    },
    {
      name: "Log out",
      icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
      endpoint: "/logout",
      isLogout: true
    }
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/admin/logout`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (response.ok) {
        dispatch(userStatusFalse());
        navigate('/login');
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[20vw] bg-white shadow-md rounded-lg">

      
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <p className="text-sm text-gray-600">Welcome back,</p>
      </div>

      
      <div className="flex-1 overflow-y-auto py-4">
        <h2 className="px-6 mb-4 text-lg font-bold text-gray-900">Dashboard</h2>
        <nav className="space-y-1 px-4">
          {dashboardItems.map((item, index) =>
            item.isLogout ? (
              <button
                key={index}
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={item.icon}
                  />
                </svg>
                <span className="font-medium">{item.name}</span>
              </button>
            ) : (
              <NavLink
                key={index}
                to={item.endpoint}
                end={item.endpoint === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-[#ff491f] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={item.icon}
                  />
                </svg>
                <span className="font-medium">{item.name}</span>
              </NavLink>
            )
          )}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-6 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          From your account dashboard you can view your recent orders, manage your shipping and
          billing addresses, and edit your password and account details.
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
