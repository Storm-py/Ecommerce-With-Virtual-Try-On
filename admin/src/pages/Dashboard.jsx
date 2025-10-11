import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/Dashboard/DashboardSideBar/DashboardSidebar'

const Dashboard = () => {
  return (
    <div className='flex gap-2 justify-between '>
    <DashboardSidebar/>
    <main>
      <Outlet/>
    </main>
    </div>
  )
}

export default Dashboard