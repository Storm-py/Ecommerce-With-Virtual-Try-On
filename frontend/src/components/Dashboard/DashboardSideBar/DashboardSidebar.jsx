import React,{ useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userStatusFalse } from "../../../store/userSlice"

const DashboardSidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn, navigate])

  const dashboardItems = [
    {
      name: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      endpoint: "/dashboard",
    },
    {
      name: "Orders",
      icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      endpoint: "/dashboard/orders",
    },
    {
      name: "Account details",
      icon: "M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      endpoint: "/dashboard/account-details",
    },
    {
      name: "Favourites",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      endpoint: "/dashboard/favorites",
    },
    {
      name: "Change Password",
      icon: "M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zM5 20h14v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2z",
      endpoint: "/dashboard/change-password",
    },
    {
      name: "Log out",
      icon: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
      endpoint: "/logout",
      isLogout: true,
    },
  ]

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/api/v1/users/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (response.ok) {
        dispatch(userStatusFalse())
        navigate("/login")
      } else {
        console.log("Logout failed")
      }
    } catch (error) {
      console.log("Logout error", error)
    }
  }

  return (
    <div className="flex flex-col h-full w-full sm:max-w-[280px] md:max-w-[320px] lg:max-w-[20vw] bg-white shadow-md rounded-lg">
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600">Welcome back,</p>
      </div>

      <div className="flex-1 overflow-y-auto py-3 sm:py-4">
        <h2 className="px-4 sm:px-6 mb-3 sm:mb-4 text-base sm:text-lg font-bold text-gray-900">Dashboard</h2>
        <nav className="space-y-1 px-2 sm:px-4">
          {dashboardItems.map((item, index) =>
            item.isLogout ? (
              <button
                key={index}
                onClick={handleLogout}
                className="w-full text-left flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <span className="font-medium text-sm sm:text-base">{item.name}</span>
              </button>
            ) : (
              <NavLink
                key={index}
                to={item.endpoint}
                end={item.endpoint === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors ${
                    isActive ? "bg-[#ff491f] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <span className="font-medium text-sm sm:text-base">{item.name}</span>
              </NavLink>
            ),
          )}
        </nav>
      </div>

      <div className="p-4 sm:p-6 border-t border-gray-200">
        <p className="text-gray-600 text-xs sm:text-sm">
          From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and
          edit your password and account details.
        </p>
      </div>
    </div>
  )
}

export default DashboardSidebar
