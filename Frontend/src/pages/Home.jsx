import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='flex  h-[98vh] gap-4  '>
    <div className='border border-gray-500 rounded-xl w-1/6 p-4 flex flex-col justify-between' >
    <Sidebar/>
    </div>

    {/* Right side bar */}
    <div className='border border-gray-500 rounded-xl p-4 w-5/6'>
    
    <Outlet/>
    </div>
      
    </div>
  )
}

export default Home
