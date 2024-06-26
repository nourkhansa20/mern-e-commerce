import React from 'react'
import SideBar from '../../components/Profile/SideBar'
import { Outlet } from 'react-router-dom'

const Profile = () => {
    return (
        <div className='flex gap-7 justify-center mt-11'>
            <SideBar />
            <div className='min-w-[100ex]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Profile