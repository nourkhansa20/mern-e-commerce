import React from 'react'
import SideBar from '../../components/Profile/SideBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/useAuthContext'

const Profile = () => {
    const { isAuth } = useAuthContext()
    if (!isAuth) {
        return <Navigate to='/login' />
    }
    return (
        <div className='flex gap-7 justify-center mt-11 h-screen'>
            <SideBar />
            <div className='w-[100ex]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Profile