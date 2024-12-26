import React from 'react'
import Sider from './Sider'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div style={{height: "100vh"}} className='App-scroll bg-gray-100 flex h-full w-full'>
      <Sider />
      <Outlet />
    </div>
  )
}

export default Dashboard
