import React from 'react'
import { FaAngleRight } from "react-icons/fa";


const Categories = () => {
  return (
    <div>
        <div className="w-64 border-r border-gray-200">
          <ul className="py-2">
            <li className="px-6 py-2.5 flex items-center justify-between hover:bg-gray-50">
              <span>Men</span>
              <FaAngleRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="px-6 py-2.5 flex items-center justify-between hover:bg-gray-50">
              <span>Women</span>
              <FaAngleRight className="w-4 h-4 text-gray-400" />
            </li>
            <li className="px-6 py-2.5 hover:bg-gray-50">Kids</li>
            <li className="px-6 py-2.5 hover:bg-gray-50">Baby</li>
            <li className="px-6 py-2.5 flex items-center justify-between hover:bg-gray-50">
              <span>Shoes</span>
              <span className="bg-emerald-500 text-white text-xs px-1.5 py-0.5 rounded">HOT</span>
            </li>
            <li className="px-6 py-2.5 hover:bg-gray-50">Bags</li>
            <li className="px-6 py-2.5 hover:bg-gray-50">Accessories</li>
            <li className="px-6 py-2.5 hover:bg-gray-50">Watches</li>
            <li className="px-6 py-2.5 flex items-center justify-between hover:bg-gray-50">
              <span>Cargo Trousers</span>
              <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded">NEW</span>
            </li>
            <li className="px-6 py-2.5 hover:bg-gray-50">Outerwear</li>
            <li className="px-6 py-2.5 hover:bg-gray-50">Wallets</li>
            <li className="border-t border-gray-200 mt-2 pt-2"></li>
            <li className="px-6 py-2.5 flex items-center justify-between hover:bg-gray-50">
              <span>New Arrivals</span>
              <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">SAVE 25%</span>
            </li>
            <li className="px-6 py-2.5 hover:bg-gray-50">Ready to Wear</li>
            <li className="px-6 py-2.5 hover:bg-gray-50">All For Men</li>
          </ul>
        </div>
    </div>
  )
}

export default Categories;