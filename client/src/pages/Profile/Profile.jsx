import React from 'react'
import SideBar from '../../components/Profile/SideBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/useAuthContext'

const Profile = () => {
    const { isAuth } = useAuthContext()
    if (!isAuth) {
        return <Navigate to='/ecommerce/login' />
    }
    return (
        <div className='flex flex-col md:flex-row gap-7 md:justify-center md:items-start items-center mt-11 min-h-screen'>
            <SideBar />
            <div className='md:w-[120ex] w-[90%]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Profile