import React,{ useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toggleSwitch } from "../../store/sideBarSlice"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const isOpen = useSelector((state) => state.sideBar.toggle)
  const dispatch = useDispatch()
  const sidebarRef = useRef()

  const mainMenu = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Women", link: "/women" },
    { name: "Men", link: "/men" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
  ]

  const categories = [
    { name: "Men", link: "/men" },
    { name: "Women", link: "/women" },
    { name: "Kids", link: "/kids" },
    { name: "Baby", link: "/baby" },
    { name: "Shoes", link: "/shoes" },
    { name: "Bags", link: "/bags" },
    { name: "Accessories", link: "/accessories" },
    { name: "Cargo Trousers", link: "/cargo-trousers" },
    { name: "Outerwear", link: "/outerwear" },
    { name: "Wallets", link: "/wallets" },
    { name: "Belts", link: "/belts" },
    { name: "Best Sellers", link: "/best-sellers" },
    { name: "Featured Products", link: "/featured-products" },
    { name: "New Arrivals", link: "/new-arrivals" },
  ]

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        dispatch(toggleSwitch())
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen, dispatch])

  return (
    <>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm transition-opacity duration-300"></div>
      )}

     
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-72 sm:w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <img
            src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo.png"
            alt="Logo"
            className="w-32 sm:w-40"
          />
          <button
            className="bg-gray-300 px-2 py-1 sm:px-3 sm:py-1 rounded text-black hover:bg-gray-400 transition-colors text-lg sm:text-xl"
            onClick={() => dispatch(toggleSwitch())}
          >
            ×
          </button>
        </div>

        
        <div className="p-3 sm:p-4">
          <h2 className="font-semibold text-xs sm:text-sm mb-2">Main Menu</h2>
          {mainMenu.map((item) => (
            <Link key={item.name} to={item.link} onClick={() => dispatch(toggleSwitch())}>
              <div className="py-1.5 text-gray-700 px-1 hover:bg-gray-100 rounded transition-colors text-sm sm:text-base">
                {item.name}
              </div>
            </Link>
          ))}
          <div className="border-b border-gray-200 my-3 sm:my-4" />
        </div>

        
        <div className="p-3 sm:p-4">
          <h2 className="font-semibold text-xs sm:text-sm mb-2">Categories</h2>
          {categories.map((item) => (
            <Link key={item.name} to={item.link} onClick={() => dispatch(toggleSwitch())}>
              <div className="py-1.5 text-gray-700 px-1 hover:bg-gray-100 rounded transition-colors text-sm sm:text-base">
                {item.name}
              </div>
            </Link>
          ))}
          <div className="border-b border-gray-200 my-3 sm:my-4" />
        </div>
      </div>
    </>
  )
}

export default Sidebar
