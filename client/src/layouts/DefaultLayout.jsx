import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomNavBar from '../components/NavBar/CustomNavBar'
import { Footer } from '../components/Footer/Footer'
import { LocalStorageContextProvider } from '../context/LocalStorageContext'

const DefaultLayout = () => {

    return (
        <LocalStorageContextProvider>
            <div className='h-screen flex flex-col'>
                <CustomNavBar />
                <Outlet />
                <Footer />
            </div>
        </LocalStorageContextProvider>
    )
}

export default DefaultLayout