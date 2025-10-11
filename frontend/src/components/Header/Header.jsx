"use client"

import React from "react"
import { HiBars3 } from "react-icons/hi2"
import { CiUser } from "react-icons/ci"
import { CiHeart } from "react-icons/ci"
import { PiShoppingCartSimpleLight } from "react-icons/pi"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleSwitch } from "../../store/sideBarSlice"
// import { useEffect,useState } from 'react';

const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  const navItems = [
    {
      name: "HOME",
      link: "/",
    },
    {
      name: "SHOP",
      link: "/shop",
    },
    {
      name: "MEN",
      link: "/men",
    },
    {
      name: "WOMEN",
      link: "/women",
    },
    {
      name: "OUTERWEAR",
      link: "/outerwear",
    },
    {
      name: "BLOG",
      link: "/shop",
    },
    {
      name: "CONTACT",
      link: "/shop",
    },
    {
      name: "VIRTUAL TRY-ON",
      link: "/shop",
    },
  ]
  const navIcons = [
    {
      name: <CiUser size={27} />,
      link: isLoggedIn ? "/dashboard" : "/login",
    },
    {
      name: <CiHeart size={27} />,
      link: "/dashboard/favorites",
    },
    {
      name: <PiShoppingCartSimpleLight size={27} />,
      link: "/cart",
    },
  ]

  return (
    <div className="bg-white text-black flex items-center justify-between pb-4 sm:pb-6 md:pb-8 px-2 sm:px-4 md:px-6">
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
        <div className="cursor-pointer" onClick={() => dispatch(toggleSwitch())}>
          <HiBars3 size={24} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </div>
        <Link to={"/"}>
          <div className="w-20 sm:w-24 md:w-30 cursor-pointer">
            <img
              src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo.png"
              alt=""
              className="w-full h-auto"
            />
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <ul className="font-medium cursor-pointer">
                <li className="text-sm xl:text-base hover:text-gray-600 transition-colors">{item.name}</li>
              </ul>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-white text-black flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
        {navIcons.map((item, index) => (
          <Link to={item.link} key={index}>
            <ul key={index} className="cursor-pointer">
              <li className="flex items-center justify-center p-1 hover:bg-gray-100 rounded transition-colors">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                  {React.cloneElement(item.name, {
                    size: undefined,
                    className: "w-full h-full",
                  })}
                </div>
              </li>
            </ul>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Header
