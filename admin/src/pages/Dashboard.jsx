import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate=useNavigate()
  const isLoggedIn=useSelector(state=>state.user.isLoggedIn)
   useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate]);
  return (
    isLoggedIn && (
      <div>I am working</div>
    )
  )
}

export default Dashboard