import React from 'react'
import { HiBars3 } from "react-icons/hi2";
import { CiUser } from "react-icons/ci";
import { CiSearch,CiHeart } from "react-icons/ci";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSwitch } from '../../store/sideBarSlice';
import { useEffect,useState } from 'react';

const Header = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState('')

  useEffect(()=>{
    const fetchUser=async()=>{
      const response=await fetch(`http://localhost:4000/api/v1/users/user`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
      })
      const data= await response.json()
      console.log(data)
      if(response.ok){
        setUser(data.data)
      }
    }
    fetchUser()
  },[])
  

  const navItems=[
    {
      name:'HOME',
      link:"/"
    },
    {
      name:'SHOP',
      link:"/shop"
    },
    {
      name:'MEN',
      link:"/men"
    },
    {
      name:'WOMEN',
      link:"/women"
    },
    {
      name:'OUTERWEAR',
      link:"/outerwear"
    },
    {
      name:'BLOG',
      link:"/shop"
    },
    {
      name:'CONTACT',
      link:"/shop"
    },
    {
      name:'VIRTUAL TRY-ON',
      link:"/shop"
    },
  ]
const navIcons=[
    {
      name:<CiUser size={27}/>,
      link:user?"/dashboard":'/login'
    },
    {
      name:<CiHeart size={27}/>,
      link:'/favorites'
    },
    {
      name:<PiShoppingCartSimpleLight size={27}/>,
      link:'/cart'
    },

  ]

  return (
    <div className='bg-white text-black flex items-center justify-between pb-8'>
      <div className='flex items-center justify-center gap-6'>
        <div className='cursor-pointer' onClick={() => dispatch(toggleSwitch())}>
          <HiBars3 size={27} />
        </div>
        <Link to={'/'}>
        <div className='w-30 cursor-pointer'>
          <img src="https://klbtheme.com/clotya/wp-content/uploads/2022/04/logo.png" alt="" />
        </div>
        </Link>
        {navItems.map((item, index) => (
          <Link to={item.link} key={index}> 
            <ul className='font-medium cursor-pointer'>
              <li>{item.name}</li>
            </ul>
          </Link>
        ))}
      </div>
      <div className='bg-white text-black flex items-center justify-center gap-6'>
        {navIcons.map((item, index) => (
          <Link to={item.link} key={index}> 
          <ul key={index} className='cursor-pointer'>
            <li>{item.name}</li>
          </ul>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Header