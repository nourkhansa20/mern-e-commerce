import Sidebar from '../components/Sidebar/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const BackOfficeLayout = () => {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default BackOfficeLayout