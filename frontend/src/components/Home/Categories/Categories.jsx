import React from "react"
import { FaAngleRight } from "react-icons/fa"

const Categories = () => {
  return (
    <div>
      <div className="w-full sm:w-72 md:w-80 lg:w-64 border-r border-gray-200">
        <ul className="py-2">
          <li className="px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between hover:bg-gray-50 text-sm sm:text-base">
            <span>Men</span>
            <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          </li>
          <li className="px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between hover:bg-gray-50 text-sm sm:text-base">
            <span>Women</span>
            <FaAngleRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          </li>
          <li className="px-4 sm:px-6 py-2 sm:py-2.5 hover:bg-gray-50 text-sm sm:text-base">Kids</li>
          <li className="px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between hover:bg-gray-50 text-sm sm:text-base">
            <span>Shoes</span>
            <span className="bg-emerald-500 text-white text-xs px-1.5 py-0.5 rounded">HOT</span>
          </li>
          <li className="px-4 sm:px-6 py-2 sm:py-2.5 hover:bg-gray-50 text-sm sm:text-base">Bags</li>
          <li className="px-4 sm:px-6 py-2 sm:py-2.5 hover:bg-gray-50 text-sm sm:text-base">Accessories</li>
        </ul>
      </div>
    </div>
  )
}

export default Categories
