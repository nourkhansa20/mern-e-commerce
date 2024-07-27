import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/useAuthContext'

const GuestLayout = () => {
    const { isAuth } = useAuthContext()

    if (isAuth) {
        return <Navigate to={'/ecommerce/home'} />
    }

    return (
        <div>
            <div className='hidden'>{isAuth}</div>
            <Outlet />
        </div>
    )
}

export default GuestLayout