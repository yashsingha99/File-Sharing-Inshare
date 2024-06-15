import React from 'react'
import Sider from './Sider'
import {Routes, Route, Outlet, useLocation} from 'react-router-dom'
import Premium from './Premium'

function Dashoard() {
  return (
    <div style={{height:"100vh"}} className='bg-gray-100  flex h-full w-full'>
    <Sider />
    <Outlet />

    </div>
  )
}

export default Dashoard