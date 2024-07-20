import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomNavBar from '../components/NavBar/CustomNavBar'
import { Footer } from '../components/Footer/Footer'

const DefaultLayout = () => {

    return (
            <div className='h-screen flex flex-col'>
                <CustomNavBar />
                <Outlet />
                <Footer className='mt-24'/>
            </div>
    )
}

export default DefaultLayout